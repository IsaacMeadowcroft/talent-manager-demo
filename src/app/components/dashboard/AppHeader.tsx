import { Bell, MessageSquare, Plus, Search } from "lucide-react";

type AppHeaderProps = {
  activeTab: string;
  searchQuery: string;
  onActiveTabChange: (tab: string) => void;
  onSearchQueryChange: (query: string) => void;
  onInboxClick: () => void;
  onNotificationClick: () => void;
  onAddBrandOfferClick: () => void;
};

export function AppHeader({
  activeTab,
  searchQuery,
  onActiveTabChange,
  onSearchQueryChange,
  onInboxClick,
  onNotificationClick,
  onAddBrandOfferClick,
}: AppHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between gap-6">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Search talent, brands, offers, and negotiations..."
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchQueryChange("")}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border-b-2 border-primary">
          <button
            onClick={() => onActiveTabChange("all")}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Active Deals
          </button>
          <button
            onClick={() => onActiveTabChange("talent")}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === "talent"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Talent Roster
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onInboxClick}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <button
            onClick={onNotificationClick}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <button
            onClick={onAddBrandOfferClick}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Brand Offer
          </button>
        </div>
      </div>
    </header>
  );
}
