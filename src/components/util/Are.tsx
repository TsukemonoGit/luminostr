import { Breakpoint, Stack, Theme } from "@suid/material";
import { JSX } from "solid-js/jsx-runtime";
import CheckIcon from "@suid/icons-material/Check";
import WarningAmberIcon from "@suid/icons-material/WarningAmber";
export const publishedJSX = (
  theme: Theme<Breakpoint>,
  res: Map<string, boolean>
) => {
  const message: JSX.Element[] = []; //[<div>Published</div>];
  for (const [relayUrl, isSuccess] of res.entries()) {
    message.push(
      <Stack flexDirection="row">
        {isSuccess ? (
          <CheckIcon sx={{ fill: theme.palette.success.main }} />
        ) : (
          <WarningAmberIcon sx={{ fill: theme.palette.error.main }} />
        )}
        {relayUrl}
      </Stack>
    );
  }
  return message;
};
