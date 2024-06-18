import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useGetAllPostsByMonthsQuery } from '../../../Redux/features/post/postAPI';

const BarChartPost = () => {
    const chartRef = useRef(null);
    const { data: dataPost } = useGetAllPostsByMonthsQuery();

    const dataChart = dataPost?.postsByMonth?.map((item) => item?.count);

    useEffect(() => {
        let delayed;
        const chartInstance = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12',
                ],
                datasets: [
                    {
                        label: 'Bài đăng',
                        data: dataChart,
                        backgroundColor: 'rgba(34, 139, 34, 0.5)',
                        borderColor: 'rgba(34, 139, 34, 1)',
                        borderWidth: 2,
                        borderSkipped: false,
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
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 300 + context.datasetIndex * 100;
                        }
                        return delay;
                    },
                },
            },
        });

        return () => {
            chartInstance.destroy();
        };
    }, []);

    return (
        <>
            <canvas ref={chartRef} />
        </>
    );
};

export default BarChartPost;
