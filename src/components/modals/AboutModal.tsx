//JsonModal.tsx
import {
  Modal,
  Box,
  Grid,
  useTheme,
  Button,
  Link,
  Typography,
  Stack,
  IconButton,
} from "@suid/material";
import { EventPacket } from "rx-nostr";
import { Accessor, Match, Show, Switch } from "solid-js";
import { githubIcon, nostrIcon, lightningIcon2 } from "../../lib/icons";
import { useLanguage } from "../util/useLanguage";

export default function About(props: {
  handleModalClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  nosEvent: Accessor<EventPacket | null>;
}) {
  const theme = useTheme();
  const [, , isJapanese] = useLanguage();
  const aboutText = () => {
    return (
      <Switch>
        <Match when={isJapanese()}>
          <Typography variant="body1" sx={{ m: 1 }}>
            特定のkindの置換可能（replaceable）イベントをいろんなリレーから探しだして、特定の時点でのイベントで上書きする（現在時刻で再書込みする）
          </Typography>
          <Typography variant="body1" sx={{ m: 1 }}>
            また、手持ちのローカルJSONファイルで上書きするためのツール
          </Typography>
        </Match>
        <Match when={!isJapanese()}>
          <Typography variant="body1" sx={{ m: 1 }}>
            Find replaceable events of a specific kind from various relays, and
            overwrite them with the events at a specific point in time (rewrite
            at the current time).
          </Typography>
          <Typography variant="body1" sx={{ m: 1 }}>
            It can also be overwritten with locally available JSON files.
          </Typography>
        </Match>
      </Switch>
    );
  };
  return (
    <Modal
      open={true}
      onClose={props.handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ color: theme.palette.text.primary }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "600px",
          width: "90vw",
          maxHeight: "70vh",
          bgcolor: theme.palette.background.paper,
          border: "2px solid #000",
          boxShadow: "24px",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">About Luminostr</Typography>
        {aboutText()}
        <Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: [2, 4, 4],
            }}
          >
            <IconButton
              aria-label="ソースコードへのリンク"
              onClick={() => {
                window.open(
                  "https://github.com/TsukemonoGit/luminostr",
                  "_blank",
                  "noreferrer"
                );
              }}
              sx={{}}
            >
              <Stack
                innerHTML={githubIcon}
                sx={{
                  fill: useTheme().palette.text.primary,
                  width: "24px",
                }}
              />
            </IconButton>
            <IconButton
              aria-label="nostterのmonoページへのリンク"
              onClick={() => {
                window.open(
                  "https://nostter.app/mono@tsukemonogit.github.io",
                  "_blank",
                  "noreferrer"
                );
              }}
              sx={{}}
            >
              <Stack
                innerHTML={nostrIcon}
                sx={{
                  width: "28px",
                }}
              />
            </IconButton>
            <IconButton
              id="nostr-zap-target"
              aria-label="Zapボタン"
              data-npub="npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw"
              data-relays="wss://nostr.mutinywallet.com,wss://relayable.org,wss://nos.lol,wss://nostr.wine,wss://relay.nostr.band,wss://yabu.me"
              data-note-id="note160q4w6ar27qjpwrfxhnwv5ra3hpj552m230kau4vg5sf3d9das3q0hvglm"
            >
              <Stack
                innerHTML={lightningIcon2}
                sx={{
                  fill: useTheme().palette.warning.light,
                }}
              />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
