"use client";

import React, { useState } from "react";
import { TabType } from "../types";
import FilterControls from "./filters/FilterControls";
import TrainerTable from "./table/TrainerTable";
import { useAdminTrainers, useTrainerStatusCounts } from "@/api/trainers";
import { getTrainerListOnboardingStatus } from "@/lib/trainers/admin-trainer-filters";

const PER_PAGE = 10;

const defaultCounts = { all: 0, active: 0, pending: 0, suspended: 0 };

const TrainersList = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { counts, isLoading: countsLoading } = useTrainerStatusCounts();
  const tabCounts = counts ?? defaultCounts;

  const onboardingStatus = getTrainerListOnboardingStatus(activeTab);

  const { data, isLoading, isError, isFetching } = useAdminTrainers(
    page,
    PER_PAGE,
    { onboardingStatus, searchQuery },
  );

  const hasListData = data !== undefined;
  const showSkeleton = isLoading && !hasListData;
  const trainers = data?.trainers ?? [];
  const metaTotalCount = data?.meta?.total_count ?? 0;

  const listTotalCount = metaTotalCount;

  const totalPages = data?.meta?.total_pages ?? 1;

  const displayPage = listTotalCount === 0 ? 1 : Math.min(page, totalPages);

  function handleTabChange(tab: TabType) {
    setActiveTab(tab);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setPage(1);
  }

  function goToPage(next: number) {
    if (next < 1 || next > totalPages || next === displayPage) return;
    setPage(next);
  }

  return (
    <div className="flex flex-col rounded-[24px] border border-[#CBD5E1] bg-white">
      <div className="py-6 px-4">
        <FilterControls
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          counts={tabCounts}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>

      <TrainerTable
        trainers={trainers}
        isLoading={showSkeleton || countsLoading}
        isFetching={isFetching && !showSkeleton}
        isError={isError}
        listKey={`${activeTab}-${searchQuery}-page-${displayPage}`}
        listTotalCount={listTotalCount}
        displayPage={displayPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default TrainersList;
