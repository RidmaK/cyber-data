import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface GuestLayoutProps {
  children: ReactNode;
}

const GuestLayout = ({ children }: GuestLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default GuestLayout;
