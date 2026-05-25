"use client";

import React, { useMemo, useState } from "react";
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
  const listTotalWithoutSearch =
    activeTab === "all"
      ? tabCounts.all
      : activeTab === "active"
        ? tabCounts.active
        : activeTab === "pending"
          ? tabCounts.pending
          : tabCounts.suspended;

  const maxPage = Math.max(
    1,
    Math.ceil(listTotalWithoutSearch / PER_PAGE) || 1,
  );
  const queryPage =
    searchQuery.trim() || listTotalWithoutSearch === 0
      ? page
      : Math.min(page, maxPage);

  const { data, isLoading, isError, isFetching } = useAdminTrainers(
    queryPage,
    PER_PAGE,
    { onboardingStatus },
  );

  const hasListData = data !== undefined;
  const showSkeleton = isLoading && !hasListData;
  const metaTotal = data?.meta?.total_count ?? 0;

  const filteredTrainers = useMemo(() => {
    const trainers = data?.trainers ?? [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return trainers;

    return trainers.filter((trainer) => {
      const name = (trainer.name ?? "").toLowerCase();
      const email = (trainer.email ?? "").toLowerCase();
      return name.includes(query) || email.includes(query);
    });
  }, [data?.trainers, searchQuery]);

  const listTotalCount = searchQuery.trim()
    ? filteredTrainers.length
    : metaTotal > 0
      ? metaTotal
      : listTotalWithoutSearch;

  const totalPages = Math.max(1, Math.ceil(listTotalCount / PER_PAGE) || 1);
  const displayPage =
    listTotalCount === 0 ? 1 : Math.min(queryPage, totalPages);

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
        trainers={filteredTrainers}
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
