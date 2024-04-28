import { NextRequest, NextResponse } from 'next/server';
import { getClientAndDb } from '../mongo/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchTerm = url.searchParams.get('searchTerm');
  const page = parseInt(url.searchParams.get('page') || '0', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
  const skip = page * pageSize;
  console.log(
    'Search Term:',
    searchTerm,
    'Page:',
    page,
    'Page Size:',
    pageSize,
  );
  try {
    const { db } = await getClientAndDb();
    const collection = db.collection('thedailygweiRecap');

    let pipeline = [
      {
        $search: {
          index: 'default',
          compound: {
            should: [
              {
                text: {
                  query: searchTerm,
                  path: 'episode_data.segment_title',
                  score: { boost: { value: 3 } }, // Highest priority
                },
              },
              {
                text: {
                  query: searchTerm,
                  path: 'episode_data.summary',
                  fuzzy: {},
                  score: { boost: { value: 1 } }, // Lower priority
                },
              },
            ],
            minimumShouldMatch: 1,
          },
        },
      },
      { $unwind: '$episode_data' },
      {
        $addFields: {
          matchScore: {
            $add: [
              {
                $cond: {
                  if: {
                    $regexMatch: {
                      input: '$episode_data.segment_title',
                      regex: searchTerm,
                      options: 'i',
                    },
                  },
                  then: 1,
                  else: 0,
                },
              },
              {
                $cond: {
                  if: {
                    $regexMatch: {
                      input: '$episode_data.summary',
                      regex: searchTerm,
                      options: 'i',
                    },
                  },
                  then: 1,
                  else: 0,
                },
              },
            ],
          },
        },
      },
      { $match: { matchScore: { $gt: 0 } } },
      {
        $addFields: {
          'episode_data.episode_id': '$_id',
          'episode_data.episode_title': '$episode_title',
          'episode_data.episode_number': '$episode_number',
          'episode_data.timestamp': '$episode_data.start_time_ms', // Added timestamp field
        },
      },
      { $sort: { matchScore: -1 } }, // Sort by match score in descending order
      { $replaceRoot: { newRoot: '$episode_data' } },
      { $skip: skip },
      { $limit: pageSize },
    ];

    if (!searchTerm) {
      pipeline = pipeline.filter(
        (stage) => !(stage['$search'] || stage['$match']),
      );
    }

    const searchResults = await collection.aggregate(pipeline).toArray();
    console.log(searchResults);
    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: 'Success',
        data: searchResults,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
