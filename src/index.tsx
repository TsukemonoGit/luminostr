/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import {
  createPalette,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Link,
} from "@suid/material";
import { createMemo } from "solid-js";
import LayoutContext, { createLayoutMutable } from "./LayoutContext";
import Head from "./components/Head";
import { MetaProvider, Meta } from "@solidjs/meta";
import { Title } from "@suid/icons-material";

const drawerWidth = 240;
const context = createLayoutMutable({
  drawer: {
    width: drawerWidth,
  },
});

const palette = createMemo(() =>
  createPalette({
    mode: context.darkMode ? "dark" : "light",
  })
);

const theme = createTheme({
  palette,
});
const root = document.getElementById("root");
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <>
      <MetaProvider>
        <Title>Luminostr</Title>
        <Link rel="icon" href="./favicon.svg" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content="Luminostr" />
        <Meta
          property="og:image"
          content={`${window.location.origin}${
            import.meta.env.BASE_URL
          }favicon.svg`}
        />
        <Meta property="og:description" content="Event Recovery Tool" />
      </MetaProvider>
      <LayoutContext.Provider value={context}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <App />
        </ThemeProvider>
      </LayoutContext.Provider>
    </>
  ),
  root!
);
