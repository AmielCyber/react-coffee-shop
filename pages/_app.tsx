import { Provider } from "react-redux";
import { LazyMotion, domAnimation } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
// My imports.
import HeadMeta from "../components/Layout/HeadMeta";
import store from "../store/index";
import Layout from "../components/Layout/Layout";
// CSS style.
import "../styles/globals.css";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <>
      <HeadMeta />
      <Provider store={store}>
        <LazyMotion features={domAnimation} strict>
          <SessionProvider session={pageProps.session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </LazyMotion>
      </Provider>
    </>
  );
}
