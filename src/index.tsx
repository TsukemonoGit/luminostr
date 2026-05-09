/* @refresh reload */
import { render } from "solid-js/web";
import { waitNostr } from "nip07-awaiter";
import { init as initNostrLogin } from "@konemono/nostr-login";

import "./index.css";
import App from "./App";
import {
  createPalette,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@suid/material";
import { createMemo } from "solid-js";
import LayoutContext, { createLayoutMutable } from "./LayoutContext";

const drawerWidth = 240;
const context = createLayoutMutable({
  drawer: {
    width: drawerWidth,
  },
});

const palette = createMemo(() =>
  createPalette({
    mode: context.darkMode ? "dark" : "light",
  }),
);

const theme = createTheme({
  palette,
});

// Ensure Nostr providers are ready before any window.nostr usage.
await waitNostr(1000);
initNostrLogin({
  // Configure options if needed.
});

const root = document.getElementById("root");
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <LayoutContext.Provider value={context}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <App />
      </ThemeProvider>
    </LayoutContext.Provider>
  ),
  root!,
);
