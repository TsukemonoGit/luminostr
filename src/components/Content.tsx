import { Button, Stack, ThemeProvider } from "@suid/material";
export default function Content() {
  return (
    <main>
      content
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </main>
  );
}
