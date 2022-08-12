import '../styles/main.scss';
import type { AppProps } from 'next/app'
import { FC, useEffect, useState } from 'react';
import Head from '../components/common/Head';
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { ManagedUIContext } from '../components/ui/context';

const Noop: FC = ({ children }) => <>{children}</>
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  const router = useRouter()
  const [token, setToken] = useState();
  
  useEffect(() => {
    document.body.classList?.remove('loading');
    const lcStorage: any = localStorage.getItem("accessToken");
    if (lcStorage) {
      setToken(lcStorage);
      return;
    }
    else {
      router.push('/login');
    }
  },[]);

  useEffect(() => {
    console.log('cheack: ',token);
    
  }, [token]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ManagedUIContext>
          {token ? <Head /> : ''}
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ManagedUIContext>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
