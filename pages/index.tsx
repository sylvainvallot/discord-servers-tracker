import BarChart from '../components/BarChart';
import GrowthChart from '../components/GrowthChart';

import clientPromise from "../lib/mongodb";

export default function Servers({ servers, dataset, members }) {
    return (
        <div className="pb-12">
            <h1 className="text-5xl font-bold tracking-tight text-center pb-4">Discord Servers Tracker</h1>
            <div className="p-6 mx-auto">
                <h2 className="font-bold mx-auto mt-4 text-3xl text-center">Thème: Aide aux devoirs 📚</h2>
                <p className="mx-auto text-xl text-center">Tracking {servers.length} serveurs -  {members} membres cumulés</p>
            </div>

            <GrowthChart data={dataset}/>
            {/* <BarChart servers={servers}/> */}
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("lnac");

        const dataset = new Map();

        let totalMembers = 0;
        
        const serverList = await db
        .collection("servers")
        .find({})
        .sort({ memberCount: -1 })
        .toArray();
                
        for(const server of serverList){
            totalMembers += server.memberCount
            const serverData = await db
                .collection("daycounts")
                .find({server_id: server._id})
                .sort({ date: 1})
                .toArray();

            dataset.set(server.name, serverData);    
        }

        const datasetObject = {};
        dataset.forEach((value, key) => {
            datasetObject[key] = value;
        })
        return {
            props: { servers: JSON.parse(JSON.stringify(serverList)), dataset: JSON.stringify(datasetObject), members: totalMembers},
        };

    } catch (e) {
        console.error(e);
    }
}