import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import "chartjs-adapter-moment";

const GrowthChart = ({ data }) => {
    const chartRef = useRef(null);
    const serverData = JSON.parse(data);

    let datasets = [];

    for(const entry in serverData){
        let data = [];
        for(const _ in serverData[entry]){
            data.push({
                x: serverData[entry][_].date,
                y: serverData[entry][_].memberCount
            });
        }
        datasets.push({
            label: entry,
            data: data,
            cubicInterpolationMode: 'monotone',
        })
   }
    
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        let delayed;

        new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets,
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'DD MMM YYYY',
                        displayFormats: {
                          day: 'DD MMM YYYY',
                        },
                    }
                },
                y: {
                    beginAtZero: true,
                },
            },

        },
        });
    }, []);

    return <canvas ref={chartRef} />;
};

export default GrowthChart;
