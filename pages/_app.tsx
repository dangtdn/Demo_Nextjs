import '../styles/main.scss';
import type { AppProps } from 'next/app'
import { FC, useEffect, useState } from 'react';
import Head from '../components/common/Head';
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';

const Noop: FC = ({ children }) => <>{children}</>
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  const router = useRouter()
  const [token, setToken] = useState();
  
  useEffect(() => {
    document.body.classList?.remove('loading')
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
      return;
    }
    else {
      router.push('/login');
    }
  },[]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {token && <Head />}
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
