import { Card, Divider, Typography } from "@suid/material";
import { Accessor, For, Setter, Show, createSignal } from "solid-js";

import type * as Nostr from "nostr-typedef";
import { EventList } from "../lib/nostr/nostrfunc";
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
}: //handleClickEvent,
//handleClickPublish,
{
  events: Accessor<EventList>;
  setEvents: Setter<EventList>;
  setNowProgress: Setter<boolean>;
  nowProgress: Accessor<boolean>;
  // handleClickEvent: any;
  //handleClickPublish: any;
}) {
  const [modalSettings, setModalSettings] = createSignal<ModalSettings>({
    open: false,
    component: undefined,
    props: null,
  });
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
      },
      open: true,
    });
  };
  const handleModalClose = (e: any) => {
    console.log(e);

    setModalSettings((prevState) => ({
      ...prevState,
      open: false,
    }));
    if (e === "publish") {
      console.log("publish", clickedEvent());
    }
    setClickedEvent(null);
  };
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        marginBottom={0}
        sx={{ alignContent: "center" }}
      >
        Result
      </Typography>
      <Card>
        <For each={Object.keys(events())} fallback={<div>No items</div>}>
          {(item, index) => (
            <div data-index={index()}>
              <For each={events()[item]} fallback={<div>No items</div>}>
                {(item2, index2) => (
                  <>
                    <EventItem
                      nosEvent={item2}
                      handleClickEvent={handleClickEvent}
                      handleClickPublish={handleClickPublish}
                    />{" "}
                    <Show when={events()[item].length > index2() + 1}>
                      <Divider />
                    </Show>
                  </>
                )}
              </For>
            </div>
          )}
        </For>
      </Card>
      <Show when={modalSettings().open}>
        <Dynamic
          component={modalSettings().component}
          {...modalSettings().props}
        />
      </Show>
    </>
  );
}
