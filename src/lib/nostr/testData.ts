import { EventList, RelayList } from "./nostrfunc";
let userRelays: RelayList = {
  read: [
    "wss://relay.mostr.pub/",
    "wss://nostr.zbd.gg/",
    "wss://relay-jp.nostr.wirednet.jp/",
    "wss://nos.lol/",
    "wss://relay-jp.nostr.moctane.com/",
    "wss://relay.nostr.wirednet.jp/",
    "wss://r.kojira.io/",
    "wss://srtrelay.c-stellar.net/",
    "wss://relayable.org/",
    "wss://relay.nostr.band/",
    "wss://nostr.wine/",
    "wss://relay.nostr.moctane.com/",
    "wss://nostr.uneu.net/",
    "wss://yabu.me/",
    "wss://relay.momostr.pink/",
  ],
  write: [
    "wss://relay-jp.nostr.wirednet.jp/",
    "wss://nos.lol/",
    "wss://relay-jp.nostr.moctane.com/",
    "wss://relay.nostr.wirednet.jp/",
    "wss://r.kojira.io/",
    "wss://nostr.fediverse.jp/",
    "wss://srtrelay.c-stellar.net/",
    "wss://nrelay-jp.c-stellar.net/",
    "wss://relay.nostr.moctane.com/",
    "wss://nosdrive.app/relay/",
    "wss://yabu.me/",
  ],
  pubkey: "84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5",
};
export const kind30030: EventList = {
  moji: [
    {
      from: "wss://nostr-relay.nokotaro.com",
      type: "EVENT",
      message: [
        "EVENT",
        "sub:0",
        {
          id: "73d254c6007ac4b473c298ac554308cebff286b94d15526f7c07bc98f64686a7",
          kind: 30030,
          pubkey:
            "84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5",
          created_at: 1710804353,
          content: "",
          tags: [
            ["d", "moji"],
            [
              "emoji",
              "naruhodo",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/naruhodo.webp",
            ],
            [
              "emoji",
              "yes",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/YES.png",
            ],
            [
              "emoji",
              "no",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/NO.png",
            ],
            [
              "emoji",
              "oaa",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/oaa.webp",
            ],
            [
              "emoji",
              "ari",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/ari.png",
            ],
            [
              "emoji",
              "nasi",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/nasi.png",
            ],
            [
              "emoji",
              "moge",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/moge.png",
            ],
            [
              "emoji",
              "dokkoisyo",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/test.gif",
            ],
            [
              "emoji",
              "dokkoi",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/%E3%81%A9%E3%81%A3%E3%81%93%E3%81%84.png",
            ],
          ],
          sig: "5deb3243f16e6b3928d6feff10d1ca172f4d6439ec82d2a94e6bb96e24480ba57622b4947d308c86fea94137ab7581b27208faef75062d8a2246547010ca1990",
        },
      ],
      subId: "sub:0",
      event: {
        id: "73d254c6007ac4b473c298ac554308cebff286b94d15526f7c07bc98f64686a7",
        kind: 30030,
        pubkey:
          "84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5",
        created_at: 1710804353,
        content: "",
        tags: [
          ["d", "moji"],
          [
            "emoji",
            "naruhodo",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/naruhodo.webp",
          ],
          [
            "emoji",
            "yes",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/YES.png",
          ],
          [
            "emoji",
            "no",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/NO.png",
          ],
          [
            "emoji",
            "oaa",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/oaa.webp",
          ],
          [
            "emoji",
            "ari",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/ari.png",
          ],
          [
            "emoji",
            "nasi",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/nasi.png",
          ],
          [
            "emoji",
            "moge",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/moge.png",
          ],
          [
            "emoji",
            "dokkoisyo",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/test.gif",
          ],
          [
            "emoji",
            "dokkoi",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/%E3%81%A9%E3%81%A3%E3%81%93%E3%81%84.png",
          ],
        ],
        sig: "5deb3243f16e6b3928d6feff10d1ca172f4d6439ec82d2a94e6bb96e24480ba57622b4947d308c86fea94137ab7581b27208faef75062d8a2246547010ca1990",
      },
    },
  ],
  mono: [
    {
      from: "wss://nostr.fediverse.jp/",
      type: "EVENT",
      message: [
        "EVENT",
        "sub:0",
        {
          id: "65d4fdaf36555cced32d3a3720510027de1bba2eb3d00cb7789472550a287cde",
          kind: 30030,
          pubkey:
            "84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5",
          created_at: 1711534309,
          content: "",
          tags: [
            ["d", "mono"],
            [
              "emoji",
              "kira",
              "https://nostrcheck.me/media/lokuyow/nostrcheck.me_05449b2c98c6988d463147fbb4858130d81c78bad46a991d.webp",
            ],
            [
              "emoji",
              "wayo",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/emoji-wayo.webp",
            ],
            [
              "emoji",
              "sennou_mn",
              " https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/sennou.webp",
            ],
            [
              "emoji",
              "mn",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/mono.webp",
            ],
            [
              "emoji",
              "tei_kaizou_mn",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/tei_kaizou.webp",
            ],
            [
              "emoji",
              "souji_mn",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji_mn.webp",
            ],
            [
              "emoji",
              "souji",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji.webp",
            ],
            [
              "emoji",
              "souji_erai",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji_erai.webp",
            ],
            [
              "emoji",
              "te",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/te.webp",
            ],
            [
              "emoji",
              "sowawayo",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/sowawayo.webp",
            ],
            [
              "emoji",
              "unyowayo",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/unyowayo.webp",
            ],
            [
              "emoji",
              "iiaaa",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/iiaaa.webp",
            ],
            [
              "emoji",
              "iiaa",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/iiaa.webp",
            ],
            [
              "emoji",
              "pemono",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/pemono.webp",
            ],
            [
              "emoji",
              "zzz",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/zzz.webp",
            ],
            [
              "emoji",
              "moon",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/moon.webp",
            ],
            [
              "emoji",
              "oaa",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/oaa.webp",
            ],
            [
              "emoji",
              "moge",
              "https://nostrcheck.me/media/public/83274e8d72acfc3f3b1540511bf5a6f05b6205cc0033e7e307a3478b2f25536c.webp",
            ],
            [
              "emoji",
              "mogee",
              "https://nostrcheck.me/media/public/abdef8c7022fe5d99832ea581c1af5044adaa9d07ade3aa3b96ef3da8c8ed1de.webp",
            ],
            [
              "emoji",
              "monopaca_kao",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/monopaka.webp",
            ],
            [
              "emoji",
              "monobeampaca_kao",
              "https://image.nostr.build/b63e654b02d001c0f49a0a6d4b2a766215be1571709d7576f6fc238e9b21f572.png",
            ],
          ],
          sig: "e45834e293be372b74921dfd48fdb2d85e17f4c30f1c5aaac4f419d7b1c9cb4d0ccd394a87d2e83354f0166502f2397f4dccf69bb2e98fa75ac2035d83f27420",
        },
      ],
      subId: "sub:0",
      event: {
        id: "65d4fdaf36555cced32d3a3720510027de1bba2eb3d00cb7789472550a287cde",
        kind: 30030,
        pubkey:
          "84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5",
        created_at: 1711534309,
        content: "",
        tags: [
          ["d", "mono"],
          [
            "emoji",
            "kira",
            "https://nostrcheck.me/media/lokuyow/nostrcheck.me_05449b2c98c6988d463147fbb4858130d81c78bad46a991d.webp",
          ],
          [
            "emoji",
            "wayo",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/emoji-wayo.webp",
          ],
          [
            "emoji",
            "sennou_mn",
            " https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/sennou.webp",
          ],
          [
            "emoji",
            "mn",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/mono.webp",
          ],
          [
            "emoji",
            "tei_kaizou_mn",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/tei_kaizou.webp",
          ],
          [
            "emoji",
            "souji_mn",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji_mn.webp",
          ],
          [
            "emoji",
            "souji",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji.webp",
          ],
          [
            "emoji",
            "souji_erai",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji_erai.webp",
          ],
          [
            "emoji",
            "te",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/te.webp",
          ],
          [
            "emoji",
            "sowawayo",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/sowawayo.webp",
          ],
          [
            "emoji",
            "unyowayo",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/unyowayo.webp",
          ],
          [
            "emoji",
            "iiaaa",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/iiaaa.webp",
          ],
          [
            "emoji",
            "iiaa",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/iiaa.webp",
          ],
          [
            "emoji",
            "pemono",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/pemono.webp",
          ],
          [
            "emoji",
            "zzz",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/zzz.webp",
          ],
          [
            "emoji",
            "moon",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/moon.webp",
          ],
          [
            "emoji",
            "oaa",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/oaa.webp",
          ],
          [
            "emoji",
            "moge",
            "https://nostrcheck.me/media/public/83274e8d72acfc3f3b1540511bf5a6f05b6205cc0033e7e307a3478b2f25536c.webp",
          ],
          [
            "emoji",
            "mogee",
            "https://nostrcheck.me/media/public/abdef8c7022fe5d99832ea581c1af5044adaa9d07ade3aa3b96ef3da8c8ed1de.webp",
          ],
          [
            "emoji",
            "monopaca_kao",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/monopaka.webp",
          ],
          [
            "emoji",
            "monobeampaca_kao",
            "https://image.nostr.build/b63e654b02d001c0f49a0a6d4b2a766215be1571709d7576f6fc238e9b21f572.png",
          ],
        ],
        sig: "e45834e293be372b74921dfd48fdb2d85e17f4c30f1c5aaac4f419d7b1c9cb4d0ccd394a87d2e83354f0166502f2397f4dccf69bb2e98fa75ac2035d83f27420",
      },
    },
    {
      from: "wss://nostr-relay.nokotaro.com",
      type: "EVENT",
      message: [
        "EVENT",
        "sub:0",
        {
          id: "edb7a09cae625557cad3f14863a4b833efe9cb3dbaab900e49269f7dd453e316",
          kind: 30030,
          pubkey:
            "84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5",
          created_at: 1707964589,
          content: "",
          tags: [
            ["d", "mono"],
            [
              "emoji",
              "kira",
              "https://nostrcheck.me/media/lokuyow/nostrcheck.me_05449b2c98c6988d463147fbb4858130d81c78bad46a991d.webp",
            ],
            [
              "emoji",
              "wayo",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/emoji-wayo.webp",
            ],
            [
              "emoji",
              "sennou_mn",
              " https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/sennou.webp",
            ],
            [
              "emoji",
              "mn",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/mono.webp",
            ],
            [
              "emoji",
              "souji",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji.webp",
            ],
            [
              "emoji",
              "souji_erai",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji_erai.webp",
            ],
            [
              "emoji",
              "souji_mn",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji_mn.webp",
            ],
            [
              "emoji",
              "te",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/te.webp",
            ],
            [
              "emoji",
              "sowawayo",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/sowawayo.webp",
            ],
            [
              "emoji",
              "unyowayo",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/unyowayo.webp",
            ],
            [
              "emoji",
              "tei_kaizou_mn",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/tei_kaizou.webp",
            ],
            [
              "emoji",
              "iiaaa",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/iiaaa.webp",
            ],
            [
              "emoji",
              "iiaa",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/iiaa.webp",
            ],
            [
              "emoji",
              "pemono",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/pemono.webp",
            ],
            [
              "emoji",
              "zzz",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/zzz.webp",
            ],
            [
              "emoji",
              "moon",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/moon.webp",
            ],
            [
              "emoji",
              "oaa",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/oaa.webp",
            ],
            [
              "emoji",
              "moge",
              "https://nostrcheck.me/media/public/83274e8d72acfc3f3b1540511bf5a6f05b6205cc0033e7e307a3478b2f25536c.webp",
            ],
            [
              "emoji",
              "mogee",
              "https://nostrcheck.me/media/public/abdef8c7022fe5d99832ea581c1af5044adaa9d07ade3aa3b96ef3da8c8ed1de.webp",
            ],
            [
              "emoji",
              "monopaca_kao",
              "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/monopaka.webp",
            ],
            [
              "emoji",
              "monobeampaca_kao",
              "https://image.nostr.build/b63e654b02d001c0f49a0a6d4b2a766215be1571709d7576f6fc238e9b21f572.png",
            ],
          ],
          sig: "a0d9ad38f2ecf952738966c458b415247de76601b239e1234ba4d027d8d71b6fb71119a461d978ae783cc0d97c467436574183272a9c1575f364e2f2de0475fc",
        },
      ],
      subId: "sub:0",
      event: {
        id: "edb7a09cae625557cad3f14863a4b833efe9cb3dbaab900e49269f7dd453e316",
        kind: 30030,
        pubkey:
          "84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5",
        created_at: 1707964589,
        content: "",
        tags: [
          ["d", "mono"],
          [
            "emoji",
            "kira",
            "https://nostrcheck.me/media/lokuyow/nostrcheck.me_05449b2c98c6988d463147fbb4858130d81c78bad46a991d.webp",
          ],
          [
            "emoji",
            "wayo",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/emoji-wayo.webp",
          ],
          [
            "emoji",
            "sennou_mn",
            " https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/sennou.webp",
          ],
          [
            "emoji",
            "mn",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/mono.webp",
          ],
          [
            "emoji",
            "souji",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji.webp",
          ],
          [
            "emoji",
            "souji_erai",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji_erai.webp",
          ],
          [
            "emoji",
            "souji_mn",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/souji_mn.webp",
          ],
          [
            "emoji",
            "te",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/te.webp",
          ],
          [
            "emoji",
            "sowawayo",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/sowawayo.webp",
          ],
          [
            "emoji",
            "unyowayo",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/unyowayo.webp",
          ],
          [
            "emoji",
            "tei_kaizou_mn",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/tei_kaizou.webp",
          ],
          [
            "emoji",
            "iiaaa",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/iiaaa.webp",
          ],
          [
            "emoji",
            "iiaa",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/iiaa.webp",
          ],
          [
            "emoji",
            "pemono",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/pemono.webp",
          ],
          [
            "emoji",
            "zzz",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/zzz.webp",
          ],
          [
            "emoji",
            "moon",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/moon.webp",
          ],
          [
            "emoji",
            "oaa",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/oaa.webp",
          ],
          [
            "emoji",
            "moge",
            "https://nostrcheck.me/media/public/83274e8d72acfc3f3b1540511bf5a6f05b6205cc0033e7e307a3478b2f25536c.webp",
          ],
          [
            "emoji",
            "mogee",
            "https://nostrcheck.me/media/public/abdef8c7022fe5d99832ea581c1af5044adaa9d07ade3aa3b96ef3da8c8ed1de.webp",
          ],
          [
            "emoji",
            "monopaca_kao",
            "https://raw.githubusercontent.com/TsukemonoGit/TsukemonoGit.github.io/main/img/emoji/monopaka.webp",
          ],
          [
            "emoji",
            "monobeampaca_kao",
            "https://image.nostr.build/b63e654b02d001c0f49a0a6d4b2a766215be1571709d7576f6fc238e9b21f572.png",
          ],
        ],
        sig: "a0d9ad38f2ecf952738966c458b415247de76601b239e1234ba4d027d8d71b6fb71119a461d978ae783cc0d97c467436574183272a9c1575f364e2f2de0475fc",
      },
    },
  ],
};
