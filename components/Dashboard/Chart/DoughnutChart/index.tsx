import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

interface Props {
    data: any;
    loading: boolean;
}

export default function DoughnutChart({ data, loading }: Props) {
    if (loading) {
        return <div className="loading">Loading ....</div>;
    }

    // Group incidents by severities
    const incidentSeverityCounts: { [key: string]: number } = data.reduce((acc: any, incident: any) => {
        acc[incident.severity] = (acc[incident.severity] || 0) + 1;
        return acc;
    }, {});

    const severities = Object.keys(incidentSeverityCounts);
    const counts = Object.values(incidentSeverityCounts);

    const chartData = {
        labels: severities,
        datasets: [
            {
                label: 'Incident Status',
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={chartData} />;
}
