import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useSetCode, useToken } from "../../state/token";
import Loader from "../Loader";
import ScannerResultModal from "../ScannerResultModal";
import ScannerResultSuccess from "../ScannerResultSuccess";
import ScannerResultError from "../ScannerResultError";

import MainLayout from "../MainLayout";
import { useHashParam,clearHashParams } from "../../hooks/useHashParam";

export default function Manual() {
  return (
    <React.Suspense fallback={<Loader />}>
      <ManualComponent />
    </React.Suspense>
  );
}

function ManualComponent() {
  const setCode = useSetCode();
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleCloseModal = () => {
    setOpen(false);
    setValue("");
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (value) {
      setCode(value);
      setOpen(true);
    }
  };

  useEffect(() => {
    const hashCertParam = useHashParam("cert");
    if (hashCertParam) {
      setCode(hashCertParam);
      setValue(hashCertParam);
      setOpen(true);

      clearHashParams()
    }
  }, []);

  return (
    <MainLayout>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item style={{ width: "100%", position: "relative" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Manually enter a QR code"
              variant="outlined"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Grid>

        <ScannerResultModal open={open} onClose={handleCloseModal}>
          {token && token.error && <ScannerResultError token={token} />}
          {token && !token.error && <ScannerResultSuccess token={token} />}
        </ScannerResultModal>
      </Grid>
    </MainLayout>
  );
}
