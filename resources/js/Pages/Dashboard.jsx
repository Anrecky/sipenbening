import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Cards from '@/Components/CardStats/Cards';
import COIBar from '@/Components/COI/COIBar';
import COIChart from '@/Components/COI/COIChart';
import COIPie from '@/Components/COI/COIPie';
import LatestCOI from '@/Components/COI/LatestCOI';

export default function Dashboard(props) {
    console.log(props)
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto 2xl:max-w-full 2xl:px-56 py-10">
                <Cards cardsStats={props.cardsStats} />
                {/* {(props.auth.user.role == 'manager' || props.auth.user.role == 'boss' || props.auth.user.role == 'admin') && <COIChart />} */}
                <LatestCOI />
                {(props.auth.user.role == 'manager' || props.auth.user.role == 'boss' || props.auth.user.role == 'admin') && <div className="flex justify-between">
                    <COIBar />
                    <COIPie />
                </div>}
            </div>
        </Authenticated>
    );
}
