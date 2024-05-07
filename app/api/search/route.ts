import { NextRequest, NextResponse } from 'next/server';
import { getClientAndDb } from '../mongo/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchTerm = url.searchParams.get('searchTerm');
  const page = parseInt(url.searchParams.get('page') || '0', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
  const skip = page * pageSize;

  try {
    const { db } = await getClientAndDb();
    const collection = db.collection('thedailygweiRecap');

    const pipeline = [
      {
        $search: {
          index: 'default',
          compound: {
            should: [
              {
                text: {
                  query: searchTerm,
                  path: 'episode_data.segment_title',
                  score: { boost: { value: 3 } },
                },
              },
              {
                text: {
                  query: searchTerm,
                  path: 'episode_data.summary',
                  fuzzy: {},
                  score: { boost: { value: 1 } },
                },
              },
              {
                text: {
                  query: searchTerm,
                  path: 'episode_data.complete_transcript',
                  fuzzy: {},
                  score: { boost: { value: 0.5 } },
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
                $cond: [
                  {
                    $regexMatch: {
                      input: '$episode_data.segment_title',
                      regex: searchTerm,
                      options: 'i',
                    },
                  },
                  1,
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: '$episode_data.summary',
                      regex: searchTerm,
                      options: 'i',
                    },
                  },
                  1,
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: '$episode_data.complete_transcript',
                      regex: searchTerm,
                      options: 'i',
                    },
                  },
                  1,
                  0,
                ],
              },
            ],
          },
        },
      },
      { $match: { matchScore: { $gt: 0 } } },
      {
        $facet: {
          totalCount: [{ $count: 'total' }],
          paginatedResults: [
            { $sort: { matchScore: -1 } },
            { $skip: skip },
            { $limit: pageSize },
            {
              $addFields: {
                'episode_data.episode_id': '$_id',
                'episode_data.episode_title': '$episode_title',
                'episode_data.episode_number': '$episode_number',
                'episode_data.timestamp': '$episode_data.start_time_ms',
              },
            },
            { $replaceRoot: { newRoot: '$episode_data' } },
          ],
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    const totalCount =
      result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
    const searchResults = result[0].paginatedResults;

    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: 'Success',
        totalCount: totalCount,
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
