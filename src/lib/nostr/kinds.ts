export const kinds: Map<number, string> = new Map<number, string>([
  [3, "contact list"],
  //
  [10000, "mute"],
  [10001, "pin"],
  [10002, "relays"],
  [10003, "bookmark"],
  [10004, "communities"],
  [10005, "public chats"],
  [10006, "blocked relays"],
  [10007, "search relays"],
  //
  [10015, "interests"],
  //
  [10030, "emojis"],
  //
  [10101, "good wiki authors"],
  [10102, "good wiki relays"],
  //
  [30000, "people sets"],
  [30001, "lists"],
  [30002, "relay sets"],
  [30003, "bookmark sets"],
  [30004, "curation sets"],
  //
  [30008, "profile badges"],
  //
  [30015, "interest sets"],
  //
  [30030, "emoji sets"],
]);
// kindsを配列に変換してからソート
const sortedArray = Array.from(kinds).sort((a, b) => a[1].localeCompare(b[1]));

export const sortedKinds: Map<number, string> = new Map<number, string>(
  sortedArray
);
