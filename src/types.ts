import type * as Nostr from "nostr-typedef";
import { JSX, ValidComponent } from "solid-js";
declare global {
  interface ToastSettings {
    open: boolean;
    message: JSX.Element | JSX.Element[];
    type: "success" | "info" | "warning" | "error";
    timeout?: number;
    title?: string;
  }

  interface Window {
    nostr?: Nostr.Nip07.Nostr;
  }
  interface ModalSettings {
    open: boolean;
    component: ValidComponent | undefined;
    props: any;
  }
}
