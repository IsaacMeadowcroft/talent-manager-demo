import { useState, useMemo, useEffect } from "react";
import {
  Users,
  Briefcase,
  Inbox,
  DollarSign,
  Grid,
  Settings,
  HelpCircle,
  Search,
  Filter,
  MessageSquare,
  Bell,
  Plus,
  Instagram,
  Youtube,
  TrendingUp,
  Sparkles,
  Send,
  ThumbsUp,
  Edit3,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data generators
const generateSparklineData = () =>
  Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 20) + 80,
  }));

const generateEngagementData = () =>
  Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    rate: Math.floor(Math.random() * 2) + 4.5 + i * 0.05,
  }));

const generateViewsData = () =>
  Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    views: Math.floor(Math.random() * 50000) + 180000 + i * 5000,
  }));

const creators = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    handles: [
      { platform: "instagram", handle: "@sarahchen", icon: Instagram },
      { platform: "youtube", handle: "@sarahchenvlogs", icon: Youtube },
    ],
    engagement: generateSparklineData(),
    followers: "2.4M",
    avgEngagement: "5.8%",
    bio: "Lifestyle content creator focusing on wellness, fitness, and sustainable living. Based in Los Angeles.",
    connectedAccounts: [
      { platform: "instagram", handle: "@sarahchen", followers: "2.4M", gradient: "from-purple-500 to-pink-500" },
      { platform: "instagram", handle: "@sarah.style", followers: "480K", gradient: "from-purple-400 to-pink-400" },
      { platform: "youtube", handle: "@sarahchenvlogs", followers: "1.2M", gradient: "from-red-600 to-red-500" },
    ],
    basePrice: 800,
    engagementRate: 5.8,
    viewsBase: 180000,
    previousDeals: [
      { name: "Summer Collection 2025", date: "2025-08-12", deliverables: "3 Videos, 5 Stories", spend: "$4,200", engagement: "6.8%" },
      { name: "Holiday Campaign", date: "2025-12-05", deliverables: "2 Videos, 10 Posts", spend: "$6,800", engagement: "7.2%" },
      { name: "Spring Launch", date: "2026-03-18", deliverables: "1 Video, 3 Stories", spend: "$2,100", engagement: "5.4%" },
    ],
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    handles: [
      { platform: "instagram", handle: "@marcusfit", icon: Instagram },
      { platform: "youtube", handle: "@marcusfitness", icon: Youtube },
    ],
    engagement: generateSparklineData(),
    followers: "1.8M",
    avgEngagement: "6.2%",
    bio: "Certified personal trainer and nutrition coach. Helping people transform their lives through fitness and mindful eating.",
    connectedAccounts: [
      { platform: "instagram", handle: "@marcusfit", followers: "1.8M", gradient: "from-purple-500 to-pink-500" },
      { platform: "youtube", handle: "@marcusfitness", followers: "890K", gradient: "from-red-600 to-red-500" },
      { platform: "instagram", handle: "@marcus.meals", followers: "320K", gradient: "from-purple-400 to-pink-400" },
    ],
    basePrice: 950,
    engagementRate: 6.2,
    viewsBase: 220000,
    previousDeals: [
      { name: "Protein Brand Partnership", date: "2025-09-20", deliverables: "4 Videos, 8 Stories", spend: "$5,600", engagement: "7.5%" },
      { name: "Gym Equipment Collab", date: "2026-01-15", deliverables: "2 Videos, 12 Posts", spend: "$8,200", engagement: "6.9%" },
      { name: "Meal Prep Service", date: "2026-04-02", deliverables: "3 Videos, 6 Stories", spend: "$4,800", engagement: "6.4%" },
    ],
  },
  {
    id: 3,
    name: "Aisha Patel",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
    handles: [
      { platform: "instagram", handle: "@aishacooks", icon: Instagram },
      { platform: "youtube", handle: "@aishaskitchen", icon: Youtube },
    ],
    engagement: generateSparklineData(),
    followers: "3.1M",
    avgEngagement: "7.1%",
    bio: "Food blogger and recipe developer specializing in fusion cuisine. Michelin-trained chef sharing easy gourmet recipes.",
    connectedAccounts: [
      { platform: "instagram", handle: "@aishacooks", followers: "3.1M", gradient: "from-purple-500 to-pink-500" },
      { platform: "youtube", handle: "@aishaskitchen", followers: "1.8M", gradient: "from-red-600 to-red-500" },
      { platform: "instagram", handle: "@aisha.food", followers: "650K", gradient: "from-purple-400 to-pink-400" },
    ],
    basePrice: 1200,
    engagementRate: 7.1,
    viewsBase: 310000,
    previousDeals: [
      { name: "Kitchenware Brand Deal", date: "2025-10-08", deliverables: "5 Videos, 10 Posts", spend: "$9,400", engagement: "8.2%" },
      { name: "Food Delivery App", date: "2025-12-18", deliverables: "3 Videos, 15 Stories", spend: "$7,800", engagement: "7.8%" },
      { name: "Cookbook Launch", date: "2026-02-25", deliverables: "4 Videos, 8 Posts", spend: "$6,200", engagement: "7.3%" },
    ],
  },
  {
    id: 4,
    name: "Jake Morrison",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    handles: [
      { platform: "instagram", handle: "@jaketech", icon: Instagram },
      { platform: "youtube", handle: "@jakemtech", icon: Youtube },
    ],
    engagement: generateSparklineData(),
    followers: "950K",
    avgEngagement: "4.9%",
    bio: "Tech reviewer and software engineer. Breaking down the latest gadgets, apps, and tech trends for everyday users.",
    connectedAccounts: [
      { platform: "youtube", handle: "@jakemtech", followers: "950K", gradient: "from-red-600 to-red-500" },
      { platform: "instagram", handle: "@jaketech", followers: "420K", gradient: "from-purple-500 to-pink-500" },
      { platform: "instagram", handle: "@jake.dev", followers: "180K", gradient: "from-purple-400 to-pink-400" },
    ],
    basePrice: 650,
    engagementRate: 4.9,
    viewsBase: 150000,
    previousDeals: [
      { name: "Smartphone Launch", date: "2025-11-12", deliverables: "2 Videos, 5 Posts", spend: "$3,800", engagement: "5.2%" },
      { name: "App Sponsorship", date: "2026-01-28", deliverables: "3 Videos, 8 Stories", spend: "$4,500", engagement: "4.8%" },
      { name: "Gaming Laptop Review", date: "2026-03-15", deliverables: "1 Video, 4 Posts", spend: "$2,900", engagement: "5.1%" },
    ],
  },
];


