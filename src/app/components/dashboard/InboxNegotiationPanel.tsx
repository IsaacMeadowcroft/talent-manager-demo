import { Mail, Search, Send, Sparkles } from "lucide-react";
import type { InboxConversation, TalentDeal } from "../../types/dashboard";

type InboxNegotiationPanelProps = {
  mode: "deal" | "inbox";
  filteredMessages: InboxConversation[];
  selectedMessage: InboxConversation;
  selectedDeal: TalentDeal;
  inboxFilter: string;
  inboxSearchQuery: string;
  aiDraftApproved: boolean;
  aiDraftMessage: string;
  onInboxFilterChange: (filter: string) => void;
  onInboxSearchQueryChange: (query: string) => void;
  onSelectedMessageChange: (message: InboxConversation) => void;
  onAiDraftApprovedChange: (approved: boolean) => void;
  onAiDraftMessageChange: (message: string) => void;
};

const filterLabels = [
  { id: "all", label: "All" },
  { id: "offer", label: "Offers" },
  { id: "counter", label: "Counters" },
  { id: "legal", label: "Legal" },
  { id: "talent", label: "Influencers" },
];

const detailRows = [
  { label: "Video Length", value: "60-second YouTube integration" },
  { label: "Exclusivity", value: "30-day category exclusivity" },
  { label: "Usage Rights", value: "Paid media rights (6 months)" },
  { label: "Deliverables", value: "1 hero video + 3 cut-downs" },
];

