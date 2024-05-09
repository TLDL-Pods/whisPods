import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'; // Ensure the base styles are imported

export default function DateRangePicker({ handleRangeSelect }: any) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartChange = (start: any) => {
    setStartDate(start);
    if (start && endDate) {
      handleRangeSelect({ from: start, to: endDate });
    }
  };

  const handleEndChange = (end: any) => {
    setEndDate(end);
    if (startDate && end) {
      handleRangeSelect({ from: startDate, to: end });
    }
  };

  return (
    <div className="flex gap-2">
      <div className="date-picker-custom mx-auto mt-4 flex max-w-fit flex-col rounded-lg border border-base5 bg-base2 p-1 px-4">
        <label className="text-xs text-baseText1">From</label>
        <DatePicker
          onChange={handleStartChange}
          value={startDate}
          className="border-none text-white" // Custom classes for styling
        />
      </div>
      <div className="date-picker-custom mx-auto mt-4 flex max-w-fit flex-col rounded-lg border border-base5 bg-base2 p-1 px-4">
        <label className="text-xs text-baseText1">To</label>
        <DatePicker
          onChange={handleEndChange}
          value={endDate}
          className="border-none text-white" // Custom classes for styling
        />
      </div>
    </div>
  );
}
