import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useGetAllPostsByMonthsQuery } from '../../../Redux/features/post/postAPI';

const BarChartPost = () => {
    const chartRef = useRef(null);
    const { data: dataPost } = useGetAllPostsByMonthsQuery();

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
                            label: 'Bài đăng',
                            data: [], // Khởi tạo mảng dữ liệu trống
                            backgroundColor: 'rgba(230, 230, 250, 1)',
                            borderColor: 'rgba(0, 191, 255, 1)',
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
        if (chartInstance && dataPost?.postsByMonth && chartRef.current) {
            const dataPosts = dataPost.postsByMonth.map((item) => item?.count);
            chartInstance.data.datasets[0].data = dataPosts;
            chartInstance.update();
        }
    }, [dataPost?.postsByMonth, chartInstance]);

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

export default BarChartPost;
