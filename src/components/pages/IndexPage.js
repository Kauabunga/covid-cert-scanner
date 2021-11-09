import React from "react";
import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useSetCode, useToken } from "../../state/token";
import Loader from "../Loader";
import { useJwkId } from "../../state/jwk";

const QrReader = dynamic(() => import("react-qr-reader"), {
  loading: () => null,
  ssr: false,
});

export default function Index() {
  return (
    <React.Suspense fallback={<Loader />}>
      <IndexComponent />
    </React.Suspense>
  );
}

function IndexComponent() {
  const setCode = useSetCode();
  const token = useToken();

  const handleScan = (data) => {
    if (data) {
      console.log("Handle scan", data);
      setCode(data);
    }
  };

  const handleError = (err) => {
    // Retry permissions
    console.error("Permissions error", err);

    navigator.permissions
      .query({ name: "camera" })
      .then((permissionObj) => {
        console.log(permissionObj.state);
        if (permissionObj.state === "denied") {
          navigator.mediaDevices
            .getUserMedia({ audio: false, video: true })
            .then(() => window.location.reload());
        }
      })
      .catch((error) => {
        console.log("Got error :", error);
      });
  };

  const facingMode = getFacingMode();

  return (
    <>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item style={{ width: "100%" }}>
          <QrReader
            facingMode={facingMode}
            delay={100}
            onError={handleError}
            onScan={handleScan}
            style={{
              maxWidth: "calc(100vh - 64px - 192px)",
              width: "100%",
              margin: "0 auto",
            }}
          />
        </Grid>

        <Grid item>
          {token && token.error && <TokenError token={token} />}
          {token && !token.error && <TokenSuccess token={token} />}
        </Grid>
      </Grid>
    </>
  );
}

function TokenError({ token }) {
  return (
    <Grid container direction="column" style={{ marginTop: 24 }}>
      <Typography variant="h5" color="error">
        Error: {token.error}
      </Typography>
    </Grid>
  );
}

function TokenSuccess({ token }) {
  const currentJwkId = useJwkId();
  const credentialSubject = token?.vc?.credentialSubject;

  return (
    <div style={{ padding: 24 }}>
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

      
    </div>
  );
}

function getFacingMode() {
  if (typeof window === "undefined") {
    return "environment";
  }

  return window.innerHeight < window.innerWidth ? "user" : "environment";
}
