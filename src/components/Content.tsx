import {
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@suid/material";
import { Accessor, JSX, Setter, ValidComponent, createSignal } from "solid-js";
import KindSelect from "./KindSelect";
import PubkeySet from "./PubkeySet";
import MenuSelect from "./MenuSelect";
import Result from "./Result";
import type * as Nostr from "nostr-typedef";
import CheckIcon from "@suid/icons-material/Check";
import WarningAmberIcon from "@suid/icons-material/WarningAmber";
import SearchIcon from "@suid/icons-material/Search";
import {
  EventList,
  RelayList,
  checkPubkey,
  getEventList,
  getOnlineRelays,
  getUserRelayList,
  publishEventToRelay,
} from "../lib/nostr/nostrfunc";
import { extensionRelays } from "../lib/nostr/relays";
import { testEventList } from "../lib/nostr/nostrfunc.test";
import { EventPacket } from "rx-nostr";
import { kind30030 } from "../lib/nostr/testData";
import { NostrEvent } from "nostr-tools";
import { publishedJSX } from "./util/Are";

const relayLength = [30, 60, 200];
let userRelays: RelayList = {
  read: [],
  write: [],
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
    console.log(pubHex);
    console.log(kindNum);
    try {
      if (userRelays.read.length <= 0) {
        userRelays = await getUserRelayList(pubHex);
      }
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
      const eventList = await getEventList(
        pubHex,
        kindNum,
        totalRelay,
        menuNum() < 3 ? relayLength[menuNum()] : totalRelay.length
      );
      //const eventList = testEventList;
      //const eventList = kind30030;
      console.log(eventList);
      setEvents(eventList);
    } catch (error) {
      console.log(error);
    }

    setNowProgress(false);
  };

  const publishEvent = async (ev: NostrEvent) => {
    if (userRelays.write.length <= 0) {
      return;
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
          publishEvent={publishEvent}
        />
      </Container>
    </main>
  );
}
