import { EpisodeProps } from '@/types';

interface EpisodeOverviewProps {
  episode: EpisodeProps;
}

const EpisodeOverview = ({ episode }: EpisodeOverviewProps) => {
  return (
    <div className="relative h-96 rounded-lg bg-base2 p-4">
      <img
        className="absolute right-4 top-0 w-16 font-semibold"
        src="/tldl-logo-dm.svg"
      />
      <img
        className="absolute -left-20 -top-20 w-40 rounded-full border-4 border-base2"
        src="/sassano_400x400.jpg"
      />
      <h1 className="ml-16 text-left text-2xl font-thin">
        The Daily Gwei Refuel
      </h1>
      <h2 className="mt-14 text-center text-2xl font-semibold">
        {episode.episode_title}
      </h2>
      <p className="text-right text-baseText1">{episode.release_date}</p>
    </div>
  );
};

export default EpisodeOverview;
