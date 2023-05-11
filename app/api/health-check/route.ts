import { NextResponse } from 'next/server';

import { lib } from '@jorgechato/manyo';
import packageInfo from '@/package.json';

const config: { [key: string]: any } = require('@/my.config.js');


export async function GET() {
    const status: lib.StatusPage = {
        name: config.TITLE,
        type: lib.StatusPageCode.OK,
        url: 'https://jorgechato.com',
        version: packageInfo.version,
        description: packageInfo.description,
    };

    return NextResponse.json(status);

}