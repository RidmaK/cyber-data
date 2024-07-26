import { useState, useEffect, useRef, ReactNode } from "react";
import Sidebar from "./Sidebar";
import HeaderSection from "./Header";
import axiosClient from "@/utils/axios-client";
import { useAuth } from "@/context/AuthContext";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

interface GuestLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: GuestLayoutProps) {
  const { user, token, setUser, setToken } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const route = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOpen(window.innerWidth > 768);

      const handleResize = () => {
        setIsOpen(window.innerWidth > 768);
      };

      const handleClickOutside = (event: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
          setIsOpenDrawer(false);
        }
        if (window.innerWidth <= 768 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      window.addEventListener("resize", handleResize);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const onLogout = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();

    axiosClient.post("/logout")
      .then(() => {
        setToken(null);
        Cookies.remove('ACCESS_TOKEN');
        route.push('/auth/login')
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  useEffect(() => {
    axiosClient.get("/get-user")
      .then(({ data }) => {
        setUser(data?.user);
      });
  }, [setUser]);

  const toggleProfileDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  return (
    <div id="defaultLayout">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} />
      <div className={`content ${isOpen ? "" : "shifted"}`}>
        <HeaderSection
          isOpenDrawer={isOpenDrawer}
          drawerRef={drawerRef}
          toggleSidebar={toggleSidebar}
          toggleProfileDrawer={toggleProfileDrawer}
          user={user}
          onLogout={onLogout}
        />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