export function InboxNegotiationPanel({
  mode,
  filteredMessages,
  selectedMessage,
  selectedDeal,
  inboxFilter,
  inboxSearchQuery,
  aiDraftApproved,
  onInboxFilterChange,
  onInboxSearchQueryChange,
  onSelectedMessageChange,
  onAiDraftApprovedChange,
  onAiDraftMessageChange,
}: InboxNegotiationPanelProps) {
  const visibleMessages = filteredMessages.filter((msg) => {
    const query = inboxSearchQuery.toLowerCase();
    return (
      msg.senderName.toLowerCase().includes(query) ||
      msg.brand.toLowerCase().includes(query) ||
      msg.talentName.toLowerCase().includes(query) ||
      msg.preview.toLowerCase().includes(query)
    );
  });

  const baseFee = Math.round(selectedDeal.recommendedCounter / 1.75);
  const exclusivityFee = Math.round(baseFee * 0.4);
  const usageFee = Math.round(baseFee * 0.35);
  const totalCounter = baseFee + exclusivityFee + usageFee;

  return (
    <div className={`${mode === "inbox" ? "col-span-12" : "col-span-4"} flex flex-col gap-3 overflow-hidden`}>
      {mode === "inbox" && (
        <div className="bg-card rounded-lg border border-border flex-1 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-semibold mb-2">Inbox</h3>
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 mb-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={inboxSearchQuery}
                onChange={(e) => onInboxSearchQueryChange(e.target.value)}
                placeholder="Search old conversations by brand, influencer, or terms..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2">
              {filterLabels.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onInboxFilterChange(filter.id)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    inboxFilter === filter.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {visibleMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => onSelectedMessageChange(msg)}
                className={`w-full p-3 border-b border-border hover:bg-muted transition-colors text-left ${
                  selectedMessage.id === msg.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img src={msg.avatar} alt={msg.senderName} className="w-10 h-10 rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <Mail className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{msg.senderName}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded border ${
                            msg.senderType === "Brand"
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-[#10b981]/10 text-[#047857] border-[#10b981]/20"
                          }`}
                        >
                          {msg.senderType}
                        </span>
                        {msg.unread && <span className="w-2 h-2 bg-[#2563eb] rounded-full" />}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {msg.senderType === "Brand" ? `For ${msg.talentName}` : `Re: ${msg.brand}`}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{msg.preview}</p>
                    <span className="text-xs text-muted-foreground font-mono mt-1 block">{msg.time}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "deal" && (
        <div className="bg-card rounded-lg border border-border p-4 flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
              <h3 className="text-sm font-semibold">AI Negotiation Agent</h3>
            </div>
            <span className="text-xs text-muted-foreground">{selectedDeal.stage}</span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto pr-1 mb-3">
            <div className="rounded-lg border border-border bg-card p-3 mb-3 text-xs">
              <div className="flex justify-between gap-3 text-muted-foreground font-mono mb-2">
                <span>{selectedDeal.brand} Brand Team</span>
                <span>2026-05-29 10:08</span>
              </div>
              <p className="leading-relaxed">
                We are starting to scope creator partnerships for {selectedDeal.campaign}. Is {selectedDeal.name} open to app/productivity integrations this month?
              </p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 mb-3 text-xs">
              <div className="flex justify-between gap-3 text-muted-foreground font-mono mb-2">
                <span>You</span>
                <span>2026-05-29 13:41</span>
              </div>
              <p className="leading-relaxed">
                Yes, {selectedDeal.name} is open to the category if usage rights, timeline, and exclusivity are clearly scoped.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 mb-3 text-xs">
              <div className="flex justify-between gap-3 text-muted-foreground font-mono mb-2">
                <span>{selectedDeal.brand} Brand Team</span>
                <span>2026-06-01 16:12</span>
              </div>
              <p className="leading-relaxed">
                Great. We will send a formal brief with deliverables, paid rights, and budget so you can review.
              </p>
            </div>

            <div className="space-y-2 text-xs mb-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="flex justify-between gap-3 text-muted-foreground font-mono mb-2">
                  <span>{selectedDeal.brand} Brand Team</span>
                  <span>2026-06-03 09:15</span>
                </div>
                <p className="leading-relaxed">
                  Hi! We're launching {selectedDeal.campaign} and would love to collaborate with {selectedDeal.name} on a sponsored integration. Our target is a high-intent audience aligned with {selectedDeal.brand}.
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div className="flex justify-between gap-3 text-muted-foreground font-mono mb-2">
                  <span>You</span>
                  <span>2026-06-03 14:22</span>
                </div>
                <p className="leading-relaxed">
                  Thanks for reaching out. I've reviewed your brief. Let me share {selectedDeal.name}'s rate structure for this type of campaign.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-[#8b5cf6]/30 bg-gradient-to-br from-[#8b5cf6]/10 to-[#8b5cf6]/5 p-4">
            <h4 className="text-xs font-semibold tracking-wide uppercase text-[#8b5cf6] mb-3">
              AI Agent Counter-Proposal
            </h4>
            <div className="rounded-lg border border-[#8b5cf6]/20 bg-white/60 p-3 mb-4">
              <h5 className="text-sm font-semibold mb-2">Original Request</h5>
              <div className="grid grid-cols-2 gap-2">
                {detailRows.map((row) => (
                  <div key={row.label} className="bg-card rounded p-2">
                    <p className="text-[10px] text-muted-foreground mb-0.5">{row.label}:</p>
                    <p className="text-xs font-medium">{row.value}</p>
                  </div>
                ))}
                <div className="bg-card rounded p-2 col-span-2">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Proposed Budget:</p>
                  <p className="text-xs font-mono font-semibold">${selectedDeal.currentOffer.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Thank you for your interest in working with {selectedDeal.name}. Based on the scope outlined in your brief including 30-day category exclusivity and paid media rights for 6 months, here's our counter-proposal that reflects {selectedDeal.name}'s standard rate card and the additional value of exclusivity and extended usage rights:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span>Base Integration Fee:</span>
                <span className="font-mono font-semibold">${baseFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>30-Day Exclusivity (+40%):</span>
                <span className="font-mono font-semibold">+${exclusivityFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>6-Mo Paid Rights (+35%):</span>
                <span className="font-mono font-semibold">+${usageFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between gap-3 pt-2 border-t border-[#8b5cf6]/20">
                <span className="font-semibold">Total Campaign Investment:</span>
                <span className="font-mono font-bold text-[#8b5cf6]">${totalCounter.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-4">
              Let me know if you'd like to discuss the scope or have any questions about this proposal.
            </p>
            </div>
          </div>

          {aiDraftApproved ? (
            <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg p-3 text-center text-sm font-medium text-[#047857]">
              Counter-proposal approved and sent.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onAiDraftApprovedChange(true)}
                className="px-3 py-2 bg-[#8b5cf6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Approve and Send
              </button>
              <button
                onClick={() => onAiDraftMessageChange("Modify requested")}
                className="px-3 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
              >
                Modify Draft
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
