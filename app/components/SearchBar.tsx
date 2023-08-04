"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select, { SingleValue, StylesConfig } from "react-select";
import { useEpisodeContext } from "../hooks/useEpisodeContext";
import { EpisodeProps } from "@/types";

type OptionType = EpisodeProps & { value: number; label: string };

const darkModeStyles: StylesConfig<OptionType, false> = {
  // control (the container of the selected value and dropdown arrow)
  control: (provided) => ({
    ...provided,
    backgroundColor: "black",
  }),

  // option (each individual option in the dropdown)
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "gray" : "black",
    color: state.isSelected ? "black" : "white",
  }),

  // single-value (the selected value displayed in the control)
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),

  // Style the placeholder text
  placeholder: (provided) => ({
    ...provided,
    color: "gray",
  }),
};

export function SearchBar() {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<OptionType | null>(
    null
  );
  const { data } = useEpisodeContext();
  const router = useRouter();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const transformedOptions = data.map((episode) => ({
        value: episode.episode_number,
        label: episode.episode_title,
        ...episode,
      }));
      setOptions(transformedOptions);
    }
  }, [data]);

  const handleEpisodeSelect = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setSelectedEpisode(selectedOption);
      router.push(`/episode/${selectedOption.value}`);
    }
  };

  return (
    <div className="mx-12 hidden w-full lg:flex">
      <Select
        options={options}
        value={selectedEpisode}
        onChange={handleEpisodeSelect}
        placeholder="Search for episodes..."
        styles={darkModeStyles}
        className="mx-auto w-1/2 rounded-lg "
      />
    </div>
  );
}
