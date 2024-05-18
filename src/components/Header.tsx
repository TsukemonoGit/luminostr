import { Accessor, Setter } from "solid-js";
import LightSwitch from "./util/LightSwitch";
import { Container, Stack, Typography, alpha, useTheme } from "@suid/material";

export default function Header() {
  return (
    <header>
      <Stack
        sx={{ width: "100%", position: "fixed", top: 0, left: 0, zIndex: 1 }}
      >
        <Container maxWidth="lg">
          <Stack
            sx={{
              boxShadow: useTheme().shadows[4],

              background: alpha(useTheme().palette.primary.light, 0.2),
              backdropFilter: "blur(8px)",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              padding: "0 6px ",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              marginBottom={0}
              sx={{ alignContent: "center" }}
            >
              Title
            </Typography>
            <Stack>
              <LightSwitch />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </header>
  );
}
