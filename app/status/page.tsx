import { ProjectList, StatusPageInfo } from '@jorgechato/manyo';


export const metadata = {
    title: 'Status Page',
};


const config: { [key: string]: any } = require('@/my.config.js');

export default function StatusPage() {
    const { STATUS } = config;

    return (
        <>
            <h1 className="text-2xl mb-6 text-center font-h1 font-bold">
                Status Page
            </h1>

            <StatusPageInfo />

            <ProjectList projects={STATUS} />
        </>
    );
}