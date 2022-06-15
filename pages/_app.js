import React from 'react';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
// My imports.
import store from '../store/index';
import Layout from '../components/Layout/Layout';
import HeadMeta from '../components/Layout/HeadMeta';
// CSS styles.
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const route = useRouter(); // Get the current url path we are in.

  return (
    <SessionProvider session={pageProps.session}>
      <HeadMeta />
      <Provider store={store}>
        <Layout>
          <AnimatePresence initial={false}>
            <Component {...pageProps} key={route.asPath} />
          </AnimatePresence>
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
