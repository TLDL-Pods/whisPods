import { getClientAndDb } from '@/app/api/mongo/db';
import { EpisodeProps } from '@/types';
import Link from 'next/link';

async function getData(searchTerm: string) {
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
                  path: 'episode_title',
                  fuzzy: {},
                  score: { boost: { value: 3 } },
                },
              },
              {
                text: {
                  query: searchTerm,
                  path: 'episode_data.headline',
                  fuzzy: {},
                  score: { boost: { value: 2 } },
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
            ],
            minimumShouldMatch: 1, // Ensure at least one should condition matches
          },
        },
      },
      { $limit: 10 },
    ];

    if (!searchTerm) {
      pipeline.shift();
    }

    const data = await collection.aggregate(pipeline).toArray();

    return data;
  } catch (error: any) {
    console.error(error);
    return error.json({ status: 500, message: error.message });
  }
}

export default async function Page({ params }: any) {
  const searchTerm = params.searchTerm;
  const data = await getData(searchTerm);

  return (
    <main className="flex flex-col items-center">
      {data.map((ep: EpisodeProps) => (
        <Link
          href={`/thedailygwei/${ep.episode_number}`}
          className="flex h-32 w-1/2 items-center justify-center bg-base1 p-12 duration-300 hover:bg-base2"
        >
          <div className="flex text-2xl">
            <p>{ep.episode_number} - </p>
            <p className="ml-2">{ep.episode_title}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
