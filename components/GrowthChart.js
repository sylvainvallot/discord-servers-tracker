import {
    CategoryScale,
    Chart as ChartJS,
    Colors,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from 'chart.js';
import "chartjs-adapter-moment";
import { Line } from 'react-chartjs-2';

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
            cubicInterpolationMode: 'monotone',
            data: data,
            label: entry,
        })
    }
    
    const options = {
        scales: {
            x: {
                time: {
                    displayFormats: {
                      day: 'DD MMM YYYY',
                    },
                    tooltipFormat: 'DD MMM YYYY',
                    unit: 'day',
                },
                type: 'time'
            },
            y: {
                // beginAtZero: true,
            },
        },
    }

    const graphData = {
        datasets: datasets,
    }

    return <Line data={graphData} options={options} />
};