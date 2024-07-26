import { useEffect, useState } from "react";
import PieChart from "./Chart/PieChart";
import styles from "./index.module.css";
import LineChart from "./Chart/LineChart";
import RadarChart from "./Chart/RadarChart";
import DoughnutChart from "./Chart/DoughnutChart";
import BubbleChart from "./Chart/BubbleChart";
import PolarAreaChart from "./Chart/PolarAreaChart";
import axiosClient from "@/utils/axios-client";
import BarChart from "./Chart/BarChart";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [securityData, setSecurityData] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState(0);
  const [criticalIncidents, setCriticalIncidents] = useState(0);
  const [averageResponseTime, setAverageResponseTime] = useState<any>(0);
  const [lastMonthCount, setLastMonthCount] = useState(0);

  useEffect(() => {
    getSecurityData();
  }, []);

  const getSecurityData = () => {
    setLoading(true);
    axiosClient
      .get("/security-data-all")
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setSecurityData(data.data);
        setTotalIncidents(data.data.length);
        setResolvedIncidents(
          data.data.filter((incident: any) => incident.status === "resolved")
            .length
        );
        setCriticalIncidents(
          data.data.filter((incident: any) => incident.severity === "Critical")
            .length
        );
        setAverageResponseTime(calculateAverageResponseTime(data.data));
        setLastMonthCount(calculateLastMonthCount(data.data));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const calculateLastMonthCount = (data: any) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return data.filter((item: any) => new Date(item.detected_at) >= lastMonth)
      .length;
  };

  const calculateAverageResponseTime = (data: string[]) => {
    if (data.length === 0) {
      return 0; // No data to process
    }

    // Convert each datetime string to a Date object
    const validResponseTimes = data.map(
      (item: any) => new Date(item.response_time)
    );
    // Calculate time differences in milliseconds
    const timeDifferences = [];
    for (let i = 1; i < validResponseTimes.length; i++) {
      const diff =
        validResponseTimes[i].getTime() - validResponseTimes[i - 1].getTime();
      timeDifferences.push(diff);
    }

    // Calculate the total response time
    const totalResponseTime = timeDifferences.reduce(
      (sum, diff) => sum + diff,
      0
    );

    // Calculate the average response time in milliseconds
    const averageResponseTimeMs = totalResponseTime / timeDifferences.length;

    // Convert the average response time to minutes
    const averageResponseTimeMinutes = averageResponseTimeMs / (1000 * 60);

    return averageResponseTimeMinutes.toFixed(2);
  };

  return (
    <div className={styles.main}>
      <div>
        <div className={`${styles["container-dashboard"]} pt-5`}>
          <div className={`${styles["c-dashboardInfo"]} col-lg-3 col-md-6`}>
            <div className={styles.wrap}>
              <h4
                className={`${styles.heading} heading5  ${styles["c-dashboardInfo__title"]}`}
              >
                Total Incidents
                <svg
                  className={styles["MuiSvgIcon-root-19"]}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span
                className={` ${styles["caption-12"]} ${styles["c-dashboardInfo__count"]}`}
              >
                {loading ? "" : totalIncidents}
              </span>
            </div>
          </div>
          <div className={`${styles["c-dashboardInfo"]} col-lg-3 col-md-6`}>
            <div className={styles.wrap}>
              <h4
                className={`${styles.heading} heading5  ${styles["c-dashboardInfo__title"]}`}
              >
                Resolved Incidents
                <svg
                  className={styles["MuiSvgIcon-root-19"]}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span
                className={` ${styles["caption-12"]} ${styles["c-dashboardInfo__count"]}`}
              >
                {loading ? "" : resolvedIncidents}
              </span>
            </div>
          </div>
          <div className={`${styles["c-dashboardInfo"]} col-lg-3 col-md-6`}>
            <div className={styles.wrap}>
              <h4
                className={`${styles.heading} heading5  ${styles["c-dashboardInfo__title"]}`}
              >
                Critical Incidents
                <svg
                  className={styles["MuiSvgIcon-root-19"]}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span
                className={` ${styles["caption-12"]} ${styles["c-dashboardInfo__count"]}`}
              >
                {loading ? "" : criticalIncidents}
              </span>
            </div>
          </div>
          <div className={`${styles["c-dashboardInfo"]} col-lg-3 col-md-6`}>
            <div className={styles.wrap}>
              <h4
                className={`${styles.heading} heading5  ${styles["c-dashboardInfo__title"]}`}
              >
                Avg. Response Time
                <svg
                  className={styles["MuiSvgIcon-root-19"]}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span
                className={` ${styles["caption-12"]}  ${styles["c-dashboardInfo__count"]}`}
              >
                {loading ? "" : `${averageResponseTime}mins`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["component-div"]}>
        <div className={`${styles["chart-div"]} card`}>
          <BarChart loading={loading} data={securityData} />
        </div>
        <div className={`${styles["chart-div"]} card`}>
          <LineChart loading={loading} data={securityData} />
        </div>
        <div className={`${styles["chart-div"]} card`}>
          <RadarChart loading={loading} data={securityData} />
        </div>
        <div className={`${styles["chart-div"]} card`}>
          <DoughnutChart loading={loading} data={securityData} />
        </div>
        <div className={`${styles["chart-div"]} card`}>
          <PieChart loading={loading} data={securityData} />
        </div>
        <div className={`${styles["chart-div"]} card`}>
          <PolarAreaChart loading={loading} data={securityData} />
        </div>
      </div>
    </div>
  );
}
