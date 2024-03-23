import { getClientAndDb } from '@/app/api/mongo/db';
import EpisodeSelect from '@/app/components/EpisodeSelect';
import { EpisodeProps } from '@/types';

async function getSearchResults(searchTerm: string) {
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
            minimumShouldMatch: 1,
          },
        },
      },
      { $limit: 10 },
    ];

    if (!searchTerm) {
      pipeline.shift();
    }

    const searchResults = await collection.aggregate(pipeline).toArray();
    console.log(searchResults[40]);

    return searchResults;
  } catch (error: any) {
    console.error(error);
    return error.json({ status: 500, message: error.message });
  }
}

export default async function Page({ params }: any) {
  const searchTerm = params.searchTerm;
  const searchResults = await getSearchResults(searchTerm);
  return (
    <main className="flex flex-col items-center">
      <div className="">
        {searchResults &&
          searchResults.map((result: any) => (
            <div className="flex flex-col ">
              <EpisodeSelect key={result._id} episode={result} />
            </div>
          ))}
      </div>
    </main>
  );
}
