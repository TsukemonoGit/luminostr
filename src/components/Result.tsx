import {
  Box,
  Card,
  Divider,
  Typography,
  alpha,
  useTheme,
} from "@suid/material";
import { Accessor, For, Setter, Show, createSignal } from "solid-js";

import type * as Nostr from "nostr-typedef";
import { EventList, RelayList, getRelaysById } from "../lib/nostr/nostrfunc";
import EventItem from "./EventItem";
import { EventPacket } from "rx-nostr";
import { Dynamic } from "solid-js/web";
import JsonModal from "./modals/JsonModal";
import PublishModal from "./modals/PublishModal";
export default function Result({
  events,
  setEvents,
  setNowProgress,
  nowProgress,
  publishEvent,
  setModalSettings,
}: //handleClickEvent,
//handleClickPublish,
{
  events: Accessor<EventList>;
  setEvents: Setter<EventList>;
  setNowProgress: Setter<boolean>;
  nowProgress: Accessor<boolean>;
  publishEvent: any;
  setModalSettings: Setter<ModalSettings>;
  // handleClickEvent: any;
  //handleClickPublish: any;
}) {
  const [clickedEvent, setClickedEvent] = createSignal<EventPacket | null>(
    null
  );
  // const [publishEvent, setPublishEvent] = createSignal<Nostr.Event | null>(
  //   null
  // );
  const handleClickPublish = (nosEvent: EventPacket) => {
    if (nowProgress()) {
      return;
    }
    console.log(nosEvent);
    setClickedEvent(nosEvent);
    setModalSettings({
      component: PublishModal,
      props: {
        nosEvent: clickedEvent,
        handleModalClose: handleModalClose,
      },
      open: true,
    });
  };
  const handleClickEvent = (nosEvent: EventPacket) => {
    setClickedEvent(nosEvent);
    setModalSettings({
      component: JsonModal,
      props: {
        nosEvent: clickedEvent,
        handleModalClose: handleModalClose,
        relays: getRelaysById(nosEvent.event.id),
      },
      open: true,
    });
  };
  const handleModalClose = async (e: any) => {
    console.log(e);

    setModalSettings((prevState) => ({
      ...prevState,
      open: false,
    }));
    if (e === "publish") {
      console.log("publish", clickedEvent());
      setNowProgress(true);
      await publishEvent(clickedEvent()?.event);
    }
    setClickedEvent(null);
  };
  const getFirstEventKind = () => {
    const eventKeys = Object.keys(events());
    if (eventKeys.length === 0) {
      return null;
    }
    const firstEventList = events()[eventKeys[0]];
    if (firstEventList.length === 0) {
      return null;
    }
    return firstEventList[0].event.kind;
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        marginBottom={0}
        sx={{ alignContent: "center", mt: 4 }}
      >
        Result{" "}
        {events() && getFirstEventKind() !== null
          ? `kind:${getFirstEventKind()}`
          : ""}
      </Typography>
      <Box
        sx={{
          // justifyContent: "center",
          display: "flex",
          p: 1,
          flexWrap: "wrap",
          gap: "0.5em",
        }}
      >
        <For each={Object.keys(events())} fallback={<div>No items</div>}>
          {(item, index) => (
            <Card
              sx={{
                //display: "flex",
                // flexWrap: "wrap",
                //gap: "0.5em",
                maxWidth: "100%",
                p: 1,
                bgcolor: alpha(useTheme().palette.primary.light, 0.1),
              }}
              data-index={index()}
            >
              <Show when={item !== ""}>
                <Typography variant={"subtitle1"} sx={{ width: "100%" }}>
                  {item}
                </Typography>
              </Show>
              <For each={events()[item]} fallback={<div>No items</div>}>
                {(item2, index2) => (
                  <Card
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      bgcolor: alpha(useTheme().palette.primary.light, 0.1),
                      px: 1,
                      m: 1,
                    }}
                    data-index={index2()}
                  >
                    <EventItem
                      nosEvent={item2}
                      handleClickEvent={handleClickEvent}
                      handleClickPublish={handleClickPublish}
                    />
                  </Card>
                )}
              </For>
            </Card>
          )}
        </For>
      </Box>
    </>
  );
}
