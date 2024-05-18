import {
  Button,
  Container,
  Stack,
  TextField,
  ThemeProvider,
  useTheme,
} from "@suid/material";
import { createSignal } from "solid-js";
import KindSelect from "./KindSelect";
import PubkeySet from "./PubkeySet";
import MenuSelect from "./MenuSelect";
export default function Content() {
  const [kind, setKind] = createSignal("");
  const [pubkey, setPubkey] = createSignal("");
  const [menuNum, setMenuNum] = createSignal(0);

  return (
    <main>
      <Container maxWidth="lg" sx={{ marginTop: "4rem" }}>
        <MenuSelect menuNum={menuNum} setMenuNum={setMenuNum} />
        <Stack
          spacing={2}
          direction="column"
          // width={useTheme().breakpoints.values.sm}
          maxWidth="100%"
          m="auto"
          mt={2}
        >
          <PubkeySet pubkey={pubkey} setPubkey={setPubkey} />
          <KindSelect kind={kind} setKind={setKind} />
        </Stack>{" "}
        {kind()} {menuNum()}
      </Container>
    </main>
  );
}
