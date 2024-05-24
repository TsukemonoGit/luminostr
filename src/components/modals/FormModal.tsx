import {
  Modal,
  Box,
  Grid,
  useTheme,
  Button,
  Typography,
  TextField,
} from "@suid/material";
import { EventPacket } from "rx-nostr";
import { Accessor, createSignal } from "solid-js";
import { useLanguage } from "../util/useLanguage";

export default function FormModal(props: {
  handleModalClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  nosEvent: Accessor<EventPacket | null>;
}) {
  const theme = useTheme();
  const [name, setName] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [error, setError] = createSignal(false);
  const [, , isJapanese] = useLanguage();
  const MAX_MESSAGE_LENGTH = 400; // メッセージの最大長

  const handleClickSend = async () => {
    if (message().trim() === "") {
      setError(true);
      return;
    }
    if (name().trim() === "") {
      setName("anonymous");
    }

    if (message().trim() !== "") {
      // ここでメッセージを送信する処理を行う
      const mes = "[Luminostr]\nfrom\n" + name() + "\n\nmessage\n" + message();
      console.log(message());
      props?.handleModalClose?.({ message: mes }, "backdropClick");
    }
  };

  // メッセージ欄に入力があった場合にエラー状態を解消する関数
  const handleInputChange = (e: any) => {
    if (e.target.value.trim() !== "") {
      setError(false);
    }
    setMessage(e.target.value);
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
        <Grid
          container
          spacing={2}
          sx={{ height: "100%" }}
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h6">Send Feedback</Typography>

          <Typography
            sx={{ fontSize: 14, maxWidth: "90%", textAlign: "center" }}
            color="text.secondary"
            gutterBottom
          >
            {isJapanese()
              ? "メッセージはランダムに生成された鍵を使用して暗号化されたDM（NIP-04）経由で送信されます。"
              : "Your message will be sent via encrypted DM (NIP-04) using a randomly generated key."}
          </Typography>
          <Grid
            item
            width={400}
            maxWidth={"90%"}
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              placeContent: "center",
              overflowY: "auto",
              fontSize: "small",
            }}
          >
            <TextField
              fullWidth
              type="text"
              placeholder="name (not required)"
              value={name()}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid
            width={400}
            maxWidth={"90%"}
            item
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              height: "50%",
              overflowY: "auto",
              fontSize: "small",
            }}
          >
            <TextField
              fullWidth
              placeholder="message"
              value={message()}
              multiline
              rows={4}
              onChange={handleInputChange} // 入力変更時に呼び出す関数を変更
              error={error()}
              helperText={
                error()
                  ? `Message is required and must be less than ${MAX_MESSAGE_LENGTH} characters`
                  : ""
              }
              inputProps={{ maxLength: MAX_MESSAGE_LENGTH }} // 最大文字数を設定
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handleClickSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
