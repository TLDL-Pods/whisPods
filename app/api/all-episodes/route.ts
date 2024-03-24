import { NextRequest, NextResponse } from 'next/server';
import { getClientAndDb } from '../mongo/db';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '0', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '25', 10); // Default to 25 episodes
  const skip = page * pageSize;

  try {
    const { db } = await getClientAndDb();
    const collection = db.collection('thedailygweiRecap');

    // Fetch documents from the collection sorted by episode_number
    const data = await collection
      .find()
      .sort({ episode_number: -1 })
      .skip(skip) // Skip the documents for previous pages
      .limit(pageSize) // Limit to 'pageSize' results
      .toArray();

    return NextResponse.json({ status: 200, message: 'Success', data: data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
