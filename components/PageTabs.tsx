'use client';

interface Tab {
  value: string;
  label: string;
}

interface PageTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

import { Button } from './ui/Button';

export default function PageTabs({ tabs, activeTab, onTabChange }: PageTabsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          size="sm"
          variant={activeTab === tab.value ? 'solid' : 'ghost'}
          className="min-w-[88px]"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

