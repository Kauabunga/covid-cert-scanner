import React from "react";
import Typography from "@mui/material/Typography";
import MainLayout from "../MainLayout";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  useSetJwk,
  useJwkId,
  useNzJwkId,
  useExampleJwkId,
  getExampleJwk,
  getNzJwk,
} from "../../state/jwk";
import Loader from "../Loader";

export default function Config() {
  return (
    <React.Suspense fallback={<Loader />}>
      <ConfigComponent />
    </React.Suspense>
  );
}

function ConfigComponent() {
  const setJwk = useSetJwk();
  const currentJwkId = useJwkId();
  const nzJwkId = useNzJwkId();
  const exampleJwkId = useExampleJwkId();

  return (
    <MainLayout>
      <FormControl component="fieldset">
        <FormLabel component="legend">Current Jwk</FormLabel>
        <RadioGroup
          aria-label="jwk"
          value={currentJwkId}
          onClick={(e) =>
            e.target.value === exampleJwkId
              ? setJwk(getExampleJwk())
              : setJwk(getNzJwk())
          }
          name="radio-buttons-group"
        >
          <FormControlLabel value={nzJwkId} control={<Radio />} label="NZ" />
          <FormControlLabel
            value={exampleJwkId}
            control={<Radio />}
            label="Example"
          />
        </RadioGroup>
      </FormControl>
    </MainLayout>
  );
}
