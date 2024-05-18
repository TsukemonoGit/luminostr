import {
  Button,
  Container,
  Stack,
  TextField,
  ThemeProvider,
} from "@suid/material";
import { createSignal } from "solid-js";
import KindSelect from "./KindSelect";
import PubkeySet from "./PubkeySet";
export default function Content() {
  const [kind, setKind] = createSignal("");
  const [pubkey, setPubkey] = createSignal("");
  return (
    <main>
      <Container maxWidth="lg" sx={{ marginTop: "4rem" }}>
        content
        <Stack spacing={2} direction="column">
          <PubkeySet pubkey={pubkey} setPubkey={setPubkey} />
          <KindSelect kind={kind} setKind={setKind} />
          {kind()}
        </Stack>
      </Container>
    </main>
  );
}
