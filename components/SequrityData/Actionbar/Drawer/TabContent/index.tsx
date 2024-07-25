import { useState } from "react";
import styles from "./index.module.css";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import Link from "next/link";
interface Props {
    securityData: any;
}

const TabContent = ({ securityData }: Props) => {
    const [activeTab, setActiveTab] = useState("in");

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };

    // Prepare data for charts
    const barData = {
        labels: ["Severity", "Response Time"],
        datasets: [
            {
                label: "Security Data Metrics",
                data: [securityData.severity, securityData.response_time],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ["Assigned", "Unassigned"],
        datasets: [
            {
                data: [
                    securityData.assigned_to ? 1 : 0,
                    securityData.assigned_to ? 0 : 1,
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={`${styles['col-4']} col-4`}>
            <div className={styles.row}>
                <div className={styles['col-12']}>
                    <div className={`${styles['card-primary']} ${styles['card-tabs']}`}>
                        <div className={styles['card-header']}>
                            <ul className={styles['nav-tabs']} role="tablist">
                                <li
                                    className={styles['nav-item']}
                                    onClick={() => handleTabClick("in")}
                                >
                                    <Link
                                        className={`${styles['nav-link']} ${
                                            activeTab === "in" ? `${styles.active}` : ""
                                        }`}
                                        data-toggle="pill"
                                        href="#in"
                                        role="tab"
                                        aria-selected={activeTab === "in"}
                                    >
                                        Deatals
                                    </Link>
                                </li>
                                <li
                                    className={styles['nav-item']}
                                    onClick={() => handleTabClick("out")}
                                >
                                    <Link
                                        className={`${styles['nav-link']} ${
                                            activeTab === "out" ? `${styles.active}` : ""
                                        }`}
                                        data-toggle="pill"
                                        href="#out"
                                        role="tab"
                                        aria-selected={activeTab === "out"}
                                    >
                                        Chart
                                    </Link>
                                </li>
                                <li
                                    className={styles['nav-item']}
                                    onClick={() => handleTabClick("return")}
                                >
                                    <Link
                                        className={`${styles['nav-link']} ${
                                            activeTab === "return" ? `${styles.active}` : ""
                                        }`}
                                        data-toggle="pill"
                                        href="#return"
                                        role="tab"
                                        aria-selected={activeTab === "return"}
                                    >
                                        Process
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className={styles['card-body']}>
                            <div className={styles['tab-content']}>
                                <div
                                    className={`${styles['tab-pane']} ${styles['fade']} ${activeTab === 'in' ? `${styles['show']} ${styles['active']}` : ''}`}
                                    id="in"
                                    role="tabpanel"
                                >
                                    <div className={styles['security-details']}>
                                        <h4>Security Details</h4>
                                        <div className={styles['detail-item']}>
                                            <span className={styles['detail-label']}>
                                                Type:
                                            </span>
                                            <span className={styles['detail-value']}>
                                                {securityData.type}
                                            </span>
                                        </div>
                                        <div className={styles['detail-item']}>
                                            <span className={styles['detail-label']}>
                                                Description:
                                            </span>
                                            <span className={styles['detail-value']}>
                                                {securityData.description}
                                            </span>
                                        </div>
                                        <div className={styles['detail-item']}>
                                            <span className={styles['detail-label']}>
                                                Severity:
                                            </span>
                                            <span className={styles['detail-value']}>
                                                {securityData.severity}
                                            </span>
                                        </div>
                                        <div className={styles['detail-item']}>
                                            <span className={styles['detail-label']}>
                                                Detected At:
                                            </span>
                                            <span className={styles['detail-value']}>
                                                {securityData.detected_at}
                                            </span>
                                        </div>
                                        <div className={styles['detail-item']}>
                                            <span className={styles['detail-label']}>
                                                Status:
                                            </span>
                                            <span className={styles['detail-value']}>
                                                {securityData.status}
                                            </span>
                                        </div>
                                        <div className={styles['detail-item']}>
                                            <span className={styles['detail-label']}>
                                                Assigned To:
                                            </span>
                                            <span className={styles['detail-value']}>
                                                {securityData.assigned_to}
                                            </span>
                                        </div>
                                        <div className={styles['detail-item']}>
                                            <span className={styles['detail-label']}>
                                                Response Time:
                                            </span>
                                            <span className={styles['detail-value']}>
                                                {securityData.response_time}
                                            </span>
                                        </div>
                                        <div className={styles['detail-item']}>
                                            <span className={styles['detail-label']}>
                                                Threat Source:
                                            </span>
                                            <span className={styles['detail-value']}>
                                                {securityData.threat_source}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`${styles['tab-pane']} ${styles['fade']} ${activeTab === 'out' ? `${styles['show']} ${styles['active']}` : ''}`}
                                    id="out"
                                    role="tabpanel"
                                >
                                    <div className={styles['chart-main']}>
                                        <div className={styles['chart-bar']}>
                                            <h5>Bar Chart</h5>
                                            <Bar data={barData} />
                                        </div>
                                        <div className={styles['chart-pie']}>
                                            <h5>Pie Chart</h5>
                                            <Pie data={pieData} />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`${styles['tab-pane']} ${styles['fade']} ${activeTab === 'return' ? `${styles['show']} ${styles['active']}` : ''}`}
                                    id="return"
                                    role="tabpanel"
                                ></div>
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabContent;
