import { Logo } from '@jorgechato/manyo';

const config: { [key: string]: any } = require('@/my.config.js');


export const metadata = {
    title: 'You found my projects!',
};

export default function Home() {
    const { PROJECTS } = config;
    return (
        <>
            <ul className='grid text-3xl md:grid-cols-2 xs:grid-cols-1 gap-4 mt-10'>
                {PROJECTS.map((project: any, index: number) => (
                    <li key={index} className='text-center'>
                        <div className="group m-4 transition duration-500 hover:scale-110">
                            <Logo url={project.url} appName={project.name} />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
