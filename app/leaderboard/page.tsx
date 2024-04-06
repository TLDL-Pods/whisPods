'use client';
import React, { useEffect, useState } from 'react';

// Define the type for your data items
type DuneDataItem = {
  // Define your data structure here based on the API response
  // For example:
  id: number;
  name: string;
  value: number;
};

const DuneDataDisplay: React.FC = () => {
  const [data, setData] = useState<DuneDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        setData(data); // Assuming the data format matches your component's state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    console.log(data),
    (
      <div className="flex flex-col items-center">
        {/* {data.map((item) => (
        <div
          key={item.id}
          className="m-2 rounded border border-gray-200 p-4 shadow"
        >
          <div>Name: {item.name}</div>
          <div>Value: {item.value}</div>
        </div> */}
        hello world
        {/* ))} */}
      </div>
    )
  );
};

export default DuneDataDisplay;
