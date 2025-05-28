import {
  EventPacket,
  RxNostr,
  createRxBackwardReq,
  createRxNostr,
  createTie,
  createUniq,
  latestEach,
  nip07Signer,
  now,
} from "rx-nostr";
import { verifier, seckeySigner } from "rx-nostr-crypto";
import { extensionRelays, feedbackRelay, relaySearchRelays } from "./relays";
import { generateSecretKey, getPublicKey, nip04, nip19 } from "nostr-tools";
import type * as Nostr from "nostr-typedef";
import { EventParameters } from "nostr-typedef";
export interface RelayList {
  pubkey: string;
  read: string[];
  write: string[];
}
const chunkSize = 20;
// イベントID に基づいて重複を排除する
const keyFn = (packet: EventPacket): string => packet.event.id;

const onCache = (packet: EventPacket): void => {
  //console.log(`${packet.event.id} を初めて観測しました`);
};
const onHit = (packet: EventPacket): void => {
  //  console.log(`${packet.event.id} はすでに観測されています`);
};

const [uniq, uniqIds] = createUniq(keyFn, { onCache, onHit });

export interface EventList {
  [id: string]: EventPacket[];
}
const [tie, tieMap] = createTie();
export function getRelaysById(id: string): string[] {
  return Array.from(tieMap.get(id) || []);
}
export const getUserRelayList = async (pubkey: string): Promise<RelayList> => {
  console.log(pubkey);
  let res: RelayList = { read: [], write: [], pubkey: pubkey };
  let tmp_event: {
    kind3: Nostr.Event | undefined;
    kind10002: Nostr.Event | undefined;
  } = {
    kind3: undefined,
    kind10002: undefined,
  };
  let timeoutId: number | undefined;
  const timeoutMillis: number = 2000;
  const rxNostr = createRxNostr({ verifier });
  rxNostr.setDefaultRelays(relaySearchRelays);
  //uniqリセット,tieもリセット
  uniqIds.clear();
  tieMap.clear();
  const rxReq = createRxBackwardReq("sup");
  const observable = rxNostr.use(rxReq).pipe(tie, uniq);

  await new Promise<RelayList>((resolve, reject) => {
    const handleTimeout = () => {
      console.log("Timeout reached");
      subscription.unsubscribe(); // タイムアウト時に購読を解除
      resolve(res);
    };

    const observer = {
      next: (packet: EventPacket) => {
        console.log("Received:", packet);
        if (packet.event.kind === 3) {
          if (
            !tmp_event.kind3 ||
            packet.event.created_at > tmp_event.kind3.created_at
          ) {
            tmp_event.kind3 = packet.event;
          }
        } else if (packet.event.kind === 10002) {
          if (
            !tmp_event.kind10002 ||
            packet.event.created_at > tmp_event.kind10002.created_at
          ) {
            tmp_event.kind10002 = packet.event;
          }
        }
      },
      complete: () => {
        console.log("Completed!");
        rxNostr.dispose(); // 購読が完了したらRxNostrを解放
        clearTimeout(timeoutId); // 購読が完了したらタイムアウトのタイマーを解除
        resolve(res);
      },
      error: (error: any) => {
        console.error("Error:", error);
        rxNostr.dispose(); // 購読が完了したらRxNostrを解放
        clearTimeout(timeoutId); // エラーが発生したらタイムアウトのタイマーを解除
        reject(error);
      },
    };

    // 購読開始
    const subscription = observable.subscribe(observer);

    // タイムアウトのタイマーを設定
    timeoutId = setTimeout(handleTimeout, timeoutMillis);

    rxReq.emit(
      { kinds: [10002, 3], authors: [pubkey], until: now() },
      { relays: relaySearchRelays }
    ); // 購読し始めてからイベントを受信するためにemitは後
  });

  console.log(tmp_event);
  if (tmp_event.kind10002) {
    tmp_event.kind10002.tags.map((item) => {
      if (item.length === 2) {
        res.read.push(item[1]);
        res.write.push(item[1]);
      } else if (item[2] === "read") {
        res.read.push(item[1]);
      } else if (item[2] === "write") {
        res.write.push(item[1]);
      }
    });
  } else if (tmp_event.kind3) {
    try {
      const tmp_relay: {
        [relayURL: string]: { read: boolean; write: boolean };
      } = JSON.parse(tmp_event.kind3.content);
      Object.keys(tmp_relay).map((item: string) => {
        if (tmp_relay[item].read) {
          res.read.push(item);
        }
        if (tmp_relay[item].write) {
          res.write.push(item);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  rxNostr.dispose();
  return res;
};

export const getEventList = async (
  pubkey: string,
  kind: number,
  readRelayList: string[],
  maxRelayLength: number
): Promise<EventList> => {
  let res: EventList = {};
  console.log(readRelayList.length);
  const timeoutMillis: number = 2000; // タイムアウト時間（ミリ秒）
  const uniqueRelays = readRelayList.slice(0, maxRelayLength);
  const totalChunks = Math.ceil(uniqueRelays.length / chunkSize);
  //uniqリセット,tieもリセット
  uniqIds.clear();
  tieMap.clear();
  const rxNostr = createRxNostr({ verifier });
  for (let i = 0; i < totalChunks; i++) {
    const startIdx = i * chunkSize;
    const endIdx = Math.min((i + 1) * chunkSize, uniqueRelays.length);
    const chunkRelays = uniqueRelays.slice(startIdx, endIdx);

    await processChunk(rxNostr, pubkey, kind, chunkRelays, res, timeoutMillis);
  }
  rxNostr.dispose();
  //時間順に並べ替えてから返す
  res = sortBookmarkEventList(res);
  return res;
};

const processChunk = async (
  rxNostr: RxNostr,
  pubkey: string,
  kind: number,
  chunkRelays: string[],
  res: EventList,
  timeoutMillis: number
) => {
  rxNostr.setDefaultRelays(chunkRelays);

  const rxReq = createRxBackwardReq("sub");
  const observable = rxNostr.use(rxReq).pipe(tie, uniq);

  await new Promise<void>((resolve, reject) => {
    const handleTimeout = () => {
      console.log("Chunk processing timeout reached!");
      subscription.unsubscribe(); // タイムアウト時に購読を解除

      resolve();
    };

    const observer = {
      next: (packet: EventPacket) => {
        console.log(packet);
        processPacket(packet, res);
      },
      complete: () => {
        console.log("Chunk processing completed!");
        clearTimeout(timeoutId); // 購読が完了したらタイムアウトのタイマーを解除

        resolve();
      },
      error: (error: any) => {
        console.error("Chunk processing error:", error);
        clearTimeout(timeoutId); // エラーが発生したらタイムアウトのタイマーを解除

        resolve();
      },
    };

    // 購読開始
    const subscription = observable.subscribe(observer);

    // タイムアウトのタイマーを設定
    const timeoutId = setTimeout(handleTimeout, timeoutMillis);

    rxReq.emit({
      kinds: [kind],
      authors: [pubkey],
      until: now(),
    });
    // console.log({
    //   kinds: [kind],
    //   authors: [pubkey],
    //   until: now(),
    // });
  });
};

export const processPacket = (packet: EventPacket, res: EventList) => {
  const id = packet.event.tags?.find((item) => item[0] == "d");

  if (id) {
    if (!res[id[1]]) res[id[1]] = [];
    if (!res?.[id[1]]?.find((item) => item.event.id === packet.event.id)) {
      res[id[1]].push(packet);
    }
  } else {
    if (!res[""]) res[""] = [];
    if (!res?.[""]?.find((item) => item.event.id === packet.event.id)) {
      res[""]?.push(packet);
    }
  }
};

export function sortBookmarkEventList(eventList: EventList): EventList {
  const sortedBookmarkEventList: EventList = {};
  // kind30003のIDをソートして新しいオブジェクトに追加
  Object.keys(eventList)
    .sort((a, b) => a.localeCompare(b))
    .forEach((id) => {
      sortedBookmarkEventList[id] = eventList[id];
    });

  // kind30003の各配列をcreated_atの値で並べ替える
  Object.keys(eventList).forEach((id) => {
    sortedBookmarkEventList[id] = sortEventsByCreatedAt(eventList[id]);
  });

  return sortedBookmarkEventList;
}

function sortEventsByCreatedAt(packets: EventPacket[]): EventPacket[] {
  return packets.sort((a, b) => {
    return b.event.created_at - a.event.created_at;
  });
}

export async function publishEventToRelay(
  event: Nostr.Event,
  relay: string[],
  nsec?: Uint8Array
): Promise<Map<string, boolean>> {
  if (relay.length <= 0) {
    //todo 書き込みリレー見つかってないときどうする
    throw Error("Relay is not set");
  }
  const eventParams: EventParameters = {
    created_at: Math.floor(Date.now() / 1000),
    content: event.content,
    tags: event.tags,
    kind: event.kind,
  };
  // event.created_at = Math.floor(Date.now() / 1000);
  // event.id = "";
  // event.sig = "";
  console.log("eventParams:", eventParams);
  // if (nsec !== undefined) {
  //   newEvent.pubkey = getPublicKey(nsec);
  // }
  //console.log("nsec:", nsec);
  const signer =
    nsec !== undefined ? seckeySigner(nip19.nsecEncode(nsec)) : nip07Signer();
  //console.log(signer);
  const rxNostr = createRxNostr({ verifier, signer: signer });

  const publishEvent = await signer.signEvent(eventParams); //error
  console.log("signedEvent:", publishEvent);

  try {
    const result = await sendEventToRelay(rxNostr, publishEvent, relay);

    console.log("送信結果:", result);
    return result;
  } catch (error) {
    console.error("イベントの送信中にエラーが発生しました:", error);
    throw Error;
  }

  // return new Map();
}

// rxNostr.sendをPromise化する関数
async function sendEventToRelay(
  rxNostr: RxNostr,
  event: EventParameters,
  relays: string[]
): Promise<Map<string, boolean>> {
  return new Promise<Map<string, boolean>>((resolve, reject) => {
    const res: Map<string, boolean> = new Map();

    const handleTimeout = () => {
      console.log("Timeout reached");
      resolve(res);
    };

    const subscription = rxNostr.send(event, { relays }).subscribe((packet) => {
      console.log(
        `リレー ${packet.from} への送信が ${
          packet.ok ? "成功" : "失敗"
        } しました。`
      );
      res.set(packet.from, packet.ok);

      // すべてのリレーへの送信が完了したら、Observableを完了させる
      if (res.size === relays.length) {
        subscription.unsubscribe(); // Observableの購読を解除
        resolve(res); // Promiseを解決
      }
    });

    setTimeout(handleTimeout, 5000); // タイムアウトの設定
  });
}

export function checkPubkey(str: string):
  | {
      npubkey: string;
      pubhex: string;
      nsecArray?: Uint8Array;
    }
  | undefined {
  console.log(str);
  let res: { npubkey: string; pubhex: string; nsecArray?: Uint8Array } = {
    npubkey: "",
    pubhex: "",
  };
  if (!str || str.length < 60) {
    return;
  }
  try {
    if (str.startsWith("nostr:")) {
      str = str.slice(6);
    }
    // npubかhexかnsec
    if (str.startsWith("npub")) {
      const decode = nip19.decode(str).data as string; // decodeしてエラーにならないかチェック
      res.pubhex = decode;
      res.npubkey = str;
      // nsecかhex
    } else if (str.startsWith("nsec")) {
      const sec = nip19.decode(str).data as Uint8Array;
      res.nsecArray = sec;
      res.npubkey = nip19.npubEncode(getPublicKey(sec));
      res.pubhex = nip19.decode(res.npubkey).data as string;
      console.log(res);
      // hex
    } else {
      res.npubkey = nip19.npubEncode(str);
      res.pubhex = nip19.decode(res.npubkey).data as string;
    }
    console.log(res);
    return res;
  } catch (error) {
    return;
  }
}

export async function getOnlineRelays(): Promise<string[]> {
  try {
    const response = await fetch("https://api.nostr.watch/v1/online");
    if (!response.ok) {
      throw new Error("Failed to fetch relay list");
    }
    const data: string[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching relay list:", error);
    throw Error;
  }
}
export async function getNIP66Relays(
  targetRelayCount: number,
  visitedRelays: Set<string> = new Set(),
  max_depth: number = 5
): Promise<string[]> {
  const discoveredRelays = new Set<string>();
  const rxNostr = createRxNostr({ verifier });
  uniqIds.clear();
  // コネクションエラーのリレーは visitedRelays に追加せず除外する
  const badRelays = new Set<string>();
  rxNostr.createConnectionStateObservable().subscribe((state) => {
    if (state.state === "error" && state.from) {
      console.log(`Relay connection error: ${state.from}`);
      badRelays.add(state.from);
    }
  });

  await chunkNIP66(
    rxNostr,
    Array.from(visitedRelays),
    visitedRelays,
    discoveredRelays,
    badRelays,
    0,
    max_depth,
    targetRelayCount
  );
  rxNostr.dispose();
  return Array.from(discoveredRelays);
}

export async function chunkNIP66(
  rxNostr: RxNostr,
  chunkRelays: string[],
  visitedRelays: Set<string>,
  discoveredRelays: Set<string>,
  badRelays: Set<string>,
  depth: number,
  max_depth: number,
  targetRelayCount: number
): Promise<void> {
  if (
    depth >= max_depth ||
    chunkRelays.length === 0 ||
    discoveredRelays.size >= targetRelayCount // 目標数超えたら終了
  )
    return;

  const timeoutMillis = 2000;
  rxNostr.setDefaultRelays(chunkRelays);

  const rxReq = createRxBackwardReq();
  const observable = rxNostr.use(rxReq).pipe(
    uniq,
    latestEach(
      (packet) => packet.event.tags?.find((item) => item[0] === "d")?.[1]
    )
  );

  await new Promise<void>((resolve) => {
    const handleTimeout = () => {
      console.log("Chunk processing timeout reached!");
      subscription.unsubscribe();
      resolve();
    };

    const observer = {
      next: (packet: EventPacket) => {
        const dTag = packet.event.tags?.find((item) => item[0] === "d")?.[1];
        if (dTag && dTag.startsWith("wss://") && !visitedRelays.has(dTag)) {
          discoveredRelays.add(dTag);
        }
      },
      complete: () => {
        clearTimeout(timeoutId);
        resolve();
      },
      error: (err: any) => {
        console.error("Error in observable:", err);
        clearTimeout(timeoutId);
        resolve();
      },
    };

    const subscription = observable.subscribe(observer);
    const timeoutId = setTimeout(handleTimeout, timeoutMillis);

    rxReq.emit({
      kinds: [30166],
      until: now(),
    });
  });

  const newRelays = Array.from(discoveredRelays).filter(
    (url) => !visitedRelays.has(url) && !badRelays.has(url)
  );

  for (const relay of chunkRelays) {
    if (!badRelays.has(relay)) visitedRelays.add(relay);
  }
  console.log("relay length", visitedRelays.size);
  if (newRelays.length > 0 && visitedRelays.size < targetRelayCount) {
    const chunks = chunkArray(newRelays, chunkSize);
    for (const chunk of chunks) {
      await chunkNIP66(
        rxNostr,
        chunk,
        visitedRelays,
        discoveredRelays,
        badRelays,
        depth + 1,
        max_depth,
        targetRelayCount
      );
    }
  }
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export async function sendMessage(message: string, pubhex: string) {
  if (pubhex) {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    const encryptedMessage = await nip04.encrypt(sk, pubhex, message);

    const ev = {
      kind: 4,
      created_at: Math.floor(Date.now() / 1000),
      tags: [["p", pubhex]],

      content: encryptedMessage,
      pubkey: pk,
    };
    const signer = seckeySigner(nip19.nsecEncode(sk));
    //console.log(signer);
    const rxNostr = createRxNostr({ verifier, signer: signer });
    try {
      const result = await sendEventToRelay(rxNostr, ev, feedbackRelay);

      console.log("送信結果:", result);
      return result;
    } catch (error) {
      console.error("イベントの送信中にエラーが発生しました:", error);
      throw Error;
    }
  } else {
    throw Error;
  }
}

export const isNostrEvent = (obj: any): obj is Nostr.Event => {
  return (
    typeof obj === "object" &&
    typeof obj.created_at === "number" &&
    typeof obj.content === "string" &&
    Array.isArray(obj.tags) &&
    typeof obj.kind === "number" &&
    typeof obj.pubkey === "string" &&
    typeof obj.id === "string" &&
    typeof obj.sig === "string"
  );
};
