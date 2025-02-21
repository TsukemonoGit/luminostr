import {
  Box,

  Container,
  Divider,

  alpha,
  useTheme,
} from "@suid/material";
import "@konemono/nostr-share-component"

export default function Footer() {
  const theme = useTheme();

  return (
    <footer style={{
      position: "fixed", "z-index": 10,
      width: "100%",
      bottom: 0,
    }}>
      <Container
        maxWidth="lg"
        sx={{
          /*bgcolor: `${alpha(useTheme().palette.divider, 0.1)}`,*/
          p: 0.5,
          display: "flex",
          justifyContent: "end",
        }}
      >{/*@ts-ignore*/}
        <nostr-share>Share on Nostr</nostr-share>
      </Container>
    </footer >
  );
}
