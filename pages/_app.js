import React, { Fragment } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { LazyMotion, domAnimation } from "framer-motion";
// My imports.
import HeadMeta from "../components/Layout/HeadMeta";
import store from "../store/index";
import Layout from "../components/Layout/Layout";
// CSS styles.
import "../styles/globals.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Fragment>
      <HeadMeta />
      <SessionProvider session={session}>
        <Provider store={store}>
          <LazyMotion features={domAnimation} strict>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LazyMotion>
        </Provider>
      </SessionProvider>
    </Fragment>
  );
}
