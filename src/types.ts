import type * as Nostr from "nostr-typedef";
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
}
