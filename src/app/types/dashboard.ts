import type { LucideIcon } from "lucide-react";

export type SparklinePoint = {
  day: number;
  value: number;
};

export type DealTerm = {
  label: string;
  value: string;
  status: "good" | "warning" | "missing";
};

export type DealHistoryItem = {
  brand: string;
  date: string;
  scope: string;
  value: string;
  lift: string;
};

export type TalentHandle = {
  platform: string;
  handle: string;
  icon: LucideIcon;
};

export type ConnectedAccount = {
  platform: string;
  handle: string;
  followers: string;
  gradient: string;
};

export type TalentDeal = {
  id: number;
  name: string;
  avatar: string;
  handles: TalentHandle[];
  engagement: SparklinePoint[];
  followers: string;
  avgEngagement: string;
  bio: string;
  connectedAccounts: ConnectedAccount[];
  basePrice: number;
  engagementRate: number;
  viewsBase: number;
  brand: string;
  brandAvatar: string;
  brandContact: string;
  campaign: string;
  stage: "Inbound" | "Reviewing" | "Countered" | "Legal Review" | "Closing";
  currentOffer: number;
  recommendedCounter: number;
  floorPrice: number;
  responseDue: string;
  actionStatus: "Action Needed" | "Pending";
  riskFlags: string[];
  deliverables: string;
  usageRights: string;
  exclusivity: string;
  paymentTerms: string;
  timeline: string;
  aiStrategy: string;
  terms: DealTerm[];
  dealHistory: DealHistoryItem[];
};

export type InboxConversation = {
  id: number;
  senderName: string;
  senderType: "Brand" | "Influencer";
  brand: string;
  talentName: string;
  platform: LucideIcon;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
  type: "offer" | "counter" | "legal" | "talent";
};
