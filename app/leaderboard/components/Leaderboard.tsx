'use client';
import { ApiResponse } from '@/types';
import { useEffect, useState } from 'react';
import { GiCrownCoin, GiToken, GiTwoCoins } from 'react-icons/gi';

const Leaderboard = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const jsonData: ApiResponse = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <GiCrownCoin className="text-2xl text-yellow-300 opacity-80 lg:text-3xl" />
        );
      case 1:
        return (
          <GiTwoCoins className="text-2xl text-zinc-400 opacity-80 lg:text-3xl" />
        );
      case 2:
        return (
          <GiToken className="text-2xl text-yellow-700 opacity-80 lg:text-3xl" />
        );
      default:
        return null;
    }
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">Loading...</div>
    );
  if (!data) return <div>No data found</div>;

  return (
    <div className="mt-6 w-full max-w-5xl rounded-lg bg-black p-2 py-8 lg:p-6">
      <h1 className="text-center text-2xl font-semibold">LEADERBOARD</h1>
      <table className="m-2 mx-auto mt-6 w-full">
        <thead className="w-full rounded-t-lg bg-base text-xs lg:text-base lg:text-white">
          <tr>
            <th className="text-center">Rank</th>
            <th className="py-4 text-left">Donor Name</th>
            <th className="pr-2 text-right">Current Value</th>
            <th className="pr-2 text-right max-lg:hidden">Historical Value</th>
            <th className="pr-2 text-right lg:hidden">OG Value</th>

            <th className="pr-2 text-right max-lg:hidden">% Change</th>
            <th className="pr-2 text-right"># Donations</th>
          </tr>
        </thead>
        <tbody className="w-full rounded-b-lg">
          {data.data.rows.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 ? 'bg-base1' : 'bg-base2'} text-xs lg:text-base lg:text-white`}
            >
              <td
                className={`flex items-center justify-center gap-1 px-1 py-3 text-center font-semibold`}
              >
                {getIcon(index)}
                {index + 1}
              </td>
              <td
                className={`max-w-[150px] overflow-x-hidden text-ellipsis whitespace-nowrap px-1`}
              >
                {item.donor_name}
              </td>
              <td className={`px-1 text-right`}>
                $
                <span className="font-semibold">
                  {item.current_value.toFixed(0)}
                </span>
              </td>
              <td className={`px-1 text-right`}>
                $
                <span className="font-semibold">
                  {item.historical_value.toFixed(0)}
                </span>
              </td>
              <td className={`px-1 text-right max-lg:hidden`}>
                <span
                  className={`${item.value_percentage_change < 0 ? 'text-red-400' : 'text-green-400'}`}
                >
                  {`${(item.value_percentage_change * 100).toFixed(2)}%`}
                </span>
              </td>
              <td className={`pr-2 text-right`}>{item.donations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-8 text-center text-sm text-secondary">
        *Dashboard updates once daily
      </p>
    </div>
  );
};

export default Leaderboard;
