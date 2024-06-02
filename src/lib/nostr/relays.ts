import { RelayList } from "./nostrfunc";

export const relaySearchRelays = [
  //kind 0 (ユーザのプロフィール) と kind 10002 (利用中のリレーリスト) 特化
  "wss://directory.yabu.me",
  "wss://purplepag.es", //https://purplepag.es/what
  "wss://relay.nostr.band",
  "wss://nos.lol",

  //kind:3
  "wss://relayable.org",
  //
  "wss://bostr.nokotaro.com",
];

export const extensionRelays = [
  "wss://nos.lol",
  "wss://relay.damus.io",
  //'wss://relay.snort.social',
  "wss://nostr-pub.wellorder.net",
  "wss://relay.nostr.band",
  "wss://relay.nostr.wirednet.jp",
  "wss://nostr-relay.nokotaro.com",
  "wss://nostr.wine",
  "wss://nostr.bitcoiner.social",
  "wss://relay.nostr.bg",
  "wss://nostr.mom",
  "wss://relay.orangepill.dev",
  // 'wss://no.str.cr',
  "wss://relay.nostr.com.au",
  "wss://offchain.pub",
  "wss://relay.plebstr.com",
  "wss://nostr.fmt.wiz.biz",
  //'wss://nostr.rocks',
  "wss://nostr.mutinywallet.com",
  "wss://e.nos.lol",
  "wss://relayable.org",
  "wss://relay.mostr.pub",
  //------------------------
  //https://docs.nostr.wine/filter/readme
  "wss://public.relaying.io",
  "wss://socolo.nl",
  "wss://nostr.fractalized.net",
  "wss://nostr.einundzwanzig.space",
  "wss://relay.nostr.net",
  //
  "wss://bostr.nokotaro.com",
];

//feedback用のリレー
export const feedbackRelay = [
  "wss://nos.lol",
  "wss://relay.nostr.wirednet.jp",
  "wss://relayable.org",
  "wss://relay.nostr.band/",
];
export const defaultRelay = [
  "wss://nos.lol",
  "wss://relay.nostr.band",
  "wss://relayable.org",
];
