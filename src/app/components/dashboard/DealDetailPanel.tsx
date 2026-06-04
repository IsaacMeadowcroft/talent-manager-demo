import { Clock, Instagram, TrendingUp, Youtube } from "lucide-react";
import type { TalentDeal } from "../../types/dashboard";

type DealDetailPanelProps = {
  selectedDeal: TalentDeal;
  aiCounterLift: number;
};

const timelineSteps = [
  { label: "Initial Reach Out", key: "reachout" },
  { label: "First Offer", key: "offer" },
  { label: "AI Counteroffer", key: "counter" },
  { label: "Legal Review", key: "legal" },
  { label: "Signed", key: "signed" },
];

const stageProgress = {
  Inbound: 1,
  Reviewing: 2,
  Countered: 3,
  "Legal Review": 4,
  Closing: 4,
};

export function DealDetailPanel({ selectedDeal, aiCounterLift }: DealDetailPanelProps) {
  return (
    <div className="col-span-5 flex flex-col gap-3 overflow-y-auto pr-1">
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-start gap-4">
          <img src={selectedDeal.avatar} alt={selectedDeal.name} className="w-20 h-20 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-lg font-semibold mb-1">{selectedDeal.name}</h2>
                <p className="text-sm text-muted-foreground font-mono">{selectedDeal.handles[0].handle}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium mb-1">
                  {selectedDeal.stage}
                </span>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3" />
                  {selectedDeal.responseDue}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{selectedDeal.bio}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-muted rounded-lg p-2">
                <p className="text-muted-foreground mb-0.5">Brand</p>
                <p className="font-medium">{selectedDeal.brand}</p>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <p className="text-muted-foreground mb-0.5">Campaign</p>
                <p className="font-medium truncate">{selectedDeal.campaign}</p>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <p className="text-muted-foreground mb-0.5">Contact</p>
                <p className="font-medium truncate">{selectedDeal.brandContact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Negotiation Timeline</h3>
          <span className="text-xs text-muted-foreground">State machine</span>
        </div>
        <div className="grid grid-cols-5 items-start gap-0">
          {timelineSteps.map((step, index) => {
            const progress = stageProgress[selectedDeal.stage];
            const isComplete = index + 1 < progress;
            const isActive = index + 1 === progress;
            const value =
              step.key === "offer"
                ? `$${selectedDeal.currentOffer.toLocaleString()}`
                : step.key === "counter"
                  ? `$${selectedDeal.recommendedCounter.toLocaleString()}`
                  : step.key === "legal"
                    ? `Floor $${selectedDeal.floorPrice.toLocaleString()}`
                    : step.key === "signed"
                      ? "Pending"
                      : selectedDeal.responseDue;

            return (
              <div key={step.key} className="relative px-1">
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`absolute left-1/2 right-[-50%] top-4 h-0.5 z-0 ${
                      isComplete ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`relative z-20 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono font-semibold ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : isComplete
                          ? "bg-card text-primary border-primary"
                          : "bg-card text-muted-foreground border-border"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-xs font-medium mt-2 leading-tight">{step.label}</p>
                  <p
                    className={`text-[11px] font-mono mt-1 ${
                      step.key === "counter" ? "text-[#8b5cf6]" : "text-muted-foreground"
                    }`}
                  >
                    {value}
                  </p>
                  {step.key === "counter" && (
                    <p className="text-[10px] text-[#10b981] mt-0.5">
                      +${aiCounterLift.toLocaleString()} lift
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-sm font-semibold mb-4">Talent Channels</h3>
        <div className="flex items-center justify-between">
          {selectedDeal.connectedAccounts.map((account) => (
            <button key={account.handle} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${account.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                {account.platform === "instagram" ? <Instagram className="w-6 h-6" /> : <Youtube className="w-6 h-6" />}
              </div>
              <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">{account.handle}</span>
              <span className="text-xs font-mono font-medium">{account.followers}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-sm font-semibold mb-3">Deal History</h3>
        <div className="space-y-2">
          {selectedDeal.dealHistory.map((deal) => (
            <div key={`${deal.brand}-${deal.date}`} className="grid grid-cols-4 gap-3 py-2 border-b border-border last:border-0 text-xs">
              <div>
                <div className="font-medium mb-0.5">{deal.brand}</div>
                <div className="text-muted-foreground font-mono">{deal.date}</div>
              </div>
              <div className="text-muted-foreground">{deal.scope}</div>
              <div className="font-mono font-medium">{deal.value}</div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#10b981]" />
                <span className="font-mono text-[#10b981]">{deal.lift}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
