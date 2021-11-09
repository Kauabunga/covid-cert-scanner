import Head from "next/head";
import { RecoilRoot } from "recoil";
import MenuAppBar from "../src/components/AppBar";

import "../src/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <RecoilRoot>
        <MenuAppBar>
          <Component {...pageProps} />
        </MenuAppBar>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
