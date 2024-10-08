import {
  Button,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@suid/material";
import { Accessor, For, Setter, Show, createSignal } from "solid-js";
import { sortedLocaleKinds } from "../lib/nostr/kinds";
import { useLanguage } from "./util/useLanguage";

export default function KindSelect({
  kind,
  setKind,
  kindError,
  nowProgress,
}: {
  kind: Accessor<string>;
  setKind: Setter<string>;
  kindError: Accessor<boolean>;
  nowProgress: Accessor<boolean>;
}) {
  const [, , isJapanese] = useLanguage();
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => Boolean(anchorEl());
  const handleClose = (index: number) => {
    if (typeof index === "number") {
      setKind(index.toString());
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container direction={"row"} sx={{}}>
        <Grid item xs={"auto"}>
          <Button
            sx={{ height: "56px" }}
            variant="contained"
            id="basic-button"
            aria-controls={open() ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open() ? "true" : undefined}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            Select
          </Button>
        </Grid>
        <Grid item xs sx={{ width: "100%" }}>
          <TextField
            error={kindError()}
            sx={{ width: "100%" }}
            label="Kind"
            type="number"
            value={kind()}
            onChange={(event, value) => {
              setKind(value);
            }}
            helperText={kindError() ? "Incorrect entry." : ""}
            disabled={nowProgress()}
          />
        </Grid>
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl()}
        open={open()}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
        sx={{ height: "24em" }}
      >
        <For each={sortedLocaleKinds(isJapanese())}>
          {([number, { ja, en }]) => (
            <>
              <MenuItem onClick={() => handleClose(number)}>
                <Show when={isJapanese()} fallback={<>{en}</>}>
                  {ja}
                </Show>{" "}
                -
                <Typography variant="caption" marginLeft={1}>
                  {" "}
                  kind: {number}
                </Typography>
              </MenuItem>
            </>
          )}
        </For>
      </Menu>
    </>
  );
}
