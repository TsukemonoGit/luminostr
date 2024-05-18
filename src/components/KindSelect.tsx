import {
  Button,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@suid/material";
import { Accessor, For, Setter, createSignal } from "solid-js";
import { kinds, sortedKinds } from "../lib/nostr/kinds";

export default function KindSelect({
  kind,
  setKind,
}: {
  kind: Accessor<string>;
  setKind: Setter<string>;
}) {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => Boolean(anchorEl());
  const handleClose = (index: number) => {
    if (typeof index === "number") {
      setKind(index.toString());
    }
    setAnchorEl(null);
  };
  return (
    <div>
      <Grid
        container
        direction={"row"}
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={false}>
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
        <Grid item xs>
          <TextField
            label="Kind"
            type="number"
            value={kind()}
            onChange={(event, value) => {
              setKind(value);
            }}
            //     helperText={kind()}
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
        <For each={Array.from(sortedKinds)}>
          {([number, string]) => (
            <>
              <MenuItem onClick={() => handleClose(number)}>
                {string} -
                <Typography variant="caption" marginLeft={1}>
                  {" "}
                  kind: {number}
                </Typography>
              </MenuItem>
            </>
          )}
        </For>
      </Menu>
    </div>
  );
}
