import DefaultLayout from '../components/layouts/DefaultLayout';
import GuestLayout from '../components/layouts/GuestLayout';
import HomeLayout from '../components/layouts/HomeLayout';

export function getLayout(pathname: string) {
  if (pathname.startsWith('/dashboard')) {
    return DefaultLayout;
  } else if (pathname.startsWith('/auth/')) {
    return GuestLayout;
  } else {
    return HomeLayout;
  }
}
