import Link from "next/link";
import styles from "./index.module.css";
import { FaPowerOff, FaUserTie } from "react-icons/fa";
import { MdForwardToInbox } from "react-icons/md";
interface HeaderProps {
  user: any;
  drawerRef: any;
  isOpenDrawer: boolean;
  toggleSidebar: () => void;
  toggleProfileDrawer: () => void;
  onLogout: any;
}
export default function HeaderSection({
  isOpenDrawer,
  drawerRef,
  toggleSidebar,
  toggleProfileDrawer,
  user,
  onLogout,
}: HeaderProps) {
  return (
    <div id="headerComponent">
      <div className={styles.header}>
        <div>
          <Link
            href="#"
            className={styles.sidebarToggledark}
            style={{
              background: "none",
              border: "none",
              color: "black",
              fontSize: "1.7rem",
              cursor: "pointer",
              display: "block",
              marginRight: "20px",
              textDecoration: "none",
            }}
            onClick={toggleSidebar}
          >
            ☰
          </Link>
        </div>
        <div>
          <Link
            href="#"
            className={styles.profileInfo}
            onClick={toggleProfileDrawer}
          >
            <div>{user.name.charAt(0).toUpperCase()}</div>
          </Link>
          <div
            className={`${styles.profileDrawer} ${
              isOpenDrawer ? `${styles.open}` : ""
            }`}
            ref={drawerRef}
          >
            <Link href="#" className={styles.profileItem}>
              <FaUserTie /> {user?.name}
            </Link>
            <Link href="#" className={styles.profileItem}>
              <MdForwardToInbox /> Inbox
            </Link>
            <Link href="#" onClick={onLogout} className={styles.profileItem}>
              <FaPowerOff /> Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
