import '../styles/globals.css';
import { SWRConfig } from 'swr';
import http from '@/lib/http';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: async (resource, init) => {
          return await http.get(resource, init).json();
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
