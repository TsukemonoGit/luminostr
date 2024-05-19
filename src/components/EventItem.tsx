import { Grid, Typography } from "@suid/material";
import Button from "@suid/material/Button";
import { EventPacket } from "rx-nostr";
import type * as Nostr from "nostr-typedef";
export default function EventItem(props: {
  nosEvent: EventPacket;
  handleClickEvent: (arg0: EventPacket) => void;

  handleClickPublish: (arg0: EventPacket) => void;
}) {
  const { nosEvent, handleClickEvent, handleClickPublish } = props;

  return (
    <Grid container spacing={1} sx={{ my: 0.1 }}>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          mr: 1,
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickPublish(nosEvent)}
          sx={{
            py: [1, 2, 2],
            px: 1,
          }}
        >
          Publish
        </Button>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ fontSize: 20 }}
        >
          {new Date(nosEvent.event.created_at * 1000).toLocaleString()}
        </Typography>

        <Grid item>
          tags.length: {nosEvent?.event.tags?.length}, content.length:
          {nosEvent?.event.content?.length}
        </Grid>
        <Grid item>
          <Button
            sx={{
              placeContent: "end",

              width: "100%",
            }}
            onClick={() => handleClickEvent(nosEvent)}
          >
            もっとみる
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
