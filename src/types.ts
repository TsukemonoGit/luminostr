interface ToastSettings {
  open: boolean;
  message: string;
  type: "success" | "info" | "warning" | "error";
  timeout?: number;
}
