import { NextRequest, NextResponse } from 'next/server';
import { getClientAndDb } from '../mongo/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchTerm = url.searchParams.get('searchTerm');
  const page = parseInt(url.searchParams.get('page') || '0', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
  const sortField = url.searchParams.get('sortField') || 'score';
  const sortOrder = url.searchParams.get('sortOrder') || 'desc';
  const skip = page * pageSize;

  try {
    const { db } = await getClientAndDb();
    const collection = db.collection('thedailygweiRecap');
    let sortObject: any = {};
    if (sortField === 'release_date') {
      // Ensure dates sort in the correct order regardless of default behavior
      sortObject[sortField] = sortOrder === 'desc' ? 1 : -1; // Reverse the logic specifically for date
    } else {
      sortObject[sortField] = sortOrder === 'asc' ? 1 : -1;
    }
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
                  fuzzy: {
                    maxEdits: 1,
                    prefixLength: 3,
                  },
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
          score: { $meta: 'searchScore' },
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

      { $sort: sortObject },

      {
        $facet: {
          totalCount: [{ $count: 'total' }],
          paginatedResults: [
            { $skip: skip },
            { $limit: pageSize },
            {
              $addFields: {
                'episode_data.episode_id': '$_id',
                'episode_data.episode_title': '$episode_title',
                'episode_data.episode_number': '$episode_number',
                'episode_data.release_date': '$release_date',
                'episode_data.score': '$score',
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
