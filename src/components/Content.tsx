import {
  Button,
  Container,
  Grid,
  Input,
  Stack,
  Typography,
  useTheme,
} from "@suid/material";
import { Accessor, Setter, createSignal } from "solid-js";
import KindSelect from "./KindSelect";
import PubkeySet from "./PubkeySet";
import MenuSelect from "./MenuSelect";
import Result from "./Result";
import SearchIcon from "@suid/icons-material/Search";
import {
  EventList,
  RelayList,
  checkPubkey,
  getEventList,
  getNIP66Relays,
  getOnlineRelays,
  getUserRelayList,
  isNostrEvent,
  publishEventToRelay,
} from "../lib/nostr/nostrfunc";
import { defaultRelay, extensionRelays } from "../lib/nostr/relays";
import { EventPacket } from "rx-nostr";
import { NostrEvent } from "nostr-tools";
import { publishedJSX } from "./util/Are";
import { FileUpload } from "@suid/icons-material";

let userRelays: RelayList = {
  read: [],
  write: [],
  pubkey: "",
};
let pubHex: string;
let nsecArray: Uint8Array;
let apiRelays: string[] = [];
export default function Content({
  nowProgress,
  setNowProgress,
  setToastState,
  setModalSettings,
}: {
  nowProgress: Accessor<boolean>;
  setNowProgress: Setter<boolean>;
  setToastState: Setter<ToastSettings>;
  setModalSettings: Setter<ModalSettings>;
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
  //test

  // menuごとの目標リレー数設定 //つながらないリレーとかあって減るから
  const targetCounts = [30, 80, 240, 440];

  //setEvents(kind30001);
  //---
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

    if (menuNum() > 0 && apiRelays.length < targetCounts[menuNum()]) {
      try {
        const visitedRelays =
          apiRelays.length > 0 ? new Set(apiRelays) : new Set(extensionRelays);
        console.log("visitedRelays:", visitedRelays.size);
        const newRelays = await getNIP66Relays(
          targetCounts[menuNum()],
          visitedRelays
        );
        console.log("newRelays:", newRelays.length);
        if (newRelays.length > apiRelays.length) {
          apiRelays = Array.from(new Set([...apiRelays, ...newRelays]));
          console.log("Updated apiRelays:", apiRelays);
        }
      } catch (error) {
        console.log("failed to get online relays");
        setToastState({
          open: true,
          message: (
            <>
              Failed to get online relays. <br /> Please check the option to
              'about 30 relay' or wait for a while and retry
            </>
          ),
          type: "error",
        });

        setNowProgress(false);
        return;
      }
    }
    // console.log(pubHex);
    //   console.log(kindNum);
    try {
      if (userRelays.pubkey !== pubHex || userRelays.read.length <= 0) {
        userRelays = await getUserRelayList(pubHex);
        if (userRelays.read.length <= 0) {
          console.log(userRelays);
          setToastState({
            open: true,
            message: "Failed to get your relays. so set default relays",
            type: "warning",
          });

          userRelays.read = defaultRelay;
          userRelays.write = defaultRelay;
        }
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(userRelays);
    const totalRelay = Array.from(
      new Set([
        ...userRelays.read,
        ...userRelays.write,
        ...extensionRelays,
        ...apiRelays,
      ])
    );

    try {
      const eventList = await getEventList(
        pubHex,
        kindNum,
        totalRelay,
        menuNum() < 3 ? targetCounts[menuNum()] : totalRelay.length
      );
      //const eventList = testEventList;
      //const eventList = kind30001;
      console.log(eventList);
      setEvents(eventList);
    } catch (error) {
      console.log(error);
    }

    setNowProgress(false);
  };

  const publishEvent = async (ev: NostrEvent) => {
    setPubkeyError(false);
    setNowProgress(true);
    if (!pubHex || pubHex === "") {
      const res = checkPubkey(pubkey());
      if (!res) {
        setPubkeyError(true);
        setNowProgress(false);
        return;
      }
      pubHex = res?.pubhex;
      if (res?.nsecArray) {
        nsecArray = res.nsecArray;
      }
    }

    if (pubHex && userRelays.write.length <= 0) {
      userRelays = await getUserRelayList(pubHex);

      if (userRelays.write.length <= 0) {
        console.log(userRelays);
        setToastState({
          open: true,
          message: "Failed to get your relays. so set default relays",
          type: "warning",
        });
        setNowProgress(false);
        userRelays.write = defaultRelay;
      }
    }

    try {
      const res: Map<string, boolean> = await publishEventToRelay(
        ev,
        userRelays.write,
        nsecArray
      );
      const message = publishedJSX(useTheme(), res);

      const hasSuccess = Array.from(res.values()).some(
        (isSuccess) => isSuccess
      );
      setToastState({
        open: true,
        message: (
          <Stack flexDirection="row" flexWrap="wrap" gap={1}>
            {message}
          </Stack>
        ),
        type: hasSuccess ? "success" : "error",
        title: "Published",
      });

      setNowProgress(false);
    } catch (error: any) {
      setToastState({
        open: true,
        message: error.message ? error.message : "Failed to publish",
        type: "error",
      });
      console.log(error);

      setNowProgress(false);
    }
  };

  const handleLoadJson = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event2) => {
        console.log("onload event triggered");
        console.log(event2.target);

        if (!event2.target) return;
        const contents = event2.target.result;

        if (!contents) {
          setToastState({
            open: true,
            message: "error",
            type: "error",
          });
          return;
        }

        const contentsObj = JSON.parse(contents as string);
        if (!isNostrEvent(contentsObj)) {
          setToastState({
            open: true,
            message: "not a NostrEvent",
            type: "error",
          });
          return;
        }

        const packet: EventPacket = {
          from: "Local",
          event: contentsObj,
          subId: "",
          type: "EVENT",
          message: ["EVENT", "", contentsObj],
        };

        const id = packet.event.tags?.find((item) => item[0] == "d");
        const res = events();
        if (id) {
          if (!res[id[1]]) res[id[1]] = [];
          if (!res[id[1]].find((item) => item.event.id === packet.event.id)) {
            res[id[1]].push(packet);
          }
        } else {
          if (!res[""]) res[""] = [];
          if (!res[""].find((item) => item.event.id === packet.event.id)) {
            res[""].push(packet);
          }
        }
        setEvents(res);
      };

      reader.onerror = (error) => {
        console.error("FileReader error", error);
        setToastState({
          open: true,
          message: "Failed to read file",
          type: "error",
        });
      };

      // Start reading the file
      reader.readAsText(file);
    }
  };

  return (
    <main>
      <Container maxWidth="lg" sx={{ marginTop: "4rem" }}>
        <Typography variant="h5" component="div" sx={{ color: "gray" }}>
          Nostr Replaceable Event Recovery Tool
        </Typography>
        <Grid container gap={2}>
          <Grid item xs={12} sm>
            <Stack
              spacing={2}
              direction="column"
              // width={useTheme().breakpoints.values.sm}
              maxWidth="100%"
              sx={{ mt: { xs: 2, sm: 0 } }}
            >
              {" "}
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                marginBottom={0}
                sx={{ alignContent: "center" }}
              >
                Setting
              </Typography>
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
        <Grid container flexDirection="row" flexWrap="wrap">
          <Grid item xs={6} paddingX={0.5}>
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
          </Grid>
          <Grid item xs={6} paddingX={0.5}>
            <label for="contained-button-file">
              <Input
                accept=".json"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={handleLoadJson}
              />
              <Button
                variant="contained"
                component="span"
                sx={{ width: "100%", my: 2, py: 2, whiteSpace: "nowrap" }}
                disabled={nowProgress()}
              >
                <FileUpload /> Upload Json
              </Button>
            </label>
          </Grid>
        </Grid>
        <Result
          events={events}
          setEvents={setEvents}
          nowProgress={nowProgress}
          setNowProgress={setNowProgress}
          publishEvent={publishEvent}
          setModalSettings={setModalSettings}
        />
      </Container>
    </main>
  );
}
