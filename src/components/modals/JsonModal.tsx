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
} from "@suid/material";
import { EventPacket } from "rx-nostr";
import { Accessor, Show } from "solid-js";
import { FileDownload } from "@suid/icons-material";
import { nip19 } from "nostr-tools";

export default function JsonModal(props: {
  handleModalClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  nosEvent: Accessor<EventPacket | null>;
}) {
  const url = (): string => {
    const eventId = props.nosEvent()?.event.id;
    const seenRelay = props.nosEvent()?.from;
    const nevent = nip19.neventEncode({
      id: eventId ?? "",
      relays: [seenRelay ?? ""],
      author: props.nosEvent()?.event.pubkey,
      kind: props.nosEvent()?.event.kind,
    });
    return "https://nostviewstr.vercel.app/" + nevent;
  };
  console.log(url());

  const theme = useTheme();

  // ダウンロードJSON
  const handleClickDownloadJson = () => {
    // ダウンロードするJSONデータの取得
    const jsonData = JSON.stringify(props.nosEvent()?.event, null, 2);

    // JSONデータをBlobオブジェクトに変換
    const blob = new Blob([jsonData], { type: "application/json" });

    // BlobオブジェクトからURLを生成
    const url = URL.createObjectURL(blob);
    const dtag = props
      .nosEvent()
      ?.event.tags.find((item) => item[0] === "d")?.[1];
    // ダウンロード用のリンクを作成
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookmarkRecovery_kind${props.nosEvent()?.event.kind}${
      dtag ? `_${dtag}` : ""
    }_${props.nosEvent()?.event.created_at}.json`; // ダウンロードファイルの名前を設定

    // ダウンロードリンクのクリックイベントを発生させ、ファイルをダウンロード
    document.body.appendChild(a);
    a.click();

    // ダウンロード用のリンクを削除
    document.body.removeChild(a);

    // Blobオブジェクトから生成したURLを解放
    URL.revokeObjectURL(url);
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
          width: "90vw",
          maxWidth: "800px",
          height: "70vh",
          bgcolor: theme.palette.background.paper,
          border: "2px solid #000",
          boxShadow: "24px",
          p: 4,

          maxHeight: "70vh",
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid
            item
            container
            flexWrap="wrap"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ placeSelf: "start" }}
            >
              EventJson
            </Typography>

            <Stack
              sx={{
                ml: "auto",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClickDownloadJson}
                color="primary"
                sx={{ mb: 1 }}
              >
                Download Json <FileDownload />
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",

              height: "60%",
              py: 1,
              overflowY: "auto",
              border: 1,
            }}
          >
            {JSON.stringify(props.nosEvent()?.event, null, 2)}
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              width: "100%",

              justifyContent: "end",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>seen on: {props.nosEvent()?.from}</div>
              <Show
                when={props.nosEvent() && props.nosEvent()?.from !== "Local"}
              >
                <Link
                  href={url()}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  sx={{ textAlign: "end" }}
                >
                  Open in NostViewstr
                </Link>
              </Show>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
