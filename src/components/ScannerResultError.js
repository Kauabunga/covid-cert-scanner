import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import { red } from "@mui/material/colors";

export default function ScannerResultError({ token }) {
  return (
    <Grid container justifyContent="center" style={{ padding: 24 }}>
      <Grid item>
        <CancelIcon
          style={{ fontSize: 100, color: red[500], marginBottom: 24 }}
        />
      </Grid>

      <Grid container>
        <Typography variant="h5" color="error">
          Error: <strong>{token.error}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
}
