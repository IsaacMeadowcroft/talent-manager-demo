import { useEffect, useMemo, useState } from "react";
import { AppHeader } from "./components/dashboard/AppHeader";
import { BrandOfferModal } from "./components/dashboard/BrandOfferModal";
import { DealDetailPanel } from "./components/dashboard/DealDetailPanel";
import { EngagementAnalyticsPanel } from "./components/dashboard/EngagementAnalyticsPanel";
import { InboxNegotiationPanel } from "./components/dashboard/InboxNegotiationPanel";
import { NotificationToast } from "./components/dashboard/NotificationToast";
import { SidebarNav } from "./components/dashboard/SidebarNav";
import { TalentListPanel } from "./components/dashboard/TalentListPanel";
import {
  brandMessages,
  initialAiDraftMessage,
  talentDeals,
} from "./data/mockData";

export default function App() {
  const [selectedDeal, setSelectedDeal] = useState(talentDeals[0]);
  const [selectedMessage, setSelectedMessage] = useState(brandMessages[2]);
  const [activeTab, setActiveTab] = useState("active");
  const [activeNav, setActiveNav] = useState("deals");
  const [inboxFilter, setInboxFilter] = useState("all");
  const [inboxSearchQuery, setInboxSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [aiDraftApproved, setAiDraftApproved] = useState(false);
  const [aiDraftMessage, setAiDraftMessage] = useState(initialAiDraftMessage);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dealSearchQuery, setDealSearchQuery] = useState("");
  const [analyticsSearchQuery, setAnalyticsSearchQuery] = useState("");
  const [offerCreated, setOfferCreated] = useState(false);

  useEffect(() => {
    setAiDraftApproved(false);
  }, [selectedDeal.id]);

  const talentEngagementData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      rate: selectedDeal.engagementRate + Math.random() * 1.5 - 0.5 + i * 0.05,
    }));
  }, [selectedDeal]);

  const talentViewsData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      views: selectedDeal.viewsBase + Math.floor(Math.random() * 50000) + i * 5000,
    }));
  }, [selectedDeal]);

  const aiCounterLift = selectedDeal.recommendedCounter - selectedDeal.currentOffer;

  const filteredMessages = brandMessages.filter((msg) => {
    if (inboxFilter === "all") return true;
    return msg.type === inboxFilter;
  });

  return (
    <div className="h-screen w-screen flex bg-background overflow-hidden">
      {showNotification && (
        <NotificationToast onClose={() => setShowNotification(false)} />
      )}

      {showDealModal && (
        <BrandOfferModal
          offerCreated={offerCreated}
          onClose={() => setShowDealModal(false)}
          onCreateOffer={() => setOfferCreated(true)}
          onDone={() => {
            setOfferCreated(false);
            setShowDealModal(false);
          }}
        />
      )}

      <SidebarNav activeNav={activeNav} onActiveNavChange={setActiveNav} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          onActiveTabChange={setActiveTab}
          onSearchQueryChange={setSearchQuery}
          onInboxClick={() => setActiveNav("inbox")}
          onNotificationClick={() => {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }}
          onAddBrandOfferClick={() => setShowDealModal(true)}
        />

        <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
          {activeNav === "deals" && (
            <TalentListPanel
              deals={talentDeals}
              selectedDeal={selectedDeal}
              dealSearchQuery={dealSearchQuery}
              showFilterMenu={showFilterMenu}
              onDealSelect={setSelectedDeal}
              onDealSearchQueryChange={setDealSearchQuery}
              onShowFilterMenuChange={setShowFilterMenu}
            />
          )}

          {activeNav === "analytics" ? (
            <EngagementAnalyticsPanel
              talent={talentDeals}
              selectedTalent={selectedDeal}
              searchQuery={analyticsSearchQuery}
              engagementData={talentEngagementData}
              viewsData={talentViewsData}
              onSearchQueryChange={setAnalyticsSearchQuery}
              onTalentSelect={setSelectedDeal}
            />
          ) : activeNav === "inbox" ? (
            <InboxNegotiationPanel
              mode="inbox"
              filteredMessages={filteredMessages}
              selectedMessage={selectedMessage}
              selectedDeal={selectedDeal}
              inboxFilter={inboxFilter}
              inboxSearchQuery={inboxSearchQuery}
              aiDraftApproved={aiDraftApproved}
              aiDraftMessage={aiDraftMessage}
              onInboxFilterChange={setInboxFilter}
              onInboxSearchQueryChange={setInboxSearchQuery}
              onSelectedMessageChange={setSelectedMessage}
              onAiDraftApprovedChange={setAiDraftApproved}
              onAiDraftMessageChange={setAiDraftMessage}
            />
          ) : (
            <>
              <DealDetailPanel
                selectedDeal={selectedDeal}
                aiCounterLift={aiCounterLift}
              />

              <InboxNegotiationPanel
                mode="deal"
                filteredMessages={filteredMessages}
                selectedMessage={selectedMessage}
                selectedDeal={selectedDeal}
                inboxFilter={inboxFilter}
                inboxSearchQuery={inboxSearchQuery}
                aiDraftApproved={aiDraftApproved}
                aiDraftMessage={aiDraftMessage}
                onInboxFilterChange={setInboxFilter}
                onInboxSearchQueryChange={setInboxSearchQuery}
                onSelectedMessageChange={setSelectedMessage}
                onAiDraftApprovedChange={setAiDraftApproved}
                onAiDraftMessageChange={setAiDraftMessage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
