'use client';
import React, { useEffect, useState } from 'react';

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
      <table className="m-2 table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Donor Name</th>
            <th className="border border-gray-300 px-4 py-2">Current Value</th>
            <th className="border border-gray-300 px-4 py-2">Donations</th>
            <th className="border border-gray-300 px-4 py-2">
              Historical Value
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Value Change (%)
            </th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {data.data.rows.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {item.donor_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.current_value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.donations}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.historical_value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(item.value_percentage_change * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DuneDataDisplay;
