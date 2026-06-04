import { Search, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TalentDeal } from "../../types/dashboard";

type EngagementAnalyticsPanelProps = {
  talent: TalentDeal[];
  selectedTalent: TalentDeal;
  searchQuery: string;
  engagementData: Array<{ day: number; rate: number }>;
  viewsData: Array<{ day: number; views: number }>;
  onSearchQueryChange: (query: string) => void;
  onTalentSelect: (talent: TalentDeal) => void;
};

const tooltipStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "0.5rem",
  fontSize: "12px",
};

export function EngagementAnalyticsPanel({
  talent,
  selectedTalent,
  searchQuery,
  engagementData,
  viewsData,
  onSearchQueryChange,
  onTalentSelect,
}: EngagementAnalyticsPanelProps) {
  const filteredTalent = talent.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.handles.some((handle) => handle.handle.toLowerCase().includes(query))
    );
  });

  return (
    <div className="col-span-12 grid grid-cols-12 gap-4 overflow-hidden">
      <div className="col-span-4 bg-card rounded-lg border border-border flex flex-col overflow-hidden">
        <div className="p-3 border-b border-border">
          <h3 className="text-sm font-semibold mb-2">Influencer Search</h3>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search by name or handle..."
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredTalent.map((item) => (
            <button
              key={item.id}
              onClick={() => onTalentSelect(item)}
              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                selectedTalent.id === item.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {item.handles.map((handle) => handle.handle).join(" / ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-[#10b981]">{item.avgEngagement}</p>
                  <p className="text-[10px] text-muted-foreground">engagement</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-8 flex flex-col gap-3 overflow-y-auto pr-1">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-start gap-4">
            <img src={selectedTalent.avatar} alt={selectedTalent.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">{selectedTalent.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedTalent.bio}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total Reach</p>
              <p className="text-xl font-mono font-semibold">{selectedTalent.followers}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">Audience Engagement</span>
              <span className="text-xs font-mono font-medium text-[#10b981]">+12.4%</span>
            </div>
            <div className="h-48 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <XAxis hide />
                  <YAxis hide />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-2xl font-semibold font-mono">{selectedTalent.avgEngagement}</div>
          </div>

          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">Recent Views</span>
              <span className="text-xs font-mono font-medium text-[#10b981]">+8.2%</span>
            </div>
            <div className="h-48 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <XAxis hide />
                  <YAxis hide />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-2xl font-semibold font-mono">
              {selectedTalent.viewsBase >= 1000000
                ? `${(selectedTalent.viewsBase / 1000000).toFixed(1)}M`
                : `${(selectedTalent.viewsBase / 1000).toFixed(0)}K`}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#10b981]" />
            <h3 className="text-sm font-semibold">Platform Breakdown</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {selectedTalent.connectedAccounts.map((account) => (
              <div key={account.handle} className="rounded-lg border border-border p-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${account.gradient} mb-3`} />
                <p className="text-sm font-medium">{account.handle}</p>
                <p className="text-xs text-muted-foreground font-mono">{account.followers} followers</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
