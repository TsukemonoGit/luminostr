// import { test, expect } from "vitest";
// import { render, screen } from "@solidjs/testing-library";

// import { publishedJSX } from "../util/Are";
// import { Stack, useTheme } from "@suid/material";
// import { createSignal } from "solid-js";
// import Toast from "./Toast";
// const res = new Map([
//   ["wss://nostr.fediverse.jp/", true],
//   ["wss://srtrelay.c-stellar.net/", true],
//   ["wss://relay-jp.nostr.moctane.com/", true],
//   ["wss://yabu.me/", true],
//   ["wss://relay.nostr.wirednet.jp/", true],
//   ["wss://nrelay-jp.c-stellar.net/", true],
//   ["wss://relay.nostr.moctane.com/", false],
//   ["wss://relay-jp.nostr.wirednet.jp/", true],
//   ["wss://r.kojira.io/", true],
//   ["wss://nos.lol/", true],
// ]);
// test("increments value", async () => {
//   const [toastState, setToastState] = createSignal<ToastSettings>({
//     open: false,
//     message: <></>,
//     type: "info",
//   });
//   const message = publishedJSX(useTheme(), res);
//   const hasSuccess = Array.from(res.values()).some((isSuccess) => isSuccess);
//   setToastState({
//     open: true,
//     message: <Stack>{message}</Stack>,
//     type: hasSuccess ? "success" : "error",
//     title: "Published",
//     timeout: 100000,
//   });
//   const handleToastClose = () => {
//     setToastState((prevState) => ({
//       ...prevState,
//       open: false,
//     }));
//   };
//   render(() => (
//     <Toast handleToastClose={handleToastClose} toastState={toastState} />
//   ));
//   const toast = screen.getByRole("log");
//   expect(toast).toHaveTextContent("Published");
// });
