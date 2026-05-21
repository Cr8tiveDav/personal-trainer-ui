"use client";

import React, { useMemo, useState } from "react";
import { TabType } from "../types";
import FilterControls from "./filters/FilterControls";
import TrainerTable from "./table/TrainerTable";
import { useGetTrainers } from "@/api/trainers";
import { useDebounce } from "@/hooks/use-debounce";

const defaultCounts = { all: 0, active: 0, pending: 0, suspended: 0 };

const TrainersList = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { data, isLoading, isError } = useGetTrainers();

  const counts = data?.counts ?? defaultCounts;

  const filteredTrainers = useMemo(() => {
    if (!data?.data) return undefined;

    let list =
      activeTab === "all"
        ? data.data
        : data.data.filter(
            (trainer) => trainer.status.toLowerCase() === activeTab,
          );

    const query = debouncedSearch.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (trainer) =>
          trainer.name.toLowerCase().includes(query) ||
          trainer.email.toLowerCase().includes(query),
      );
    }

    return list;
  }, [data?.data, activeTab, debouncedSearch]);

  return (
    <div className="flex flex-col rounded-3xl border border-[#CBD5E1] bg-white">
      <div className="py-6 px-4">
        <FilterControls
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <TrainerTable
        trainers={filteredTrainers}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default TrainersList;
