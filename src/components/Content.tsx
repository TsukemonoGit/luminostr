import { Button, Container, Grid, Stack } from "@suid/material";
import { Accessor, Setter, createSignal } from "solid-js";
import KindSelect from "./KindSelect";
import PubkeySet from "./PubkeySet";
import MenuSelect from "./MenuSelect";
import Result from "./Result";
import type * as Nostr from "nostr-typedef";
import SearchIcon from "@suid/icons-material/Search";
import {
  EventList,
  RelayList,
  checkPubkey,
  getEventList,
  getOnlineRelays,
  getUserRelayList,
} from "../lib/nostr/nostrfunc";
import { extensionRelays } from "../lib/nostr/relays";
import { testEventList } from "../lib/nostr/nostrfunc.test";
import { EventPacket } from "rx-nostr";

const relayLength = [30, 60, 200];
let userRelays: RelayList = {
  read: [
    "wss://relay.mostr.pub/",
    "wss://nostr.zbd.gg/",
    "wss://relay-jp.nostr.wirednet.jp/",
    "wss://nos.lol/",
    "wss://relay-jp.nostr.moctane.com/",
    "wss://relay.nostr.wirednet.jp/",
    "wss://r.kojira.io/",
    "wss://srtrelay.c-stellar.net/",
    "wss://relayable.org/",
    "wss://relay.nostr.band/",
    "wss://nostr.wine/",
    "wss://relay.nostr.moctane.com/",
    "wss://nostr.uneu.net/",
    "wss://yabu.me/",
    "wss://relay.momostr.pink/",
  ],
  write: [
    "wss://relay-jp.nostr.wirednet.jp/",
    "wss://nos.lol/",
    "wss://relay-jp.nostr.moctane.com/",
    "wss://relay.nostr.wirednet.jp/",
    "wss://r.kojira.io/",
    "wss://nostr.fediverse.jp/",
    "wss://srtrelay.c-stellar.net/",
    "wss://nrelay-jp.c-stellar.net/",
    "wss://relay.nostr.moctane.com/",
    "wss://nosdrive.app/relay/",
    "wss://yabu.me/",
  ],
};
let pubHex: string;
let nsecArray: Uint8Array;
let apiRelays: string[] = [];
export default function Content({
  nowProgress,
  setNowProgress,
  setToastState,
}: {
  nowProgress: Accessor<boolean>;
  setNowProgress: Setter<boolean>;
  setToastState: Setter<ToastSettings>;
}) {
  const [kind, setKind] = createSignal("");
  const [pubkey, setPubkey] = createSignal("");
  const [menuNum, setMenuNum] = createSignal(0);
  const [events, setEvents] = createSignal<EventList>(
    {},
    {
      equals: false,
    }
  );
  const [kindError, setKindError] = createSignal(false);
  const [pubkeyError, setPubkeyError] = createSignal(false);

  const reset = () => {
    setKindError(false);
    setPubkeyError(false);
    setEvents({});
  };

  const handleClickSearch = async () => {
    reset();

    const res = checkPubkey(pubkey());
    if (!res) {
      setPubkeyError(true);
      return;
    }
    if (kind() === "") {
      setKindError(true);
      return;
    }
    setNowProgress(true);

    const kindNum = Number(kind()); //さきにnumにしてこていしとく
    pubHex = res?.pubhex;
    if (res?.nsecArray) {
      nsecArray = res.nsecArray;
    }
    if (menuNum() > 0 && apiRelays.length <= 0) {
      try {
        const tmpApiRelays = await getOnlineRelays();
        if (tmpApiRelays.length > 0) {
          apiRelays = tmpApiRelays;
        }
      } catch (error) {
        console.log("failed to get online relays");
        setToastState({
          open: true,
          message:
            "Failed to get online relays. \n Please check the option to 'about 30 relay' or wait for a while and retry",
          type: "error",
        });

        setNowProgress(false);
        return;
      }
    }
    console.log(pubHex);
    console.log(kind());
    try {
      // userRelays = await getUserRelayList(pubHex);
    } catch (error) {
      console.log(error);
    }
    console.log(userRelays);
    const totalRelay = Array.from(
      new Set([
        ...userRelays.read,
        ...userRelays.write,
        ...extensionRelays,
        ...apiRelays,
      ])
    );
    try {
      // const eventList = await getEventList(
      //   pubHex,
      //   kindNum,
      //   totalRelay,
      //   menuNum() < 3 ? relayLength[menuNum()] : totalRelay.length
      // );
      const eventList = testEventList;
      console.log(eventList);
      setEvents(eventList);
    } catch (error) {
      console.log(error);
    }

    setNowProgress(false);
  };

  return (
    <main>
      <Container maxWidth="lg" sx={{ marginTop: "4rem" }}>
        <Grid container gap={2}>
          <Grid item xs={12} sm>
            <Stack
              spacing={2}
              direction="column"
              // width={useTheme().breakpoints.values.sm}
              maxWidth="100%"
              sx={{ mt: { xs: 2, sm: 0 } }}
            >
              <PubkeySet
                pubkey={pubkey}
                setPubkey={setPubkey}
                pubkeyError={pubkeyError}
                nowProgress={nowProgress}
              />
              <KindSelect
                kind={kind}
                setKind={setKind}
                kindError={kindError}
                nowProgress={nowProgress}
              />
            </Stack>
          </Grid>{" "}
          <Grid item xs={12} no-wrap sm={4}>
            <MenuSelect
              menuNum={menuNum}
              setMenuNum={setMenuNum}
              nowProgress={nowProgress}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "100%", my: 2, py: 2 }}
          onClick={handleClickSearch}
          disabled={nowProgress()}
        >
          <SearchIcon />
          Search
        </Button>
        <Result
          events={events}
          setEvents={setEvents}
          nowProgress={nowProgress}
          setNowProgress={setNowProgress}
        />
        {kind()} {menuNum()}
      </Container>
    </main>
  );
}
