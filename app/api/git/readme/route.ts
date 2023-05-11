import { NextResponse } from 'next/server';

import { lib } from '@jorgechato/manyo';


export async function GET() {
  const data: string = await lib.GetReadme();

  return NextResponse.json(data);
}