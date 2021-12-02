import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import styles from "../src/styles/Home.module.css";

const IndexPage = dynamic(() => import("../src/components/pages/IndexPage"), {
  loading: () => null,
  ssr: false,
});

export default function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scanner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <IndexPage />
    </div>
  );
}
