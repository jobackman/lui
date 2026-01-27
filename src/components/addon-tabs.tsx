import { cn } from "@/lib/utils";

interface AddonTab {
  id: string;
  name: string;
}

interface AddonTabsProps {
  tabs: AddonTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function AddonTabs({ tabs, activeTab, onTabChange }: AddonTabsProps) {
  return (
    <div className="w-full border-b border-border" role="tablist" aria-label="Addon categories">
      <div className="flex gap-1 px-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              activeTab === tab.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
}
