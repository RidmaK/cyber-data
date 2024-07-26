import styles from "./index.module.css";
import AddSecurityData from "./AddSecurityData";
import EditSecurityData from "./EditSecurityData";
import { useEffect, useState } from "react";
import Drawer from "./Drawer"; // Import the Drawer component
import axiosClient from "@/utils/axios-client";
import Link from "next/link";

interface SidebarProps {
  isOpenAction: boolean;
  actionBarRef: any;
  securityDataId?: any;
  type: any;
}

export default function Actionbar({
  isOpenAction,
  actionBarRef,
  securityDataId,
  type,
}: SidebarProps) {
  const [securityData, setSecurityData] = useState<any>({
    type: "",
    description: "",
    severity: "",
    detected_at: "",
    status: "",
    assigned_to: "",
    response_time: "",
    threat_source: "",
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (securityDataId !== undefined && securityDataId !== null) {
      axiosClient
        .get(`/security-data/${securityDataId}`)
        .then(({ data }) => {
          setSecurityData(data?.data);
        })
        .catch((err) => {
          console.error("Error fetching security data:", err);
        });
    }
  }, [securityDataId]);

  useEffect(() => {
    // Prevent background scroll when the action bar is open
    if (isOpenAction || isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset the overflow on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenAction, isDrawerOpen]);

  const showMore = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {isOpenAction && <div className={styles["blur-background"]}></div>} {/* Add the blur background */}
      <div className={styles["actionBar-background"]}>
        <aside
          className={`${styles.sidebar} ${
            isOpenAction ? styles.open : styles.close
          }`}
          ref={actionBarRef}
        >
          <div className={styles["action-header"]}>
            <div>Take Action</div>
            {type == "edit" && (
              <div>
                <Link
                  onClick={showMore}
                  href="#"
                  className={`${styles["view-more"]} btn btn-show`}
                >
                  view more
                </Link>
              </div>
            )}
          </div>
          {type == "edit" ? (
            <EditSecurityData securityDataId={securityDataId} />
          ) : (
            <AddSecurityData />
          )}
        </aside>
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        securityData={securityData}
      />
    </>
  );
}
