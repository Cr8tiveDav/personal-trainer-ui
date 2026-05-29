import React from "react";
import { TabType } from "./TrainerDetailsClient";
import { ReusableTabs, TabItem } from "@/components/ui/ReusableTabs";

interface TrainerTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: TabItem<TabType>[] = [
  { id: "overview", label: "Overview" },
  { id: "sessions", label: "Sessions" },
  // { id: "earnings", label: "Earnings" },
  { id: "media", label: "Media" },
  { id: "availability", label: "Availability" },
];

const TrainerTabs: React.FC<TrainerTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <ReusableTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      layoutId="trainer-detail-tabs"
    />
  );
};

export default TrainerTabs;
