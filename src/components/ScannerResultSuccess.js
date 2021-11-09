import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useJwkId } from "../state/jwk";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ScannerResultSuccess({ token }) {
  const currentJwkId = useJwkId();
  const credentialSubject = token?.vc?.credentialSubject;

  return (
    <Grid container justifyContent="center" style={{ padding: 24 }}>
      <Grid item>
        <CheckCircleIcon style={{ fontSize: 100, marginBottom: 24 }} />
      </Grid>

      <Grid container>
        <Typography color="textSecondary" variant="h5">
          Given Name:
        </Typography>
        <Grid item style={{ flexGrow: 1 }} />
        <Typography variant="h5">
          <strong>{credentialSubject.givenName}</strong>
        </Typography>
      </Grid>

      <Grid container>
        <Typography color="textSecondary" variant="h5">
          Family Name:
        </Typography>
        <Grid item style={{ flexGrow: 1 }} />
        <Typography variant="h5">
          <strong>{credentialSubject.familyName}</strong>
        </Typography>
      </Grid>

      <Grid container>
        <Typography color="textSecondary" variant="h5">
          DOB:
        </Typography>
        <Grid item style={{ flexGrow: 1 }} />
        <Typography variant="h5">
          <strong>{credentialSubject.dob}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
}
