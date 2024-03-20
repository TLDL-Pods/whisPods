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
          index: 'podcastSearch',
          text: {
            query: searchTerm,
            path: {
              wildcard: '*',
            },
          },
        },
      },
      { $sort: { episode_number: -1 } },
      { $limit: 10 },
    ];

    // If no searchTerm is provided, skip the $search stage
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
    <main>
      {data.map((d: EpisodeProps, i: number) => (
        <Link href={`/thedailygwei/${d.episode_number}`}>
          <div>{d.episode_title}</div>
        </Link>
      ))}
    </main>
  );
}
