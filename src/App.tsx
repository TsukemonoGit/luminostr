import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  ThemeProvider,
  createPalette,
  createTheme,
  styled,
  useMediaQuery,
  useTheme,
} from "@suid/material";
import { Show, createEffect, createMemo, createSignal } from "solid-js";
import Head from "./components/Head";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Toast from "./components/modals/Toast";
import { Dynamic } from "solid-js/web";

export default function App() {
  const [toastState, setToastState] = createSignal<ToastSettings>({
    open: false,
    message: <></>,
    type: "info",
  });

  const [nowProgress, setNowProgress] = createSignal(false);
  const handleToastClose = () => {
    setToastState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };
  const [modalSettings, setModalSettings] = createSignal<ModalSettings>({
    open: false,
    component: undefined,
    props: null,
  });
  return (
    <>
      <Head />

      <Header setModalSettings={setModalSettings} />
      <Content
        setNowProgress={setNowProgress}
        nowProgress={nowProgress}
        setToastState={setToastState}
        setModalSettings={setModalSettings}
      />
      <Footer />
      <Toast handleToastClose={handleToastClose} toastState={toastState} />
      <Show when={nowProgress()}>
        <CircularProgress
          color="secondary"
          sx={{ position: "fixed", bottom: 10, right: 10 }}
          size={100}
        />
      </Show>
      <Show when={modalSettings().open}>
        <Dynamic
          component={modalSettings().component}
          {...modalSettings().props}
        />
      </Show>
    </>
  );
}
