import React, { Fragment } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
// My imports.
import HeadMeta from '../components/Layout/HeadMeta';
import store from '../store/index';
import { LazyMotion, domAnimation } from 'framer-motion';
import Layout from '../components/Layout/Layout';
// CSS styles.
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <HeadMeta />
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <LazyMotion features={domAnimation}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LazyMotion>
        </Provider>
      </SessionProvider>
    </Fragment>
  );
}
