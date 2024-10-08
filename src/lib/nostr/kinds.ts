export const kinds: Map<number, { ja: string; en: string }> = new Map<
  number,
  { ja: string; en: string }
>([
  [3, { ja: "フォローリスト", en: "contact list" }],
  //
  [10000, { ja: "ミュート", en: "mute" }],
  [10001, { ja: "ピン", en: "pin" }],
  [10002, { ja: "リレー", en: "relays" }],
  [10003, { ja: "ブックマーク", en: "bookmark" }],
  [10004, { ja: "コミュニティ", en: "communities" }],
  [10005, { ja: "パブリックチャット", en: "public chats" }],
  [10006, { ja: "ブロックリレー", en: "blocked relays" }],
  [10007, { ja: "検索リレー", en: "search relays" }],
  //
  [10015, { ja: "興味・関心", en: "interests" }],
  //
  [10030, { ja: "絵文字", en: "emojis" }],
  //
  [10101, { ja: "wikiのおすすめ著者", en: "good wiki authors" }],
  [10102, { ja: "wikiの推奨リレー", en: "good wiki relays" }],
  //
  [30000, { ja: "アカウントセット", en: "people sets" }],
  [30001, { ja: "汎用リスト", en: "lists" }],
  [30002, { ja: "リレーセット", en: "relay sets" }],
  [30003, { ja: "ブックマークセット", en: "bookmark sets" }],
  [30004, { ja: "キュレーションセット", en: "curation sets" }],
  //
  [30008, { ja: "プロフィールバッジ", en: "profile badges" }],
  //
  [30015, { ja: "興味・関心セット", en: "interest sets" }],
  //
  [30030, { ja: "絵文字セット", en: "emoji sets" }],
]);

export const sortedLocaleKinds = (isJa: boolean) => {
  if (isJa) {
    return Array.from(kinds).sort((a, b) => a[1].ja.localeCompare(b[1].ja));
  } else {
    return Array.from(kinds).sort((a, b) => a[1].en.localeCompare(b[1].en));
  }
};
