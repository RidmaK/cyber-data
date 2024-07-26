import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
