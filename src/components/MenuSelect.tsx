import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  useTheme,
  alpha,
  Box,
  Modal,
  Typography,
  IconButton,
  Link,
  Stack,
} from "@suid/material";
import { Accessor, For, Setter, createSignal } from "solid-js";
import { extensionRelays } from "../lib/nostr/relays";
import HelpOutlineIcon from "@suid/icons-material/HelpOutline";
export default function MenuSelect({
  menuNum,
  setMenuNum,
  nowProgress,
}: {
  menuNum: Accessor<number>;
  setMenuNum: Setter<number>;
  nowProgress: Accessor<boolean>;
}) {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: { target: { value: any } }) => {
    setMenuNum(event.target.value as number);
  };
  return (
    <>
      <Card
        sx={{ bgcolor: alpha(useTheme().palette.secondary.light, 0.1), p: 2 }}
      >
        <FormControl disabled={nowProgress()}>
          <FormLabel id="controlled-radio-buttons-group">
            Select Relay Count
            <IconButton onClick={handleOpen}>
              <HelpOutlineIcon />
            </IconButton>
          </FormLabel>
          <RadioGroup
            aria-labelledby="controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={menuNum()}
            onChange={handleChange}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="about 30 relay"
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="about 60 relay"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="about 200 relay"
            />
            <FormControlLabel
              value={3}
              control={<Radio />}
              label="about 400 relay"
            />
          </RadioGroup>
        </FormControl>
      </Card>
      <Modal
        open={open()}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 400,
            width: "90vw",
            bgcolor: useTheme().palette.background.paper,
            // border: "2px solid #000",
            boxShadow: "24px",
            borderRadius: 2,
            p: 4,
            maxHeight: "90%",
            overflowY: "auto",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            About Relays
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your kind:10002 relays +
            <For each={extensionRelays.sort()} fallback={<div>Loading...</div>}>
              {(item) => <Stack sx={{ fontSize: "small" }}>{item}</Stack>}
            </For>
            + NIP-66 relays
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
