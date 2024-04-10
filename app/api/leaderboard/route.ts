import { NextRequest, NextResponse } from 'next/server';
import { DuneClient } from '@duneanalytics/client-sdk';

export async function GET(request: NextRequest) {
  const DUNE_API_KEY = process.env.DUNE_API_KEY; // Ensure this is set in your .env.local file

  if (typeof DUNE_API_KEY !== 'string') {
    return NextResponse.json({
      status: 500,
      message: 'DUNE API configuration error.',
    });
  }

  const dune = new DuneClient(DUNE_API_KEY);

  try {
    const queryResult = await dune.getLatestResult({ queryId: 3595740 });
    if (queryResult.result === undefined) {
      throw new Error('No data returned from Dune Analytics.');
    }
    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: queryResult.result,
    });
  } catch (error) {
    console.error('Error fetching data from Dune Analytics:', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch data from Dune Analytics.',
    });
  }
}
