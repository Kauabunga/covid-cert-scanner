import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MainLayout from "../MainLayout";
import Loader from "../Loader";

export default function Examples() {
  return (
    <React.Suspense fallback={<Loader />}>
      <ExamplesComponent />
    </React.Suspense>
  );
}

function ExamplesComponent() {
  const images = [
    {
      title: "Valid",
      success: true,
      src: "/examples/nzcp.png",
    },
    {
      title: "Revoked public key",
      success: false,
      src: "/examples/nzcp-revoked-public-key.png",
    },
    {
      title: "Not active payload",
      success: false,
      src: "/examples/nzcp-notactive-payload.png",
    },
    {
      title: "Not associated public key",
      success: false,
      src: "/examples/nzcp-not-associated-public-key.png",
    },
    {
      title: "Modified signature",
      success: false,
      src: "/examples/nzcp-modified-sig.png",
    },

    {
      title: "Modified payload",
      success: false,
      src: "/examples/nzcp-modified-payload.png",
    },

    {
      title: "Expired payload",
      success: false,
      src: "/examples/nzcp-expired-payload.png",
    },

    {
      title: "Bad public key",
      success: false,
      src: "/examples/nzcp-bad-public-key.png",
    },
  ];
  return (
    <MainLayout>
      {images.map((image) => (
        <Grid key={image.src} style={{ marginBottom: 48 }}>
          <Grid item>
            <Typography variant="h6">{image.title}</Typography>
          </Grid>
          <Grid item>
            <img src={image.src} />
          </Grid>
        </Grid>
      ))}
    </MainLayout>
  );
}
