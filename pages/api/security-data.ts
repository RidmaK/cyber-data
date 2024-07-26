import { NextApiRequest, NextApiResponse } from 'next';
import axiosClient from '@/utils/axios-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axiosClient.get('/security-data');
        const data = response.data.data;

        const totalIncidents = data.length;
        const resolvedIncidents = data.filter((incident: any) => incident.status === 'resolved').length;
        const criticalIncidents = data.filter((incident: any) => incident.severity === 'Critical').length;
        const averageResponseTime = calculateAverageResponseTime(data);
        const lastMonthCount = calculateLastMonthCount(data);

        res.status(200).json({
            totalIncidents,
            resolvedIncidents,
            criticalIncidents,
            averageResponseTime,
            lastMonthCount,
            securityData: data
        });
    } catch (error) {
        console.error('Error fetching security data:', error);
        res.status(500).json({ error: 'Failed to fetch security data' });
    }
}

const calculateLastMonthCount = (data: any) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return data.filter((item: any) => new Date(item.detected_at) >= lastMonth).length;
};

const calculateAverageResponseTime = (data: any) => {
    if (data.length === 0) {
        return 0;
    }

    const validResponseTimes = data.map((item: any) => new Date(item.response_time));
    const timeDifferences = [];
    for (let i = 1; i < validResponseTimes.length; i++) {
        const diff = validResponseTimes[i].getTime() - validResponseTimes[i - 1].getTime();
        timeDifferences.push(diff);
    }

    const totalResponseTime = timeDifferences.reduce((sum, diff) => sum + diff, 0);
    const averageResponseTimeMs = totalResponseTime / timeDifferences.length;
    const averageResponseTimeMinutes = averageResponseTimeMs / (1000 * 60);

    return averageResponseTimeMinutes.toFixed(2);
};
