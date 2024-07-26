import { FaPlus } from "react-icons/fa";
import styles from "./index.module.css";
import Actionbar from "./Actionbar";
import { useEffect, useRef, useState } from "react";
import SecurityDataTable from "./SecurityDataTable";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function SequrityData() {
    const [isOpenAction, setIsOpenAction] = useState(false);
    const [formType, setFormType] = useState<any>(null);
    const actionBarRef = useRef<HTMLDivElement | null>(null);
    const { notification,load } = useAuth();

    const openActionView = () => {
        setIsOpenAction(!isOpenAction);
    };

    useEffect(() => {
        setIsOpenAction(false)
    }, [load]);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            actionBarRef.current &&
            !actionBarRef.current.contains(event.target as Node)
        ) {
            setIsOpenAction(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className={styles['users-container']}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h3>Security Data </h3>
                <Link href="#" className={styles['btn-add']} onClick={() => openActionView()}>
                    <FaPlus />
                </Link>
            </div>
            <div className={styles['user-table']}>
                <SecurityDataTable />
            </div>
            <Actionbar
                isOpenAction={isOpenAction}
                actionBarRef={actionBarRef}
                type="create"
            />
            {notification && (
                <div className="success">
                    <p>{notification}</p>
                </div>
            )}
        </div>
    );
}
