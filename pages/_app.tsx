import { Provider } from "react-redux";
import { LazyMotion } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
const loadFeatures = () =>
  import("../utils/animations/features").then((res) => res.default);
// My imports.
import "../styles/globals.css";
import store from "../store/index";
// My components.
import HeadMeta from "../components/Layout/HeadMeta";
import Layout from "../components/Layout/Layout";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <>
      <HeadMeta />
      <Provider store={store}>
        <LazyMotion features={loadFeatures} strict>
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
