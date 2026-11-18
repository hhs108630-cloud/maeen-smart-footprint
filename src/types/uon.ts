export type Language = 'ar' | 'en';

export interface BilingualText {
  ar: string;
  en: string;
}

export type ClusterId =
  | 'cognitive'
  | 'leadership'
  | 'communication'
  | 'digital';

export interface CompetencyCluster {
  id: ClusterId;
  name: BilingualText;
  description: BilingualText;
  color: string;
}

export interface RubricLevel {
  level: 1 | 2 | 3 | 4;
  title: BilingualText;
  descriptor: BilingualText;
}

export interface JourneyMilestone {
  stage: 'general' | 'major' | 'capstone';
  stageLabel: BilingualText;
  description: BilingualText;
}

export interface SkillDefinition {
  id: string;
  number: number;
  clusterId: ClusterId;
  name: BilingualText;
  shortName: BilingualText;
  isPriorityP: boolean; // Oman National Framework for Future Skills 2021
  initialScore: number;
  oqfBenchmark: number;
  wefTarget: number;
  behavioralDefinition: BilingualText;
  uonGraduateAttributes: BilingualText[];
  wefAlignment: BilingualText;
  rubric: RubricLevel[];
  journeyMilestones: JourneyMilestone[];
  badgeTitle: BilingualText;
}

export type QuestCategory = 'curricular' | 'co_curricular' | 'corporate';

export interface Quest {
  id: string;
  title: BilingualText;
  description: BilingualText;
  category: QuestCategory;
  partnerOrCourse: BilingualText;
  xpReward: number;
  hoursAwarded?: number;
  skillImpacts: Record<string, number>; // skillId -> points added (e.g., +6)
  deadline: BilingualText;
  difficulty: 'standard' | 'advanced' | 'flagship';
  completed: boolean;
  evidenceSubmitted?: {
    fileName: string;
    reflection: string;
    verifiedAt: string;
    hash: string;
  };
}

export interface PerkItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  costGems: number;
  category: BilingualText;
  provider: BilingualText;
  redeemed: boolean;
}

export interface TierInfo {
  id: 'explorer' | 'practitioner' | 'innovator' | 'fellow';
  name: BilingualText;
  minXp: number;
  maxXp: number | null;
  privilege: BilingualText;
}

export interface UniversityPartner {
  id: string;
  name: BilingualText;
  country: BilingualText;
  scope: 'local' | 'global';
  code: string;
}

export type CourseProviderType = 'nizwa_academy' | 'smart_platform' | 'university';

export type CourseDeliveryMode = 'in_person' | 'live_online' | 'recorded' | 'hybrid';

export interface TrainingCourse {
  id: string;
  title: BilingualText;
  description: BilingualText;
  providerType: CourseProviderType;
  providerName: BilingualText;
  deliveryMode: CourseDeliveryMode;
  locationOrLink: BilingualText;
  scheduleDate: BilingualText;
  durationHours: number;
  xpReward: number;
  originalCostGems: number; // Original value in Gems (1 Gem ≈ 1 OMR)
  maeenSupportPercent: number; // Endowment subsidy % (e.g., 5%)
  costGems: number; // Final cost after Maeen Endowment subsidy
  status: 'approved' | 'pending';
  skillImpacts: Record<string, number>;
  format: BilingualText;
  priceLabel: BilingualText;
  completed?: boolean;
}

export interface GemPack {
  id: string;
  gems: number;
  priceOmr: number;
  label: BilingualText;
  savingsLabel?: BilingualText;
}

export interface StudentProfile {
  id: string;
  accountType: 'student' | 'public';
  subscriptionStatus: 'active_5_omr' | 'public_guest';
  universityId: string;
  universityName: BilingualText;
  name: BilingualText;
  major: BilingualText;
  college: BilingualText;
  gpa: number;
  graduationYear: number;
  tierXp: number;
  semesterXp: number;
  redeemableXp: number;
  gemsBalance: number;
  totalGemsEarned: number;
  volunteeringHours: number;
  leadershipHours: number;
  avatarInitials: string;
  blockchainDid: string;
}

export interface StudentAccountRecord {
  profile: StudentProfile;
  skillScores: Record<string, number>;
  completedQuestIds: string[];
  completedCourseIds: string[];
  redeemedPerkIds: string[];
}

export interface CandidateProfile {
  id: string;
  universityId: string;
  universityName: BilingualText;
  name: BilingualText;
  college: BilingualText;
  major: BilingualText;
  gpa: number;
  tierXp: number;
  tierId: TierInfo['id'];
  skills: Record<string, number>;
  completedBounties: BilingualText[];
  verifiedArtifacts: { title: BilingualText; issuer: BilingualText; hash: string }[];
  invited?: boolean;
}

export type ActiveTab =
  | 'dashboard'
  | 'skills'
  | 'academy'
  | 'diploma'
  | 'employer'
  | 'governance';
