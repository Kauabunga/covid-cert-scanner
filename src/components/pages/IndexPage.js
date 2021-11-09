import React from "react";
import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";

import { useSetCode, useToken } from "../../state/token";

const QrReader = dynamic(() => import("react-qr-reader"), {
  loading: () => null,
  ssr: false,
});

export default function Index() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
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

        <pre
          style={{
            margin: 0,
            height: 192,
            width: "100vw",
            overflow: "auto",
            padding: 24,
          }}
        >
          {token ? JSON.stringify(token, null, 2) : "null"}
        </pre>
      </Grid>
    </>
  );
}

function getFacingMode() {
  if (typeof window === "undefined") {
    return "environment";
  }

  return window.innerHeight < window.innerWidth ? "user" : "environment";
}
