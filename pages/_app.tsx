import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { getLayout } from '@/utils/getLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  const Layout = getLayout(router.pathname);

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </AuthProvider>
  );
}

export default MyApp;
