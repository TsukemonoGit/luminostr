import { Accessor, Setter } from "solid-js";
import LightSwitch from "./util/LightSwitch";
import {
  Button,
  Container,
  Link,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@suid/material";
import AboutModal from "./modals/AboutModal";

export default function Header({
  setModalSettings,
}: {
  setModalSettings: Setter<ModalSettings>;
}) {
  const handleClickAbout = () => {
    setModalSettings({
      component: AboutModal,
      props: {
        handleModalClose: handleModalClose,
      },
      open: true,
    });
  };
  const handleModalClose = async (e: any) => {
    console.log(e);

    setModalSettings((prevState: ModalSettings) => ({
      ...prevState,
      open: false,
    }));
  };
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
              Luminostr
            </Typography>
            <Stack flexDirection="row">
              <Button
                sx={{ alignContent: "center" }}
                onClick={handleClickAbout}
              >
                About
              </Button>

              <LightSwitch />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </header>
  );
}
