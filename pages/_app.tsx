import '../styles/main.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import type { AppProps } from 'next/app'
import { FC, useEffect } from 'react';
import Head from '../components/common/Head';
import { RecoilRoot } from "recoil";

const Noop: FC = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <RecoilRoot>
      <Head />
      {/* <ManagedUIContext> */}
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      {/* </ManagedUIContext> */}
    </RecoilRoot>
  )
}

export default MyApp
