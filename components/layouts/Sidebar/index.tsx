import { useRouter } from "next/router";
import "./index.module.css";
import Link from "next/link";
import styles from "./index.module.css";
interface SidebarProps {
  isOpen: boolean;
  sidebarRef: any;
  toggleSidebar: () => void;
}
export default function Sidebar({
  isOpen,
  toggleSidebar,
  sidebarRef,
}: SidebarProps) {
  const router = useRouter();
  const { pathname } = router;

  const isActive = (path: string): string => {
    return pathname === path ? styles.active : "";
  };

  return (
    <div id="sidebarComponent">
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}
        ref={sidebarRef}
      >
        <div className={styles["brand-section"]}>
          <div className={styles.brand}>SD</div>
          <div>
            <button
              className={styles["sidebar-toggle"]}
              onClick={toggleSidebar}
            >
              ☰
            </button>
          </div>
        </div>
        <Link
          href="/dashboard"
          className={`${styles["sidebar-link"]} ${isActive("/dashboard")}`}
        >
          Dashboard
        </Link>
        {/* <Link href="/users" className={`${styles['sidebar-link']} ${isActive("/users")}`}>
          Users
        </Link> */}
        <Link
          href="/dashboard/security-data"
          className={`${styles["sidebar-link"]} ${isActive(
            "/dashboard/security-data"
          )}`}
        >
          Security Data
        </Link>
      </aside>
    </div>
  );
}
