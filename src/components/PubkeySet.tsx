import { Button, Grid, TextField, useTheme } from "@suid/material";
import { Accessor, For, Setter, createSignal } from "solid-js";
import type * as Nostr from "nostr-typedef";
import { nip19 } from "nostr-tools";
export default function PubkeySet({
  pubkey,
  setPubkey,
  pubkeyError,
  nowProgress,
}: {
  pubkey: Accessor<string>;
  setPubkey: Setter<string>;
  pubkeyError: Accessor<boolean>;
  nowProgress: Accessor<boolean>;
}) {
  return (
    <>
      <Grid container direction={"row"} sx={{}}>
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
            error={pubkeyError()}
            sx={{ width: "100%" }}
            label="Pubkey"
            type="text"
            value={pubkey()}
            onChange={(event, value) => setPubkey(value)}
            helperText={pubkeyError() ? "Incorrect entry." : ""}
            disabled={nowProgress()}
          />
        </Grid>
      </Grid>
    </>
  );
}
