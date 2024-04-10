'use client';
import React, { useEffect, useState } from 'react';

const tableHeaderCellClass = 'border-2 border-gray-400 px-4 py-2';
const tableRowCellClass = 'border border-gray-500 px-4 py-2';

// Define the type for each data item
type DuneDataItem = {
  N: number;
  donor_name: string;
  historical_value: number;
  current_value: number;
  value_percentage_change: number;
  donations: number;
  tx_hashes: string;
};

// Define the type for the entire API response, incorporating the nested structure
type ApiResponse = {
  status: number;
  message: string;
  data: {
    metadata: {
      column_names: string[];
      datapoint_count: number;
      execution_time_millis: number;
      pending_time_millis: number;
      result_set_bytes: number;
      row_count: number;
      total_result_set_bytes: number;
      total_row_count: number;
    };
    rows: DuneDataItem[];
  };
};
const DuneDataDisplay: React.FC = () => {
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

  if (loading) return <div className="text-center">Loading...</div>;

  // Ensure that data is not null before trying to access its properties
  if (!data) return <div>No data found</div>;

  return (
    <div className="flex flex-col items-center">
      <table className="m-2 table-auto">
        <thead className="bg-base">
          <tr>
            <th className={tableHeaderCellClass}>Place</th>
            <th className={tableHeaderCellClass}>Donor Name</th>
            <th className={tableHeaderCellClass}>Current Value</th>
            <th className={tableHeaderCellClass}>Donations</th>
            <th className={tableHeaderCellClass}>Historical Value</th>
          </tr>
        </thead>
        <tbody className="border-2 border-gray-400">
          {data.data.rows.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 ? 'bg-base1' : 'bg-base2'}`}
            >
              <td className={`${tableRowCellClass} text-center font-semibold`}>
                {index + 1}
              </td>
              <td className={`${tableRowCellClass}`}>{item.donor_name}</td>
              <td className={`${tableRowCellClass} text-right`}>
                $
                <span className="font-semibold">
                  {item.current_value.toFixed(0)}
                </span>{' '}
                (
                <span
                  className={`${item.value_percentage_change * 100 < 0 ? 'text-red-500' : 'text-green-400'} text-xs`}
                >{`${(item.value_percentage_change * 100).toFixed(2)}%`}</span>
                )
              </td>
              <td className={`${tableRowCellClass} text-right`}>
                {item.donations}
              </td>
              <td className={`${tableRowCellClass} text-right`}>
                $
                <span className={`font-semibold`}>
                  {item.historical_value.toFixed(0)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DuneDataDisplay;
