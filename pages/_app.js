import { useRouter } from 'next/router';
import { Provider } from 'react-redux'; // Redux states.
import { SessionProvider } from 'next-auth/react'; // Next authentication.
import { AnimatePresence } from 'framer-motion'; // Animation library.
// My imports.
import store from '../store/index';
import Layout from '../components/Layout/Layout';
import Meta from '../components/Layout/Meta';
// CSS styles.
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const route = useRouter(); // Get the current url path we are in.

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Meta />
          <AnimatePresence initial={false}>
            <Component {...pageProps} key={route.asPath} />
          </AnimatePresence>
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
