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

export default function About(props: {
  handleModalClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  nosEvent: Accessor<EventPacket | null>;
}) {
  const theme = useTheme();

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
        <Typography variant="body1" sx={{ m: 1 }}>
          特定のkindの置換可能（replaceable）イベントをいろんなリレーから探しだして、特定の時点でのイベントで上書きする（現在時刻で再書込みする）
        </Typography>
        <Typography variant="body1" sx={{ m: 1 }}>
          また、手持ちのローカルJSONファイルで上書きするためのツール
        </Typography>
      </Box>
    </Modal>
  );
}
