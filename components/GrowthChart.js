import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Colors,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "chartjs-adapter-moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Colors,
);

export default function GrowthChart({ data }) {
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
    
    const options = {
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
                // beginAtZero: true,
            },
        },
    }

    const graphData = {
        datasets: datasets,
    }

    return <Line options={options} data={graphData} />
};