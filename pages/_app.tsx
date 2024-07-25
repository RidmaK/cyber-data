import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import DefaultLayout from '../components/layouts/DefaultLayout';
import GuestLayout from '../components/layouts/GuestLayout';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = ['/auth/login', '/auth/register'].includes(router.pathname);
  const Layout = !isAuthPage ? DefaultLayout : GuestLayout;

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
