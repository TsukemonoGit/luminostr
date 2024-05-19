import type * as Nostr from "nostr-typedef";
import { ValidComponent } from "solid-js";
declare global {
  interface ToastSettings {
    open: boolean;
    message: string;
    type: "success" | "info" | "warning" | "error";
    timeout?: number;
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
