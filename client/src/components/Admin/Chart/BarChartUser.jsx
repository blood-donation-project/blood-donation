import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useGetUserByMonthsQuery } from '../../../Redux/features/user/userAPI';

const BarChartUser = () => {
    const { data: getUserByMonths } = useGetUserByMonthsQuery();
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        let delayed;
        if (chartRef.current && !chartInstance) {
            const newChartInstance = new Chart(chartRef.current, {
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
                            label: 'Người dùng',
                            data: [], // Khởi tạo mảng dữ liệu trống
                            backgroundColor: 'rgba(186, 220, 212, 1)',
                            borderColor: 'rgba(0, 120, 180, 1)',
                            borderWidth: 2,
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
            setChartInstance(newChartInstance);
        }
    }, [chartInstance]);

    useEffect(() => {
        if (chartInstance && getUserByMonths?.usersByMonth && chartRef.current) {
            const userData = getUserByMonths.usersByMonth.map((item) => item?.count);
            chartInstance.data.datasets[0].data = userData;
            chartInstance.update();
        }
    }, [getUserByMonths, chartInstance]);

    // Hủy biểu đồ khi component unmount
    useEffect(() => {
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [chartInstance]);

    return (
        <>
            <canvas ref={chartRef} />
        </>
    );
};

export default BarChartUser;