const messages = [
  {
    id: 1,
    creator: "Sarah Chen",
    platform: Instagram,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    preview: "Thanks for reaching out! I'd love to discuss...",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    creator: "Marcus Rodriguez",
    platform: Youtube,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    preview: "My rate for sponsored content is typically...",
    time: "5h ago",
    unread: false,
  },
  {
    id: 3,
    creator: "Aisha Patel",
    platform: Instagram,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
    preview: "I can do $1,600 but need exclusivity for...",
    time: "1d ago",
    unread: true,
  },
];

export default function App() {
  const [selectedCreator, setSelectedCreator] = useState(creators[0]);
  const [selectedMessage, setSelectedMessage] = useState(messages[2]);
  const [activeTab, setActiveTab] = useState("all");
  const [activeNav, setActiveNav] = useState("profiles");
  const [inboxFilter, setInboxFilter] = useState("all");
  const [showNotification, setShowNotification] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [aiDraftApproved, setAiDraftApproved] = useState(false);
  const [aiDraftMessage, setAiDraftMessage] = useState(
    "Hi Aisha! Thank you for your interest in partnering with us. I appreciate you sharing your rate of $1,600 for a single video.\n\nAfter reviewing your amazing engagement rates and audience demographics, I'd love to propose an alternative structure that could work better for both of us:\n\n• Single video: $1,300 base rate\n• Performance bonus: Additional $200 if the video hits 500K views in the first 48 hours\n• Bundle option: 3 videos for $3,500 total (saving you $400) with 60-day category exclusivity\n\nYour content quality is exceptional, and we're confident this campaign will perform incredibly well. The performance bonus structure means you could actually earn more than your original ask if the content resonates with your audience the way we expect.\n\nWould you be open to discussing this structure? I'm also happy to jump on a quick call if you'd prefer to talk through the details. Looking forward to working together!"
  );
  const [playbookCreated, setPlaybookCreated] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [creatorSearchQuery, setCreatorSearchQuery] = useState("");
  const [showPriceInfo, setShowPriceInfo] = useState(false);
  const [maxBudget, setMaxBudget] = useState(3500);
  const [playbookExclusivity, setPlaybookExclusivity] = useState("30 days");
  const [campaignCreated, setCampaignCreated] = useState(false);

  // Price estimator state
  const [expandedSections, setExpandedSections] = useState({
    deliverable: true,
    rights: true,
    market: true,
  });

  // Deliverable Scope
  const [contentLength, setContentLength] = useState("60s");
  const [complexity, setComplexity] = useState("standard");
  const [platform, setPlatform] = useState("instagram");
  const [crossPost, setCrossPost] = useState(2);

  // Rights & Restrictions
  const [exclusivity, setExclusivity] = useState(30);
  const [paidAds, setPaidAds] = useState(false);
  const [adDuration, setAdDuration] = useState(90);
  const [ownership, setOwnership] = useState("shared");

  // Market & Creator Data
  const [baselineEngagement, setBaselineEngagement] = useState(5.8);
  const [geoTier, setGeoTier] = useState("tier1");
  const [niche, setNiche] = useState("lifestyle");
  const [seasonality, setSeasonality] = useState(1.0);

  // Update baseline engagement when creator changes
  useEffect(() => {
    setBaselineEngagement(selectedCreator.engagementRate);
  }, [selectedCreator]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Dynamic engagement and views data based on selected creator
  const creatorEngagementData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      rate: selectedCreator.engagementRate + Math.random() * 1.5 - 0.5 + i * 0.05,
    }));
  }, [selectedCreator]);

  const creatorViewsData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      views: selectedCreator.viewsBase + Math.floor(Math.random() * 50000) + i * 5000,
    }));
  }, [selectedCreator]);

  // Dynamic price calculation
  const estimatedPrice = useMemo(() => {
    let basePrice = selectedCreator.basePrice;

    // Content length multiplier
    const lengthMultipliers: { [key: string]: number } = {
      "15s": 0.6,
      "30s": 0.8,
      "60s": 1.0,
      "90s": 1.3,
      "120s": 1.5,
    };
    basePrice *= lengthMultipliers[contentLength] || 1.0;

    // Complexity multiplier
    const complexityMultipliers: { [key: string]: number } = {
      basic: 0.7,
      standard: 1.0,
      premium: 1.5,
      cinematic: 2.2,
    };
    basePrice *= complexityMultipliers[complexity] || 1.0;

    // Platform multiplier
    const platformMultipliers: { [key: string]: number } = {
      instagram: 1.0,
      tiktok: 0.9,
      youtube: 1.3,
      twitter: 0.8,
    };
    basePrice *= platformMultipliers[platform] || 1.0;

    // Cross-posting bonus
    basePrice += crossPost * 150;

    // Exclusivity premium (longer exclusivity = higher cost)
    basePrice += (exclusivity / 30) * 200;

    // Paid ads rights
    if (paidAds) {
      basePrice += (adDuration / 30) * 300;
    }

    // Ownership adjustment
    const ownershipMultipliers: { [key: string]: number } = {
      creator: 1.0,
      shared: 1.2,
      brand: 1.4,
    };
    basePrice *= ownershipMultipliers[ownership] || 1.0;

    // Engagement baseline (higher engagement = higher rates)
    basePrice *= baselineEngagement / 5.0;

    // Geographic tier
    const geoMultipliers: { [key: string]: number } = {
      tier1: 1.2,
      tier2: 1.0,
      tier3: 0.8,
    };
    basePrice *= geoMultipliers[geoTier] || 1.0;

    // Niche specialization
    const nicheMultipliers: { [key: string]: number } = {
      lifestyle: 1.0,
      tech: 1.2,
      finance: 1.4,
      beauty: 1.1,
      fitness: 1.0,
      food: 0.95,
    };
    basePrice *= nicheMultipliers[niche] || 1.0;

    // Seasonality
    basePrice *= seasonality;

    return Math.round(basePrice);
  }, [
    selectedCreator,
    contentLength,
    complexity,
    platform,
    crossPost,
    exclusivity,
    paidAds,
    adDuration,
    ownership,
    baselineEngagement,
    geoTier,
    niche,
    seasonality,
  ]);

  const filteredMessages = messages.filter((msg) => {
    if (inboxFilter === "all") return true;
    if (inboxFilter === "instagram")
      return msg.platform.name === "Instagram";
    if (inboxFilter === "youtube") return msg.platform.name === "Youtube";
    return true;
  });

  return (
    <div className="h-screen w-screen flex bg-background overflow-hidden">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-card border border-border rounded-lg shadow-lg p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <div>
              <h4 className="font-semibold text-sm mb-1">New Message</h4>
              <p className="text-xs text-muted-foreground">
                You have 3 unread messages from creators
              </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-4 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Campaign Modal */}
      {showCampaignModal && (
        <div
          onClick={() => setShowCampaignModal(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-lg border border-border p-6 w-full max-w-md"
          >
            {campaignCreated ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-8 h-8 text-[#10b981]" />
                </div>
                <h4 className="font-semibold text-lg mb-2">
                  Campaign Created!
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Your campaign has been successfully created and is ready to
                  launch.
                </p>
                <button
                  onClick={() => {
                    setCampaignCreated(false);
                    setShowCampaignModal(false);
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Create New Campaign
                </h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      placeholder="Q4 Holiday Collection"
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      Budget
                    </label>
                    <input
                      type="text"
                      placeholder="$25,000"
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      Target Creators
                    </label>
                    <input
                      type="text"
                      placeholder="5-10 creators"
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCampaignModal(false)}
                    className="flex-1 px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setCampaignCreated(true)}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Create Campaign
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 gap-6">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          IM
        </div>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActiveNav("profiles")}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeNav === "profiles"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Users className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveNav("campaigns")}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeNav === "campaigns"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Briefcase className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveNav("inbox")}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeNav === "inbox"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Inbox className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveNav("finance")}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeNav === "finance"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <DollarSign className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveNav("integrations")}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeNav === "integrations"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <button className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 rounded-full bg-muted overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search platform database..."
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-b-2 border-primary">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "all"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Influencers
              </button>
              <button
                onClick={() => setActiveTab("campaigns")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === "campaigns"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Q3 Launch
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveNav("inbox")}
                className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <button
                onClick={() => {
                  setShowNotification(true);
                  setTimeout(() => setShowNotification(false), 3000);
                }}
                className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <button
                onClick={() => setShowCampaignModal(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Campaign
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
          {/* Left Panel: Influencer Discovery */}
          <div className="col-span-3 flex flex-col gap-3 overflow-hidden">
            <div className="bg-card rounded-lg border border-border p-3 flex items-center gap-2 relative">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={creatorSearchQuery}
                onChange={(e) => setCreatorSearchQuery(e.target.value)}
                placeholder="Filter influencers..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              />
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="px-3 py-1.5 bg-muted rounded text-xs font-medium hover:bg-secondary transition-colors flex items-center gap-1"
              >
                <Filter className="w-3 h-3" />
                Filter
              </button>
              {showFilterMenu && (
                <div className="absolute top-full right-3 mt-2 bg-card border border-border rounded-lg shadow-lg p-3 w-64 z-10">
                  <h4 className="text-xs font-semibold mb-2">
                    Filter Options
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Engagement Rate
                      </label>
                      <select className="w-full px-2 py-1 bg-input-background border border-border rounded text-xs">
                        <option>Any</option>
                        <option>Above 5%</option>
                        <option>Above 7%</option>
                        <option>Above 10%</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Followers
                      </label>
                      <select className="w-full px-2 py-1 bg-input-background border border-border rounded text-xs">
                        <option>Any</option>
                        <option>100K-500K</option>
                        <option>500K-1M</option>
                        <option>1M+</option>
                      </select>
                    </div>
                    <button
                      onClick={() => setShowFilterMenu(false)}
                      className="w-full px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:opacity-90 transition-opacity"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {creators.map((creator) => (
                <button
                  key={creator.id}
                  onClick={() => setSelectedCreator(creator)}
                  className={`w-full bg-card border rounded-lg p-3 hover:border-primary transition-colors text-left ${
                    selectedCreator.id === creator.id
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1">
                        {creator.name}
                      </h3>
                      <div className="space-y-0.5 mb-2">
                        {creator.handles.map((handle, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground"
                          >
                            <handle.icon className="w-3 h-3" />
                            <span className="font-mono">{handle.handle}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-mono">
                          {creator.followers} followers
                        </span>
                        <span className="text-xs font-mono font-medium text-[#10b981]">
                          {creator.avgEngagement}
                        </span>
                      </div>
                      <div className="mt-2 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={creator.engagement}>
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#10b981"
                              strokeWidth={1.5}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Center-Right: Deep Dive Panel */}
          <div className="col-span-5 flex flex-col gap-3 overflow-y-auto pr-1">
            {/* Profile Header */}
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-start gap-4">
                <img
                  src={selectedCreator.avatar}
                  alt={selectedCreator.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-1">
                    {selectedCreator.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-2 font-mono">
                    {selectedCreator.handles[0].handle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedCreator.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Network Diagram */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold mb-4">
                Connected Accounts
              </h3>
              <div className="flex items-center justify-between">
                {selectedCreator.connectedAccounts.map((account, idx) => (
                  <div key={idx} className="contents">
                    {idx > 0 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                    <button className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${account.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                        {account.platform === "instagram" ? (
                          <Instagram className="w-6 h-6" />
                        ) : (
                          <Youtube className="w-6 h-6" />
                        )}
                      </div>
                      <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                        {account.handle}
                      </span>
                      <span className="text-xs font-mono font-medium">{account.followers}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    30-Day Engagement
                  </span>
                  <span className="text-xs font-mono font-medium text-[#10b981]">
                    +12.4%
                  </span>
                </div>
                <div className="h-24 mb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={creatorEngagementData}>
                      <XAxis hide />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                          fontSize: "12px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xl font-semibold font-mono">{selectedCreator.avgEngagement}</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    30-Day Views
                  </span>
                  <span className="text-xs font-mono font-medium text-[#10b981]">
                    +8.2%
                  </span>
                </div>
                <div className="h-24 mb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={creatorViewsData}>
                      <XAxis hide />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                          fontSize: "12px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xl font-semibold font-mono">
                  {selectedCreator.viewsBase >= 1000000
                    ? `${(selectedCreator.viewsBase / 1000000).toFixed(1)}M`
                    : `${(selectedCreator.viewsBase / 1000).toFixed(0)}K`}
                </div>
              </div>
            </div>

            {/* AI Price Estimator - Enhanced */}
            <div className="bg-gradient-to-br from-[#8b5cf6]/10 to-[#8b5cf6]/5 rounded-lg border border-[#8b5cf6]/30 overflow-hidden">
              <div className="p-4 border-b border-[#8b5cf6]/20 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
                    <h3 className="text-base font-semibold">
                      AI Price Estimator
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowPriceInfo(!showPriceInfo)}
                    className="p-1 hover:bg-[#8b5cf6]/10 rounded relative"
                  >
                    <Info className="w-4 h-4 text-[#8b5cf6]" />
                  </button>
                </div>
                {showPriceInfo && (
                  <div className="absolute top-14 right-4 bg-white border border-[#8b5cf6]/30 rounded-lg shadow-lg p-3 w-64 z-20">
                    <h4 className="text-xs font-semibold mb-2 text-[#8b5cf6]">
                      How It Works
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      Our ML algorithm analyzes 15+ variables including creator
                      performance, market rates, rights, and seasonality to
                      generate real-time pricing estimates.
                    </p>
                    <button
                      onClick={() => setShowPriceInfo(false)}
                      className="text-xs text-[#8b5cf6] hover:underline"
                    >
                      Got it
                    </button>
                  </div>
                )}

                <div className="bg-white/60 rounded-lg p-4 mb-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold font-mono text-[#8b5cf6]">
                      ${estimatedPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      estimated cost
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 text-[#10b981]" />
                    <span>Updated in real-time based on configuration</span>
                  </div>
                </div>
              </div>

              {/* Deliverable Scope */}
              <div className="border-b border-[#8b5cf6]/20">
                <button
                  onClick={() => toggleSection("deliverable")}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/30 transition-colors"
                >
                  <span className="text-sm font-semibold">
                    Deliverable Scope
                  </span>
                  {expandedSections.deliverable ? (
                    <ChevronUp className="w-4 h-4 text-[#8b5cf6]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8b5cf6]" />
                  )}
                </button>
                {expandedSections.deliverable && (
                  <div className="px-4 pb-4 space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Content Length
                      </label>
                      <select
                        value={contentLength}
                        onChange={(e) => setContentLength(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-border rounded text-sm"
                      >
                        <option value="15s">15 seconds</option>
                        <option value="30s">30 seconds</option>
                        <option value="60s">60 seconds</option>
                        <option value="90s">90 seconds</option>
                        <option value="120s">2 minutes</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Production Complexity
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {["basic", "standard", "premium", "cinematic"].map(
                          (level) => (
                            <button
                              key={level}
                              onClick={() => setComplexity(level)}
                              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                                complexity === level
                                  ? "bg-[#8b5cf6] text-white"
                                  : "bg-white border border-border hover:border-[#8b5cf6]/50"
                              }`}
                            >
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Target Platform
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { value: "instagram", label: "IG", icon: Instagram },
                          { value: "tiktok", label: "TT", icon: MessageSquare },
                          { value: "youtube", label: "YT", icon: Youtube },
                          { value: "twitter", label: "X", icon: MessageSquare },
                        ].map((plat) => (
                          <button
                            key={plat.value}
                            onClick={() => setPlatform(plat.value)}
                            className={`px-2 py-2 rounded text-xs font-medium transition-colors flex flex-col items-center gap-1 ${
                              platform === plat.value
                                ? "bg-[#8b5cf6] text-white"
                                : "bg-white border border-border hover:border-[#8b5cf6]/50"
                            }`}
                          >
                            <plat.icon className="w-4 h-4" />
                            {plat.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 flex items-center justify-between">
                        <span>Cross-Posting Platforms</span>
                        <span className="font-mono font-medium text-foreground">
                          {crossPost}
                        </span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={crossPost}
                        onChange={(e) => setCrossPost(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>5</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rights & Restrictions */}
              <div className="border-b border-[#8b5cf6]/20">
                <button
                  onClick={() => toggleSection("rights")}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/30 transition-colors"
                >
                  <span className="text-sm font-semibold">
                    Rights & Restrictions
                  </span>
                  {expandedSections.rights ? (
                    <ChevronUp className="w-4 h-4 text-[#8b5cf6]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8b5cf6]" />
                  )}
                </button>
                {expandedSections.rights && (
                  <div className="px-4 pb-4 space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 flex items-center justify-between">
                        <span>Competitor Exclusivity Window</span>
                        <span className="font-mono font-medium text-foreground">
                          {exclusivity} days
                        </span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        step="15"
                        value={exclusivity}
                        onChange={(e) => setExclusivity(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>None</span>
                        <span>180 days</span>
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          Paid Ad Amplification Rights
                        </span>
                        <button
                          onClick={() => setPaidAds(!paidAds)}
                          className={`relative w-10 h-5 rounded-full transition-colors ${
                            paidAds ? "bg-[#8b5cf6]" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                              paidAds ? "translate-x-5" : ""
                            }`}
                          />
                        </button>
                      </label>
                      {paidAds && (
                        <div>
                          <label className="text-xs text-muted-foreground mb-1.5 flex items-center justify-between">
                            <span>Ad Duration</span>
                            <span className="font-mono font-medium text-foreground">
                              {adDuration} days
                            </span>
                          </label>
                          <input
                            type="range"
                            min="30"
                            max="365"
                            step="30"
                            value={adDuration}
                            onChange={(e) =>
                              setAdDuration(Number(e.target.value))
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>30d</span>
                            <span>365d</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Content Asset Ownership
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "creator", label: "Creator" },
                          { value: "shared", label: "Shared" },
                          { value: "brand", label: "Brand" },
                        ].map((own) => (
                          <button
                            key={own.value}
                            onClick={() => setOwnership(own.value)}
                            className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                              ownership === own.value
                                ? "bg-[#8b5cf6] text-white"
                                : "bg-white border border-border hover:border-[#8b5cf6]/50"
                            }`}
                          >
                            {own.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Market & Creator Data */}
              <div>
                <button
                  onClick={() => toggleSection("market")}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/30 transition-colors"
                >
                  <span className="text-sm font-semibold">
                    Market & Creator Data
                  </span>
                  {expandedSections.market ? (
                    <ChevronUp className="w-4 h-4 text-[#8b5cf6]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8b5cf6]" />
                  )}
                </button>
                {expandedSections.market && (
                  <div className="px-4 pb-4 space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 flex items-center justify-between">
                        <span>Baseline Engagement Rate</span>
                        <span className="font-mono font-medium text-foreground">
                          {baselineEngagement.toFixed(1)}%
                        </span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        step="0.1"
                        value={baselineEngagement}
                        onChange={(e) =>
                          setBaselineEngagement(Number(e.target.value))
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1%</span>
                        <span>15%</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Audience Geographic Tier
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "tier1", label: "Tier 1" },
                          { value: "tier2", label: "Tier 2" },
                          { value: "tier3", label: "Tier 3" },
                        ].map((tier) => (
                          <button
                            key={tier.value}
                            onClick={() => setGeoTier(tier.value)}
                            className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                              geoTier === tier.value
                                ? "bg-[#8b5cf6] text-white"
                                : "bg-white border border-border hover:border-[#8b5cf6]/50"
                            }`}
                          >
                            {tier.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tier 1: US/UK/CA/AU • Tier 2: EU/Asia • Tier 3: Others
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Industry Niche Specialization
                      </label>
                      <select
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-border rounded text-sm"
                      >
                        <option value="lifestyle">Lifestyle</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="beauty">Beauty & Fashion</option>
                        <option value="fitness">Fitness & Health</option>
                        <option value="food">Food & Cooking</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 flex items-center justify-between">
                        <span>Campaign Seasonality</span>
                        <span className="font-mono font-medium text-foreground">
                          {seasonality.toFixed(2)}x
                        </span>
                      </label>
                      <input
                        type="range"
                        min="0.7"
                        max="1.5"
                        step="0.05"
                        value={seasonality}
                        onChange={(e) =>
                          setSeasonality(Number(e.target.value))
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Off-peak</span>
                        <span>Peak</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-4 py-3 bg-white/40">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Powered by ML algorithms analyzing historical performance,
                  market trends, and configuration variables.
                </p>
              </div>
            </div>

            {/* Previous Deals */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold mb-3">Previous Deals</h3>
              <div className="space-y-2">
                {selectedCreator.previousDeals.map((deal, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 gap-3 py-2 border-b border-border last:border-0 text-xs"
                  >
                    <div>
                      <div className="font-medium mb-0.5">{deal.name}</div>
                      <div className="text-muted-foreground font-mono">
                        {deal.date}
                      </div>
                    </div>
                    <div className="text-muted-foreground">
                      {deal.deliverables}
                    </div>
                    <div className="font-mono font-medium">{deal.spend}</div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-[#10b981]" />
                      <span className="font-mono text-[#10b981]">
                        {deal.engagement}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: AI Outreach & Negotiation */}
          <div className="col-span-4 flex flex-col gap-3 overflow-hidden">
            {/* Unified Inbox */}
            <div className="bg-card rounded-lg border border-border flex-1 flex flex-col overflow-hidden">
              <div className="p-3 border-b border-border">
                <h3 className="text-sm font-semibold mb-2">Unified Inbox</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInboxFilter("all")}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      inboxFilter === "all"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-secondary"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setInboxFilter("instagram")}
                    className={`p-1 rounded transition-colors ${
                      inboxFilter === "instagram"
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Instagram
                      className={`w-4 h-4 ${
                        inboxFilter === "instagram"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => setInboxFilter("youtube")}
                    className={`p-1 rounded transition-colors ${
                      inboxFilter === "youtube"
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Youtube
                      className={`w-4 h-4 ${
                        inboxFilter === "youtube"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full p-3 border-b border-border hover:bg-muted transition-colors text-left ${
                      selectedMessage.id === msg.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={msg.avatar}
                          alt={msg.creator}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <msg.platform className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            {msg.creator}
                          </span>
                          {msg.unread && (
                            <span className="w-2 h-2 bg-[#2563eb] rounded-full" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {msg.preview}
                        </p>
                        <span className="text-xs text-muted-foreground font-mono mt-1 block">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Draft Area */}
            <div className="bg-card rounded-lg border border-border p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
                <h3 className="text-sm font-semibold">AI Agent Draft</h3>
              </div>
              {aiDraftApproved ? (
                <div className="bg-gradient-to-br from-[#10b981]/10 to-[#10b981]/5 rounded-lg border border-[#10b981]/30 p-4 mb-3 text-center">
                  <div className="w-12 h-12 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ThumbsUp className="w-6 h-6 text-[#10b981]" />
                  </div>
                  <p className="text-sm font-medium mb-1">
                    Message sent successfully!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    The creator will be notified of your counter-offer.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-[#8b5cf6]/10 to-[#8b5cf6]/5 rounded-lg border border-[#8b5cf6]/30 p-3 mb-3 flex-1">
                    <textarea
                      value={aiDraftMessage}
                      onChange={(e) => setAiDraftMessage(e.target.value)}
                      className="w-full h-64 bg-transparent border-none outline-none resize-none text-sm leading-relaxed focus:ring-0"
                      placeholder="AI-generated message will appear here..."
                    />
                  </div>
                  <button
                    onClick={() => setAiDraftApproved(true)}
                    className="w-full px-3 py-2 bg-[#8b5cf6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </>
              )}
              {aiDraftApproved && (
                <button
                  onClick={() => setAiDraftApproved(false)}
                  className="text-xs text-[#8b5cf6] hover:underline"
                >
                  Draft Another Message
                </button>
              )}
            </div>

            {/* Playbook Builder */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold mb-3">Playbook Builder</h3>
              {playbookCreated ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ThumbsUp className="w-6 h-6 text-[#10b981]" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">
                    Playbook Created!
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Your negotiation rules have been saved
                  </p>
                  <button
                    onClick={() => setPlaybookCreated(false)}
                    className="text-xs text-primary hover:underline"
                  >
                    Create Another
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">
                      Max Budget Cap
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono font-medium w-20 text-right">
                        ${maxBudget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">
                      Exclusivity Period
                    </label>
                    <select
                      value={playbookExclusivity}
                      onChange={(e) => setPlaybookExclusivity(e.target.value)}
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    >
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>No exclusivity</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setPlaybookCreated(true)}
                    className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Create Playbook
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
