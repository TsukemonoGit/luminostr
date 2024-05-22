import { Accessor, Match, Setter, Switch, createSignal } from "solid-js";
import LightSwitch from "./util/LightSwitch";
import {
  Button,
  Container,
  Link,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@suid/material";
import AboutModal from "./modals/AboutModal";
import FormModal from "./modals/FormModal";
import { sendMessage } from "../lib/nostr/nostrfunc";
import { useLanguage } from "./util/useLanguage";

export default function Header({
  setModalSettings,
  setToastState,
  setNowProgress,
}: {
  setModalSettings: Setter<ModalSettings>;
  setToastState: Setter<ToastSettings>;
  setNowProgress: Setter<boolean>;
}) {
  const isJapanese = useLanguage();
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
    //send feedback
    if (e.message) {
      console.log(e.message);
      sendFeedback(e.message);
    }
  };
  const sendHex =
    "54fd3172bbc4110646ddb0410dc5451bf141a47e00cbfa2e7e238d9e8f3392de";
  const sendFeedback = async (str: string) => {
    setNowProgress(true);
    try {
      const result = await sendMessage(str, sendHex);
      const hasSuccess = Array.from(result.values()).some(
        (isSuccess) => isSuccess
      );
      if (!hasSuccess) {
        throw Error;
      }
      setToastState({
        open: true,
        message: isJapanese() ? (
          <>フィードバックを送信いただきありがとうございます！</>
        ) : (
          <>Thank you for reaching out!</>
        ),
        type: "success",
      });
    } catch (error) {
      setToastState({
        open: true,
        message: isJapanese() ? (
          <>
            フィードバックの送信に失敗しました。後ほどもう一度お試しください。
          </>
        ) : (
          <>Failed to send your message. Please try again later.</>
        ),
        type: "error",
      });
    }
    setNowProgress(false);
  };
  const handleClickFeedback = () => {
    setModalSettings({
      component: FormModal,
      props: {
        handleModalClose: handleModalClose,
      },
      open: true,
    });
  };

  const headerMenu = () => {
    const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
    const open = () => Boolean(anchorEl());
    const handleClose = () => {
      setAnchorEl(null);
    };

    const matches = useMediaQuery("(min-width:600px)");
    return (
      <>
        <Switch>
          <Match when={matches()}>
            {/* 横幅広いとき */}
            <Stack flexDirection="row" gap={1} flex="auto" justifyContent="end">
              <Button
                sx={{ alignContent: "center" }}
                onClick={handleClickAbout}
              >
                About
              </Button>
              <Button
                sx={{ alignContent: "center" }}
                onClick={handleClickFeedback}
              >
                Feedback
              </Button>
              <LightSwitch />
            </Stack>
          </Match>
          <Match when={!matches()}>
            {/* 横幅せまいとき */}
            <Button
              id="basic-button"
              aria-controls={open() ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open() ? "true" : undefined}
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              Menu
            </Button>
          </Match>
        </Switch>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl()}
          open={open()}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          <MenuItem>
            <Button sx={{ alignContent: "center" }} onClick={handleClickAbout}>
              About
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              sx={{ alignContent: "center" }}
              onClick={handleClickFeedback}
            >
              Feedback
            </Button>
          </MenuItem>
          <MenuItem>
            <LightSwitch />
          </MenuItem>
        </Menu>
      </>
    );
  };
  return (
    <header>
      <Stack
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
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
            {headerMenu()}
          </Stack>
        </Container>
      </Stack>
    </header>
  );
}
