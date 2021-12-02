import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import styles from "../src/styles/Home.module.css";

const ExamplesPage = dynamic(
  () => import("../src/components/pages/ExamplesPage"),
  {
    loading: () => null,
    ssr: false,
  }
);

export default function Examples() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scanner Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ExamplesPage />
    </div>
  );
}
