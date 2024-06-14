import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useGetEventByMonthsQuery } from '../../../Redux/features/events/eventAPI';

const BarChartEvent = () => {
    const { data: eventDataByMonth } = useGetEventByMonthsQuery();
    const chartRef = useRef(null);
    console.log(eventDataByMonth);
    const dataChart = eventDataByMonth?.eventsByMonth?.map(
        (item) => item?.count
    );
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
                        label: 'Sự kiện',
                        data: dataChart,
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        borderColor: 'rgba(255, 0, 0, 1)',
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
    }, []);

    return (
        <>
            <canvas ref={chartRef} />
        </>
    );
};

export default BarChartEvent;
