import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useGetUserByMonthsQuery } from '../../../Redux/features/user/userAPI';

const DoughnutUser = () => {
    const chartRef = useRef(null);
    const { data: getUserByMonths } = useGetUserByMonthsQuery();
    const dataChart = getUserByMonths?.totalRoles?.map((item) => item?.count);
    useEffect(() => {
        let delayed;
        const chartInstance = new Chart(chartRef.current, {
            type: 'doughnut',
            data: {
                labels: ['Cơ sơ y tế', 'Người hiến máu', 'Người cần máu'],
                datasets: [
                    {
                        label: 'Người dùng',
                        data: dataChart,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (
                            context.type === 'data' &&
                            context.mode === 'default' &&
                            !delayed
                        ) {
                            delay =
                                context.dataIndex * 300 +
                                context.datasetIndex * 100;
                        }
                        return delay;
                    },
                },
            },
        });
        return () => {
            chartInstance.destroy();
        };
    });
    return (
        <>
            <canvas ref={chartRef} />
        </>
    );
};

export default DoughnutUser;
