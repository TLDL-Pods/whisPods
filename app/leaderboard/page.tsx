import Leaderboard from './components/Leaderboard';
import DonateButton from '../components/DonateButton';
import SupportedTokens from './components/SupportedTokens';

const DuneDataDisplay = () => {
  return (
    <div className="flex flex-col items-center py-8 lg:p-8">
      <h2 className="text-thin flex text-center text-4xl">DONATIONS</h2>
      <DonateButton />
      <SupportedTokens />
      <Leaderboard />
    </div>
  );
};

export default DuneDataDisplay;
