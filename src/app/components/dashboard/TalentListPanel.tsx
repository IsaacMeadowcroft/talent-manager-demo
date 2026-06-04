import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Filter,
  Search,
} from "lucide-react";
import type { TalentDeal } from "../../types/dashboard";

type TalentListPanelProps = {
  deals: TalentDeal[];
  selectedDeal: TalentDeal;
  dealSearchQuery: string;
  showFilterMenu: boolean;
  onDealSelect: (deal: TalentDeal) => void;
  onDealSearchQueryChange: (query: string) => void;
  onShowFilterMenuChange: (show: boolean) => void;
};

const actionStatusStyles = {
  "Action Needed": "bg-destructive/10 text-destructive border-destructive/20",
  Pending: "bg-amber-500/10 text-amber-700 border-amber-500/20",
};

export function TalentListPanel({
  deals,
  selectedDeal,
  dealSearchQuery,
  showFilterMenu,
  onDealSelect,
  onDealSearchQueryChange,
  onShowFilterMenuChange,
}: TalentListPanelProps) {
  return (
    <div className="col-span-3 flex flex-col gap-3 overflow-hidden">
      <div className="bg-card rounded-lg border border-border p-3 flex items-center gap-2 relative">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={dealSearchQuery}
          onChange={(e) => onDealSearchQueryChange(e.target.value)}
          placeholder="Search talent or brand deals..."
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
        />
        <button
          onClick={() => onShowFilterMenuChange(!showFilterMenu)}
          className="px-3 py-1.5 bg-muted rounded text-xs font-medium hover:bg-secondary transition-colors flex items-center gap-1"
        >
          <Filter className="w-3 h-3" />
          Stage
        </button>
        {showFilterMenu && (
          <div className="absolute top-full right-3 mt-2 bg-card border border-border rounded-lg shadow-lg p-3 w-64 z-10">
            <h4 className="text-xs font-semibold mb-2">Deal Filters</h4>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Negotiation Stage
                </label>
                <select className="w-full px-2 py-1 bg-input-background border border-border rounded text-xs">
                  <option>Any stage</option>
                  <option>Inbound</option>
                  <option>Countered</option>
                  <option>Legal Review</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Status
                </label>
                <select className="w-full px-2 py-1 bg-input-background border border-border rounded text-xs">
                  <option>Any status</option>
                  <option>Action Needed</option>
                  <option>Pending</option>
                </select>
              </div>
              <button
                onClick={() => onShowFilterMenuChange(false)}
                className="w-full px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {deals.map((deal) => (
          <button
            key={deal.id}
            onClick={() => onDealSelect(deal)}
            className={`w-full bg-card border rounded-lg p-3 hover:border-primary transition-colors text-left ${
              selectedDeal.id === deal.id
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="font-medium text-sm">{deal.campaign}</h3>
                <p className="text-xs text-muted-foreground truncate">
                  {deal.name} x {deal.brand}
                </p>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded border ${actionStatusStyles[deal.actionStatus]}`}
              >
                {deal.actionStatus}
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-3 rounded-lg bg-muted/60 p-2">
              <div className="flex flex-col items-center min-w-0">
                <img
                  src={deal.avatar}
                  alt={deal.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-card shadow-sm"
                />
                <span className="mt-1 text-[10px] font-medium truncate max-w-20">
                  {deal.name}
                </span>
                <span className="text-[10px] text-muted-foreground">Talent</span>
              </div>

              <div className="flex items-center justify-center gap-1 text-primary">
                <ArrowLeft className="w-4 h-4" />
                <div className="w-5 h-px bg-border" />
                <ArrowRight className="w-4 h-4" />
              </div>

              <div className="flex flex-col items-center min-w-0">
                <img
                  src={deal.brandAvatar}
                  alt={deal.brand}
                  className="w-12 h-12 rounded-full object-cover border-2 border-card shadow-sm"
                />
                <span className="mt-1 text-[10px] font-medium truncate max-w-20">
                  {deal.brand}
                </span>
                <span className="text-[10px] text-muted-foreground">Brand</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs bg-muted px-2 py-0.5 rounded font-medium">
                {deal.stage}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {deal.responseDue}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  Offer
                </p>
                <p className="text-sm font-mono font-semibold">
                  ${deal.currentOffer.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  AI Counter
                </p>
                <p className="text-sm font-mono font-semibold text-[#10b981]">
                  ${deal.recommendedCounter.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-700">
              <AlertTriangle className="w-3 h-3" />
              <span className="truncate">{deal.riskFlags[0]}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
