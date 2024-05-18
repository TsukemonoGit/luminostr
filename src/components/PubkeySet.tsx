import { Button, Grid, TextField, useTheme } from "@suid/material";
import { Accessor, For, Setter, createSignal } from "solid-js";
import type * as Nostr from "nostr-typedef";
import { nip19 } from "nostr-tools";
export default function PubkeySet({
  pubkey,
  setPubkey,
}: {
  pubkey: Accessor<string>;
  setPubkey: Setter<string>;
}) {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => Boolean(anchorEl());
  const handleClose = (index: number) => {
    console.log(index);
    setPubkey(index.toString());
    setAnchorEl(null);
  };
  return (
    <>
      <Grid
        container
        direction={"row"}
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={"auto"}>
          <Button
            variant="contained"
            sx={{ height: "56px" }}
            onClick={async (event) => {
              try {
                const pub = await (
                  window.nostr as Nostr.Nip07.Nostr
                ).getPublicKey();
                if (pub) {
                  setPubkey(nip19.npubEncode(pub));
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            GetPub
          </Button>
        </Grid>
        <Grid item xs sx={{ width: "100%" }}>
          <TextField
            sx={{ width: "100%" }}
            label="Pubkey"
            type="text"
            value={pubkey()}
            onChange={(event, value) => setPubkey(value)}
            //     helperText={pubkey()}
          />
        </Grid>
      </Grid>
    </>
  );
}
