import React from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ marginTop: 24, marginBottom: 24 }}
    >
      <CircularProgress size={64} thickness={5} />
    </Grid>
  );
}
