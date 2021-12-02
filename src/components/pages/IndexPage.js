import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";

import { useSetCode, useToken } from "../../state/token";
import MainLayout from "../MainLayout";
import Loader from "../Loader";
import {
  useSetCameraAllowedState,
  useCameraFacingState,
  useCameraAllowedSelector,
  useSetCameraFacingState,
} from "../../state/camera";
import ScannerResultModal from "../ScannerResultModal";
import ScannerResultSuccess from "../ScannerResultSuccess";
import ScannerResultError from "../ScannerResultError";
import { useHashParam, clearHashParams } from "../../hooks/useHashParam";

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
  const cameraAllowed = useCameraAllowedSelector();

  return (
    <>
      {cameraAllowed && <Scanner />}
      {!cameraAllowed && <ScannerIntro />}
    </>
  );
}

function ScannerIntro() {
  const setCameraAllowed = useSetCameraAllowedState();
  const handleStartScanning = () => setCameraAllowed(true);

  return (
    <MainLayout>
      <Typography variant="h4">COVID NZ Scanner</Typography>
      <Typography variant="h6">
        This app works entirely on your device and does not upload your data
        anywhere. No tracking has been added to this site. For the offical NZ
        COVID Scanner please visit https://nzcp.covid19.health.nz.
      </Typography>

      <Button onClick={handleStartScanning}>Start Scanning</Button>
    </MainLayout>
  );
}

function Scanner() {
  const setCode = useSetCode();
  const token = useToken();
  const facingMode = useCameraFacingState();
  const setFacingMode = useSetCameraFacingState();
  const [open, setOpen] = useState(false);

  const handleToggleCamera = () =>
    setFacingMode(facingMode === "user" ? "environment" : "user");
  const handleCloseModal = () => setOpen(false);

  const handleScan = (data) => {
    if (data) {
      setCode(data);
      setOpen(true);
    }
  };

  const handleScanError = (err) => {
    console.error("Scanning error", err);

    // Retry permissions
    navigator.permissions
      .query({ name: "camera" })
      .then((permissionObj) => {
        if (permissionObj.state === "denied") {
          navigator.mediaDevices
            .getUserMedia({ audio: false, video: true })
            .then(() => window.location.reload());
        }
      })
      .catch((error) => {
        console.log("Permissions error", error);
      });
  };

  useEffect(() => {
    const hashCertParam = useHashParam("cert");
    if (hashCertParam) {
      setCode(hashCertParam);
      setOpen(true);
      clearHashParams();
    }
  }, []);

  return (
    <>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item style={{ width: "100%", position: "relative" }}>
          <IconButton
            style={{
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              right: 8,
              top: 8,
              zIndex: 100,
            }}
            onClick={handleToggleCamera}
          >
            <CameraswitchIcon style={{ fontSize: 12, color: "#fff" }} />
          </IconButton>

          <QrReader
            facingMode={facingMode}
            delay={100}
            onError={handleScanError}
            onScan={handleScan}
            style={{
              maxHeight: "calc(100vw)",
              maxWidth: "calc(100vh - 112px)",
              margin: "0 auto",
            }}
          />
        </Grid>

        <ScannerResultModal open={open} onClose={handleCloseModal}>
          {token && token.error && <ScannerResultError token={token} />}
          {token && !token.error && <ScannerResultSuccess token={token} />}
        </ScannerResultModal>
      </Grid>
    </>
  );
}
