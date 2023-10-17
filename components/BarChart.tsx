import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ servers }) => {
    const chartRef = useRef(null);
    
    let labels = [];
    let memberCount = [];
    servers.forEach(e => {
        labels.push(e.name);
        memberCount.push(e.memberCount);
    });
        
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        let delayed;
        new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
            {
                label: 'Nombre de membres',
                data: memberCount,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                ],
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
    }, []);

    return <canvas ref={chartRef} />;
};

export default BarChart;
