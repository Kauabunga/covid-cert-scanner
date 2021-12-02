import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import styles from "../src/styles/Home.module.css";

const ConfigPage = dynamic(() => import("../src/components/pages/ConfigPage"), {
  loading: () => null,
  ssr: false,
});

export default function Config() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scanner Config</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConfigPage />
    </div>
  );
}
