'use client'

import { ReusableTabs, type TabItem } from '@/components/ui/ReusableTabs'

export type ClientTab = 'All' | 'Active' | 'Paused' | 'Inactive'

export type ClientTabCounts = {
  all: number
  active: number
  paused: number
  inactive: number
}

type ClientFilterTabsProps = {
  counts: ClientTabCounts
  activeTab: ClientTab
  onTabChange: (tab: ClientTab) => void
  isLoading?: boolean
}

export function ClientFilterTabs({
  counts,
  activeTab,
  onTabChange,
  isLoading = false,
}: ClientFilterTabsProps) {
  const display = (value: number): number | undefined =>
    isLoading ? undefined : value

  const tabs: TabItem<ClientTab>[] = [
    { id: 'All', label: 'All clients', count: display(counts.all) },
    { id: 'Active', label: 'Active', count: display(counts.active) },
    { id: 'Paused', label: 'Paused', count: display(counts.paused) },
    { id: 'Inactive', label: 'Inactive', count: display(counts.inactive) },
  ]

  return (
    <ReusableTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      layoutId='clients-filter-tabs'
    />
  )
}
