import { Box, Fade, Alert, useTheme, AlertTitle } from "@suid/material";
import { Accessor, Show, createEffect, createSignal } from "solid-js";

interface Props {
  handleToastClose: () => void; // ハンドラー関数の型を修正
  toastState: Accessor<ToastSettings>;
  sx?: any;
}

export default function Toast({ handleToastClose, toastState, sx }: Props) {
  const [open, setOpen] = createSignal<boolean>(false); // 初期値をfalseに設定

  createEffect(() => {
    console.log(toastState().open);
    setOpen(toastState().open);
  });

  createEffect(() => {
    let timer: number | undefined;
    if (open()) {
      timer = setTimeout(() => {
        handleToastClose();
      }, (toastState().timeout ?? 5) * 1000);
    }
    return () => clearTimeout(timer);
  });

  return (
    <Fade in={open()}>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,

          left: 5,
          right: 5,
          ml: "auto",
          display: "flex",
          justifyContent: "center",
          ...sx,

          wordBreak: "break-all",
          whiteSpace: "pre-line",
        }}
      >
        <Alert
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: "1024px",
            bgcolor: useTheme().palette.background.paper,
          }}
          severity={toastState()?.type}
        >
          <Show when={toastState()?.title}>
            <AlertTitle>{toastState()?.title}</AlertTitle>
          </Show>
          {toastState()?.message}
        </Alert>
      </Box>
    </Fade>
  );
}
