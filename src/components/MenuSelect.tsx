import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  useTheme,
  alpha,
} from "@suid/material";
import { Accessor, Setter } from "solid-js";

export default function MenuSelect({
  menuNum,
  setMenuNum,
}: {
  menuNum: Accessor<number>;
  setMenuNum: Setter<number>;
}) {
  const handleChange = (event: { target: { value: any } }) => {
    setMenuNum(event.target.value as number);
  };
  return (
    <Card
      sx={{ bgcolor: alpha(useTheme().palette.secondary.light, 0.1), p: 2 }}
    >
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Menu</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
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
            label="about 200 relay "
          />
          <FormControlLabel value={3} control={<Radio />} label="MAX" />
        </RadioGroup>
      </FormControl>
    </Card>
  );
}
