import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import styles from "../src/styles/Home.module.css";

const ManualPage = dynamic(() => import("../src/components/pages/ManualPage"), {
  loading: () => null,
  ssr: false,
});

export default function Manual() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scanner - Manual</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ManualPage />
    </div>
  );
}
