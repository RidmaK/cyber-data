import React from "react";
import styles from "./index.module.css"; // Import the drawer CSS
import { FiX } from "react-icons/fi";
import TabContent from "./TabContent";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    securityData: any;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, securityData }) => {
    return (
        <div className={`${styles.drawer} ${isOpen ? `${styles.open}` : `${styles.closed}`}`}>
            <div className={styles['drawer-header']}>
                <h2>Security Data Details</h2>
                <button className={styles['close-button']} onClick={onClose}>
                    <FiX />
                </button>
            </div>
            <div className={styles['drawer-content']}>
                <TabContent securityData={securityData} />
            </div>
        </div>
    );
};

export default Drawer;
