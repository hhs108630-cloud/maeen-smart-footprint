import {
  CandidateProfile,
  CompetencyCluster,
  GemPack,
  PerkItem,
  Quest,
  SkillDefinition,
  StudentAccountRecord,
  StudentProfile,
  TierInfo,
  TrainingCourse,
  UniversityPartner,
} from '../types/uon';

export const TIERS: TierInfo[] = [
  {
    id: 'explorer',
    name: { ar: 'مستكشف', en: 'Explorer' },
    minXp: 0,
    maxXp: 999,
    privilege: {
      ar: 'الوصول إلى مهام التوجيه الأكاديمي والأنشطة التأسيسية',
      en: 'Access to academic orientation quests & foundational activities',
    },
  },
  {
    id: 'practitioner',
    name: { ar: 'ممارس', en: 'Practitioner' },
    minXp: 1000,
    maxXp: 1999,
    privilege: {
      ar: 'إصدار شارات الكفاءة الرقمية المفتوحة Open Badges 3.0',
      en: 'Unlock verified Open Badges 3.0 digital credentials',
    },
  },
  {
    id: 'innovator',
    name: { ar: 'مبادر', en: 'Innovator' },
    minXp: 2000,
    maxXp: 2999,
    privilege: {
      ar: 'أولوية المشاركة في تحديات الشركات العُمانية ومختبرات الابتكار',
      en: 'Priority entry to Omani corporate bounties & innovation labs',
    },
  },
  {
    id: 'fellow',
    name: { ar: 'سفير نزوى', en: 'Nizwa Fellow' },
    minXp: 3000,
    maxXp: null,
    privilege: {
      ar: 'الختم الذهبي على شهادة التخرج + ترشيح مباشر للتوظيف السريع VIP',
      en: 'Gold Seal on Graduation Diploma + VIP Fast-Track Recruitment',
    },
  },
];

export function getTierForXp(xp: number): TierInfo {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (xp >= TIERS[i].minXp) return TIERS[i];
  }
  return TIERS[0];
}

export const UNIVERSITIES: UniversityPartner[] = [
  {
    id: 'uon',
    name: { ar: 'جامعة نزوى', en: 'University of Nizwa' },
    country: { ar: 'سلطنة عُمان', en: 'Sultanate of Oman' },
    scope: 'local',
    code: 'UoN',
  },
  {
    id: 'squ',
    name: { ar: 'جامعة السلطان قابوس', en: 'Sultan Qaboos University' },
    country: { ar: 'سلطنة عُمان', en: 'Sultanate of Oman' },
    scope: 'local',
    code: 'SQU',
  },
  {
    id: 'gutech',
    name: { ar: 'الجامعة الألمانية للتكنولوجيا (GUtech)', en: 'GUtech Oman' },
    country: { ar: 'سلطنة عُمان', en: 'Sultanate of Oman' },
    scope: 'local',
    code: 'GUtech',
  },
  {
    id: 'su',
    name: { ar: 'جامعة صحار', en: 'Sohar University' },
    country: { ar: 'سلطنة عُمان', en: 'Sultanate of Oman' },
    scope: 'local',
    code: 'SU',
  },
  {
    id: 'um',
    name: { ar: 'جامعة مالايا (شريك دولي)', en: 'Universiti Malaya (Global Partner)' },
    country: { ar: 'ماليزيا', en: 'Malaysia' },
    scope: 'global',
    code: 'UM',
  },
  {
    id: 'uoe',
    name: { ar: 'جامعة إدنبرة (شريك دولي)', en: 'University of Edinburgh (Global Partner)' },
    country: { ar: 'المملكة المتحدة', en: 'United Kingdom' },
    scope: 'global',
    code: 'UoE',
  },
];

export const INITIAL_STUDENT: StudentProfile = {
  id: '202210482',
  accountType: 'student',
  subscriptionStatus: 'active_5_omr',
  universityId: 'uon',
  universityName: { ar: 'جامعة نزوى', en: 'University of Nizwa' },
  name: {
    ar: 'أحمد بن سالم الهنائي',
    en: 'Ahmed bin Salim Al-Hinai',
  },
  major: {
    ar: 'هندسة البرمجيات',
    en: 'Software Engineering',
  },
  college: {
    ar: 'كلية الهندسة والعمارة',
    en: 'College of Engineering & Architecture',
  },
  gpa: 3.68,
  graduationYear: 2026,
  tierXp: 2450,
  semesterXp: 2450,
  redeemableXp: 1450,
  gemsBalance: 29,
  totalGemsEarned: 49,
  volunteeringHours: 42,
  leadershipHours: 28,
  avatarInitials: 'أه',
  blockchainDid: 'did:uon:oman:202210482:9f4a8c12e7',
};

export const INITIAL_ACCOUNTS: StudentAccountRecord[] = [
  {
    profile: INITIAL_STUDENT,
    skillScores: {
      critical_thinking: 84,
      problem_solving: 82,
      creativity: 78,
      leadership: 79,
      proactivity: 81,
      teamwork: 86,
      communication: 80,
      social_skills: 77,
      resilience: 75,
      digital_literacy: 91,
      productivity: 83,
    },
    completedQuestIds: [],
    completedCourseIds: [],
    redeemedPerkIds: [],
  },
  {
    profile: {
      id: '202320115',
      accountType: 'student',
      subscriptionStatus: 'active_5_omr',
      universityId: 'squ',
      universityName: { ar: 'جامعة السلطان قابوس', en: 'Sultan Qaboos University' },
      name: { ar: 'سارة بنت محمد البلوشية', en: 'Sara bint Mohammed Al-Balushi' },
      major: { ar: 'الذكاء الاصطناعي وعلوم البيانات', en: 'AI & Data Science' },
      college: { ar: 'كلية العلوم', en: 'College of Science' },
      gpa: 3.84,
      graduationYear: 2026,
      tierXp: 2720,
      semesterXp: 2720,
      redeemableXp: 1620,
      gemsBalance: 34,
      totalGemsEarned: 54,
      volunteeringHours: 36,
      leadershipHours: 30,
      avatarInitials: 'سب',
      blockchainDid: 'did:squ:oman:202320115:3c8e9a01b2',
    },
    skillScores: {
      critical_thinking: 88,
      problem_solving: 87,
      creativity: 85,
      leadership: 81,
      proactivity: 84,
      teamwork: 85,
      communication: 83,
      social_skills: 80,
      resilience: 82,
      digital_literacy: 94,
      productivity: 86,
    },
    completedQuestIds: [],
    completedCourseIds: [],
    redeemedPerkIds: [],
  },
  {
    profile: {
      id: 'public-guest',
      accountType: 'public',
      subscriptionStatus: 'public_guest',
      universityId: 'uon',
      universityName: { ar: 'الحساب العام (استكشاف المنصة)', en: 'Public Explorer Account' },
      name: { ar: 'زائر عام — وضع الاستكشاف', en: 'Public Guest — Explorer Mode' },
      major: { ar: 'استعراض مسارات المهارات والدورات', en: 'Exploring Skills & Courses' },
      college: { ar: 'مفتوح للجامعات والأفراد (5 ر.ع/سنة)', en: 'Open to Universities & Students (5 OMR/yr)' },
      gpa: 0.0,
      graduationYear: 2026,
      tierXp: 450,
      semesterXp: 450,
      redeemableXp: 450,
      gemsBalance: 9,
      totalGemsEarned: 9,
      volunteeringHours: 10,
      leadershipHours: 5,
      avatarInitials: 'عا',
      blockchainDid: 'did:footprint:public:guest-explorer',
    },
    skillScores: {
      critical_thinking: 65,
      problem_solving: 64,
      creativity: 62,
      leadership: 60,
      proactivity: 63,
      teamwork: 68,
      communication: 66,
      social_skills: 64,
      resilience: 61,
      digital_literacy: 70,
      productivity: 65,
    },
    completedQuestIds: [],
    completedCourseIds: [],
    redeemedPerkIds: [],
  },
];

export const GEM_PACKS: GemPack[] = [
  {
    id: 'gem-10',
    gems: 10,
    priceOmr: 10,
    label: { ar: 'باقة البداية', en: 'Starter Pack' },
  },
  {
    id: 'gem-30',
    gems: 30,
    priceOmr: 25,
    label: { ar: 'باقة التوفير', en: 'Value Pack' },
    savingsLabel: { ar: 'توفير 5 ر.ع', en: 'Save 5 OMR' },
  },
  {
    id: 'gem-50',
    gems: 50,
    priceOmr: 40,
    label: { ar: 'باقة التميز', en: 'Pro Pack' },
    savingsLabel: { ar: 'توفير 10 ر.ع', en: 'Save 10 OMR' },
  },
];

export const INITIAL_COURSES: TrainingCourse[] = [
  {
    id: 'crs-acad-lead-100',
    title: {
      ar: 'دورة القيادة في المؤسسات والعمل التنفيذي',
      en: 'Institutional Leadership & Executive Management',
    },
    description: {
      ar: 'برنامج احترافي معتمد من أكاديمية نزوى للتدريب والتطوير (قيمته السوقية 100 ر.ع = 100 جوهرة) لتأهيل القادة في المؤسسات.',
      en: 'Accredited executive program by Nizwa Training Academy (Market Value 100 OMR = 100 Gems).',
    },
    providerType: 'nizwa_academy',
    providerName: {
      ar: 'أكاديمية نزوى للتدريب والتطوير',
      en: 'Nizwa Academy for Training & Development',
    },
    deliveryMode: 'hybrid',
    locationOrLink: {
      ar: 'مقر أكاديمية نزوى + بث تفاعلي',
      en: 'Nizwa Academy Campus + Live Stream',
    },
    scheduleDate: { ar: '15–20 ديسمبر 2026', en: 'Dec 15–20, 2026' },
    durationHours: 30,
    xpReward: 400,
    originalCostGems: 100,
    maeenSupportPercent: 5,
    costGems: 95,
    status: 'approved',
    skillImpacts: { leadership: 7, critical_thinking: 5, communication: 4 },
    format: { ar: 'مدمج (حضوري + عن بُعد)', en: 'Hybrid' },
    priceLabel: { ar: '95 💎 (بعد دعم 5%)', en: '95 💎 (5% Maeen Support)' },
  },
  {
    id: 'crs-acad-2',
    title: {
      ar: 'هندسة الأوامر والذكاء الاصطناعي التوليدي في بيئة الأعمال',
      en: 'Prompt Engineering & Generative AI for Business',
    },
    description: {
      ar: 'ورشة تطبيقية من أكاديمية نزوى لتأهيل الطلبة في توظيف أدوات الذكاء الاصطناعي لرفع الإنتاجية وحل المشكلات.',
      en: 'Applied workshop by Nizwa Academy equipping students to leverage AI tools for productivity and problem solving.',
    },
    providerType: 'nizwa_academy',
    providerName: {
      ar: 'أكاديمية نزوى للتدريب والتطوير',
      en: 'Nizwa Academy for Training & Development',
    },
    deliveryMode: 'live_online',
    locationOrLink: { ar: 'عن بُعد (بث مباشر)', en: 'Live Online Classroom' },
    scheduleDate: { ar: '5–8 يناير 2027', en: 'Jan 5–8, 2027' },
    durationHours: 12,
    xpReward: 220,
    originalCostGems: 20,
    maeenSupportPercent: 10,
    costGems: 18,
    status: 'approved',
    skillImpacts: { digital_literacy: 5, productivity: 4, creativity: 4 },
    format: { ar: 'تفاعلي عن بُعد', en: 'Live Online' },
    priceLabel: { ar: '18 💎 (بعد دعم 10%)', en: '18 💎 (10% Maeen Support)' },
  },
  {
    id: 'crs-plat-1',
    title: {
      ar: 'مسار الجاهزية لسوق العمل العُماني والعالمي 2030',
      en: 'Oman & Global Labor Market 2030 Readiness Track',
    },
    description: {
      ar: 'دورة رقمية مسجلة مجانية للطلبة لتطوير المرونة المهنية، الاستباقية، وإدارة المشاريع الرشيقة.',
      en: 'Free recorded digital course developing resilience, proactivity, and agile workflows.',
    },
    providerType: 'smart_platform',
    providerName: {
      ar: 'منصة بصمة معين الذكية',
      en: 'Maeen Smart Footprint',
    },
    deliveryMode: 'recorded',
    locationOrLink: { ar: 'مسجلة عبر المنصة (24/7)', en: 'Recorded On-Demand (24/7)' },
    scheduleDate: { ar: 'متاح طوال العام', en: 'Available Year-Round' },
    durationHours: 10,
    xpReward: 180,
    originalCostGems: 0,
    maeenSupportPercent: 0,
    costGems: 0,
    status: 'approved',
    skillImpacts: { resilience: 5, proactivity: 4, teamwork: 3 },
    format: { ar: 'دورة مسجلة', en: 'Recorded' },
    priceLabel: { ar: 'مجانية (0 💎)', en: 'Free (0 💎)' },
  },
  {
    id: 'crs-uni-1',
    title: {
      ar: 'مختبر الابتكار وريادة الأعمال الجامعية (ENTR 201)',
      en: 'University Innovation & Entrepreneurship Lab (ENTR 201)',
    },
    description: {
      ar: 'مساق وتدريب عملي حضوري مجاني مقدم من جامعة نزوى والجامعات المتعاونة لتحويل الأفكار البحثية إلى نماذج أعمال.',
      en: 'Free on-campus practical course offered by partner universities transforming research ideas into business models.',
    },
    providerType: 'university',
    providerName: {
      ar: 'جامعة نزوى والجامعات المتعاونة',
      en: 'University of Nizwa & Partner Universities',
    },
    deliveryMode: 'in_person',
    locationOrLink: { ar: 'حاضنة ريادة الأعمال - الحرم الجامعي', en: 'Campus Incubator Lab' },
    scheduleDate: { ar: 'الفصل الربيعي 2027', en: 'Spring Semester 2027' },
    durationHours: 24,
    xpReward: 280,
    originalCostGems: 0,
    maeenSupportPercent: 0,
    costGems: 0,
    status: 'approved',
    skillImpacts: { creativity: 6, problem_solving: 4, social_skills: 3 },
    format: { ar: 'حضوري - مختبر', en: 'In-Person Lab' },
    priceLabel: { ar: 'مجانية (0 💎)', en: 'Free (0 💎)' },
  },
  {
    id: 'crs-cyber-36',
    title: {
      ar: 'الأمن السيبراني وحماية البنية الرقمية للمؤسسات',
      en: 'Cybersecurity & Enterprise Digital Infrastructure Protection',
    },
    description: {
      ar: 'دورة تطبيقية مسجلة تغطي أساسيات أمن الشبكات، تقييم الثغرات، وحوكمة البيانات وفق معايير المركز الوطني للسلامة المعلوماتية.',
      en: 'Recorded applied course covering network security, vulnerability assessment, and data governance.',
    },
    providerType: 'nizwa_academy',
    providerName: {
      ar: 'أكاديمية نزوى للتدريب والتطوير',
      en: 'Nizwa Academy for Training & Development',
    },
    deliveryMode: 'recorded',
    locationOrLink: { ar: 'مسجلة عبر المنصة (24/7)', en: 'Recorded On-Demand (24/7)' },
    scheduleDate: { ar: 'متاح طوال العام', en: 'Available Year-Round' },
    durationHours: 20,
    xpReward: 260,
    originalCostGems: 40,
    maeenSupportPercent: 10,
    costGems: 36,
    status: 'approved',
    skillImpacts: { digital_literacy: 6, problem_solving: 5, critical_thinking: 4 },
    format: { ar: 'دورة مسجلة', en: 'Recorded' },
    priceLabel: { ar: '36 💎 (بعد دعم 10%)', en: '36 💎 (10% Maeen Support)' },
  },
  {
    id: 'crs-comm-12',
    title: {
      ar: 'مهارات التواصل الإقناعي والعرض التنفيذي باللغتين',
      en: 'Persuasive Communication & Bilingual Executive Pitching',
    },
    description: {
      ar: 'تدريب حضوري تفاعلي لصقل مهارات الخطابة، كتابة التقارير التنفيذية، وإقناع لجان التوظيف والمستثمرين.',
      en: 'Interactive in-person workshop sharpening public speaking, executive reporting, and stakeholder pitching.',
    },
    providerType: 'university',
    providerName: {
      ar: 'جامعة نزوى والجامعات المتعاونة',
      en: 'University of Nizwa & Partner Universities',
    },
    deliveryMode: 'in_person',
    locationOrLink: { ar: 'قاعة الندوات - الحرم الجامعي', en: 'Campus Seminar Hall' },
    scheduleDate: { ar: '2–4 فبراير 2027', en: 'Feb 2–4, 2027' },
    durationHours: 14,
    xpReward: 190,
    originalCostGems: 15,
    maeenSupportPercent: 20,
    costGems: 12,
    status: 'approved',
    skillImpacts: { communication: 6, social_skills: 5, leadership: 3 },
    format: { ar: 'حضوري', en: 'In-Person' },
    priceLabel: { ar: '12 💎 (بعد دعم 20%)', en: '12 💎 (20% Maeen Support)' },
  },
  {
    id: 'crs-resil-29',
    title: {
      ar: 'إدارة الأزمات والمرونة المهنية في بيئة العمل المتغيرة',
      en: 'Crisis Management & Professional Agility in Dynamic Workplaces',
    },
    description: {
      ar: 'برنامج مباشر عن بُعد لبناء الصمود النفسي والمهني، اتخاذ القرار تحت الضغط، وقيادة التغيير داخل الفرق.',
      en: 'Live online program building mental resilience, decision-making under pressure, and agile team adaptation.',
    },
    providerType: 'smart_platform',
    providerName: {
      ar: 'منصة بصمة معين الذكية',
      en: 'Maeen Smart Footprint',
    },
    deliveryMode: 'live_online',
    locationOrLink: { ar: 'عن بُعد (بث مباشر تفاعلي)', en: 'Live Online Interactive' },
    scheduleDate: { ar: '18–20 فبراير 2027', en: 'Feb 18–20, 2027' },
    durationHours: 12,
    xpReward: 210,
    originalCostGems: 30,
    maeenSupportPercent: 5,
    costGems: 29,
    status: 'approved',
    skillImpacts: { resilience: 7, teamwork: 4, proactivity: 4 },
    format: { ar: 'تفاعلي عن بُعد', en: 'Live Online' },
    priceLabel: { ar: '29 💎 (بعد دعم 5%)', en: '29 💎 (5% Maeen Support)' },
  },
  {
    id: 'crs-prod-free',
    title: {
      ar: 'إدارة الوقت والإنتاجية الذكية باستخدام أدوات الذكاء الاصطناعي',
      en: 'Smart Time Management & AI-Powered Productivity',
    },
    description: {
      ar: 'دورة مسجلة مجانية لطلبة المنصة لتطبيق منهجيات تنظيم الأولويات وأتمتة المهام الدراسية والمهنية.',
      en: 'Free recorded course for subscribers covering prioritization frameworks and workflow automation.',
    },
    providerType: 'smart_platform',
    providerName: {
      ar: 'منصة بصمة معين الذكية',
      en: 'Maeen Smart Footprint',
    },
    deliveryMode: 'recorded',
    locationOrLink: { ar: 'مسجلة عبر المنصة (24/7)', en: 'Recorded On-Demand (24/7)' },
    scheduleDate: { ar: 'متاح طوال العام', en: 'Available Year-Round' },
    durationHours: 8,
    xpReward: 150,
    originalCostGems: 0,
    maeenSupportPercent: 0,
    costGems: 0,
    status: 'approved',
    skillImpacts: { productivity: 7, digital_literacy: 3 },
    format: { ar: 'دورة مسجلة', en: 'Recorded' },
    priceLabel: { ar: 'مجانية (0 💎)', en: 'Free (0 💎)' },
  },
  {
    id: 'crs-energy-45',
    title: {
      ar: 'التفكير النقدي وحل المشكلات المعقدة في قطاع الطاقة والصناعة',
      en: 'Critical Thinking & Complex Problem Solving in Energy & Industry',
    },
    description: {
      ar: 'برنامج تطبيقي مدمج يركز على تحليل المعضلات التشغيلية والصناعية وبناء حلول هندسية وإدارية مستدامة.',
      en: 'Hybrid applied program focusing on operational diagnostics and sustainable engineering/management solutions.',
    },
    providerType: 'nizwa_academy',
    providerName: {
      ar: 'أكاديمية نزوى للتدريب والتطوير',
      en: 'Nizwa Academy for Training & Development',
    },
    deliveryMode: 'hybrid',
    locationOrLink: {
      ar: 'مركز التدريب الهندسي + بث مباشر',
      en: 'Engineering Center + Live Stream',
    },
    scheduleDate: { ar: '1–5 مارس 2027', en: 'Mar 1–5, 2027' },
    durationHours: 22,
    xpReward: 300,
    originalCostGems: 50,
    maeenSupportPercent: 10,
    costGems: 45,
    status: 'approved',
    skillImpacts: { critical_thinking: 6, problem_solving: 6, teamwork: 4 },
    format: { ar: 'مدمج (حضوري + عن بُعد)', en: 'Hybrid' },
    priceLabel: { ar: '45 💎 (بعد دعم 10%)', en: '45 💎 (10% Maeen Support)' },
  },
  {
    id: 'crs-esg-free',
    title: {
      ar: 'أساسيات التمويل الإسلامي المستدام والريادة المجتمعية',
      en: 'Sustainable Islamic Finance & Social Entrepreneurship',
    },
    description: {
      ar: 'ورشة تفاعلية مجانية عن بُعد تربط مفاهيم الاقتصاد الوقفي والتمويل الأخضر بمهارات المبادرة والتأثير الاجتماعي.',
      en: 'Free live online workshop connecting endowment economics and green finance with proactivity and social impact.',
    },
    providerType: 'university',
    providerName: {
      ar: 'جامعة نزوى والجامعات المتعاونة',
      en: 'University of Nizwa & Partner Universities',
    },
    deliveryMode: 'live_online',
    locationOrLink: { ar: 'عن بُعد (بث مباشر تفاعلي)', en: 'Live Online Interactive' },
    scheduleDate: { ar: '12–14 مارس 2027', en: 'Mar 12–14, 2027' },
    durationHours: 10,
    xpReward: 170,
    originalCostGems: 0,
    maeenSupportPercent: 0,
    costGems: 0,
    status: 'approved',
    skillImpacts: { proactivity: 6, social_skills: 5, critical_thinking: 3 },
    format: { ar: 'تفاعلي عن بُعد', en: 'Live Online' },
    priceLabel: { ar: 'مجانية (0 💎)', en: 'Free (0 💎)' },
  },
  {
    id: 'crs-pending-1',
    title: {
      ar: 'تحليل البيانات المالية والامتثال باستخدام Power BI',
      en: 'Financial Data Analytics & Compliance with Power BI',
    },
    description: {
      ar: 'طلب دورة مقدم من معهد التدريب المالي؛ بانتظار اعتماد مؤسسة معين الوقفية لتحديد النقاط والجواهر ونسبة الدعم.',
      en: 'Course submitted by Financial Training Institute; awaiting Maeen Endowment approval for XP, Gems & subsidy.',
    },
    providerType: 'nizwa_academy',
    providerName: {
      ar: 'معهد عُمان للتمويل والتدريب (جهة متعاونة)',
      en: 'Oman Finance Training Institute',
    },
    deliveryMode: 'live_online',
    locationOrLink: { ar: 'عن بُعد (Zoom + مختبر سحابي)', en: 'Live Online + Cloud Lab' },
    scheduleDate: { ar: '22–26 يناير 2027', en: 'Jan 22–26, 2027' },
    durationHours: 16,
    xpReward: 0,
    originalCostGems: 60,
    maeenSupportPercent: 0,
    costGems: 60,
    status: 'pending',
    skillImpacts: { critical_thinking: 5, digital_literacy: 5, problem_solving: 4 },
    format: { ar: 'تفاعلي عن بُعد', en: 'Live Online' },
    priceLabel: { ar: 'بانتظار اعتماد معين', en: 'Pending Maeen Approval' },
  },
];

export const CLUSTERS: CompetencyCluster[] = [
  {
    id: 'cognitive',
    name: {
      ar: 'التفكير والابتكار',
      en: 'Cognitive & Innovation',
    },
    description: {
      ar: 'توظيف التحليل المنطقي والمنهجيات الإبداعية لحل التحديات المعقدة في بيئة العمل.',
      en: 'Applying logical analysis and creative methodologies to solve complex workplace challenges.',
    },
    color: '#0F3D3E',
  },
  {
    id: 'leadership',
    name: {
      ar: 'الريادة والتأثير الاجتماعي',
      en: 'Leadership & Social Impact',
    },
    description: {
      ar: 'قيادة الفرق بفاعلية، أخذ زمام المبادرة، وتعزيز الأثر المجتمعي المستدام.',
      en: 'Leading teams effectively, taking initiative, and driving sustainable community impact.',
    },
    color: '#C59B27',
  },
  {
    id: 'communication',
    name: {
      ar: 'التواصل والمرونة الشخصية',
      en: 'Communication & Agility',
    },
    description: {
      ar: 'التواصل المهني المقنع، بناء الشبكات الاجتماعية، والتكيف المرن مع المتغيرات.',
      en: 'Persuasive professional communication, social intelligence, and agile adaptation.',
    },
    color: '#1E6B52',
  },
  {
    id: 'digital',
    name: {
      ar: 'الإتقان الرقمي والإنتاجية',
      en: 'Digital & Execution Mastery',
    },
    description: {
      ar: 'استثمار التقنيات الناشئة والبيانات، وإدارة الوقت والموارد لتحقيق أعلى إنتاجية.',
      en: 'Leveraging emerging tech & data while managing time and resources for peak execution.',
    },
    color: '#2B5B84',
  },
];

export const SKILLS_DATA: SkillDefinition[] = [
  {
    id: 'critical_thinking',
    number: 1,
    clusterId: 'cognitive',
    name: { ar: 'التفكير الناقد', en: 'Critical Thinking' },
    shortName: { ar: 'التفكير الناقد', en: 'Critical Thinking' },
    isPriorityP: true,
    initialScore: 84,
    oqfBenchmark: 75,
    wefTarget: 88,
    behavioralDefinition: {
      ar: 'القدرة على تحليل الحجج والأدلة بموضوعية، وتقييم الافتراضات والمصادر، واستخلاص استنتاجات منطقية مدعومة بالبيانات قبل اتخاذ القرار.',
      en: 'Objectively analyzing evidence and arguments, evaluating assumptions and sources, and synthesizing data-backed logical conclusions prior to decision-making.',
    },
    uonGraduateAttributes: [
      { ar: 'المعرفة التخصصية العميقة والتحليل العلمي', en: 'Deep Disciplinary Knowledge & Inquiry' },
      { ar: 'المسؤولية الأخلاقية والنزاهة المهنية', en: 'Ethical Responsibility & Integrity' },
    ],
    wefAlignment: {
      ar: 'المهارة #1 الأكثر طلباً في تقرير مستقبل الوظائف WEF 2030 (Analytical & Critical Thinking).',
      en: '#1 most demanded core skill in WEF Future of Jobs 2030 (Analytical & Critical Thinking).',
    },
    badgeTitle: { ar: 'محلل استراتيجي معتمد', en: 'Certified Strategic Analyst' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: {
          ar: 'يحدد المشكلة السطحية ويعتمد على مصادر محدودة دون فحص الافتراضات.',
          en: 'Identifies surface issues relying on limited sources without questioning assumptions.',
        },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: {
          ar: 'يقارن بين وجهات النظر المختلفة ويميز بين الحقائق والآراء في سياقات مألوفة.',
          en: 'Compares multiple viewpoints and distinguishes facts from opinions in familiar contexts.',
        },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: {
          ar: 'يفكك القضايا المركبة، يزن الأدلة المتعارضة، ويصيغ موقفاً منطقياً متماسكاً.',
          en: 'Deconstructs complex issues, weighs conflicting evidence, and forms coherent logic.',
        },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: {
          ar: 'يبتكر أطراً تحليلية شاملة تربط السياق المحلي بالمعايير العالمية مع تقييم المخاطر والبدائل.',
          en: 'Synthesizes comprehensive analytical frameworks linking local context to global benchmarks with risk evaluation.',
        },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'مساق مهارات التفكير والبحث العلمي (UNIV 101)', en: 'Critical Inquiry & Research Methods (UNIV 101)' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'تحليل النظم وهندسة المتطلبات البرمجية', en: 'Systems Analysis & Software Requirements Engineering' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'تقييم المعمارية التقنية في مشاريع الشركاء الصناعيين', en: 'Technical architecture audit in industry partner capstone' },
      },
    ],
  },
  {
    id: 'problem_solving',
    number: 2,
    clusterId: 'cognitive',
    name: { ar: 'حل المشكلات', en: 'Problem Solving' },
    shortName: { ar: 'حل المشكلات', en: 'Problem Solving' },
    isPriorityP: true,
    initialScore: 82,
    oqfBenchmark: 74,
    wefTarget: 86,
    behavioralDefinition: {
      ar: 'تشخيص التحديات الواقعية بدقة، وتوليد بدائل حلول عملية قابلة للتطبيق، وقياس أثرها التشغيلي والمالي.',
      en: 'Accurately diagnosing real-world challenges, generating viable solution alternatives, and measuring operational and financial impact.',
    },
    uonGraduateAttributes: [
      { ar: 'الكفاءة التطبيقية وحل المعضلات', en: 'Applied Competence & Complex Problem Solving' },
      { ar: 'الاستدامة وخدمة التنمية الوطنية', en: 'Sustainability & National Development' },
    ],
    wefAlignment: {
      ar: 'متوافق مع مهارات Complex Problem-Solving في رؤية عُمان 2040 و WEF 2030.',
      en: 'Aligned with Complex Problem-Solving in Oman Vision 2040 & WEF 2030.',
    },
    badgeTitle: { ar: 'مهندس الحلول الذكية', en: 'Smart Solutions Architect' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'يطبق حلولاً تقليدية مباشرة للمشكلات الروتينية.', en: 'Applies standard direct fixes to routine problems.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'يحدد الأسباب الجذرية ويقترح أكثر من بديل عملي.', en: 'Identifies root causes and proposes multiple practical alternatives.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يصمم حلولاً منهجية تراعي القيود التقنية والميزانية والجدول الزمني.', en: 'Designs systematic solutions balancing technical, budget, and timeline constraints.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'يقود معالجة تحديات صناعية مفتوحة النهايات بنتائج قابلة للقياس والتحقق.', en: 'Leads resolution of open-ended industry challenges with measurable verified outcomes.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'مختبر التفكير التصميمي لخدمة المجتمع', en: 'Community Design Thinking Lab' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'تطوير الخوارزميات وهياكل البيانات المتقدمة', en: 'Advanced Algorithms & Data Structures' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'حل تحدي تشغيلي حقيقي مع شركة أوكيو أو عمانتل', en: 'Solving live operational challenge with OQ or Omantel' },
      },
    ],
  },
  {
    id: 'creativity',
    number: 3,
    clusterId: 'cognitive',
    name: { ar: 'الإبداع والابتكار', en: 'Creativity & Innovation' },
    shortName: { ar: 'الإبداع والابتكار', en: 'Creativity' },
    isPriorityP: true,
    initialScore: 78,
    oqfBenchmark: 70,
    wefTarget: 85,
    behavioralDefinition: {
      ar: 'توليد أفكار أصيلة وغير نمطية، وتحويلها إلى نماذج أولية أو مبادرات ذات قيمة اقتصادية أو اجتماعية مضافة.',
      en: 'Generating original, non-traditional ideas and translating them into prototypes or initiatives with economic or social value.',
    },
    uonGraduateAttributes: [
      { ar: 'الابتكار وريادة الأعمال', en: 'Innovation & Entrepreneurship' },
      { ar: 'التعلم مدى الحياة', en: 'Lifelong Learning' },
    ],
    wefAlignment: {
      ar: 'ضمن أعلى 3 مهارات نمواً بحلول 2030 (Creative Thinking & Ideation).',
      en: 'Among top 3 fastest-growing skills through 2030 (Creative Thinking & Ideation).',
    },
    badgeTitle: { ar: 'مبتكر مسار الريادة', en: 'Venture Innovation Pioneer' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'يعيد صياغة أفكار قائمة بتعديلات شكلية محدودة.', en: 'Rephrases existing ideas with minor surface adjustments.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'يربط مفاهيم من تخصصات متقاربة لإنتاج فكرة محسّنة.', en: 'Connects concepts from adjacent domains to produce improved ideas.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يبني نماذج أولية مبتكرة ويختبر جدواها مع المستخدمين الفعليين.', en: 'Builds innovative prototypes and validates feasibility with real users.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'يطلق ابتكاراً نوعياً قابلاً للتسويق أو الاحتضان في حاضنة جامعة نزوى.', en: 'Launches market-ready innovation suitable for UoN business incubation.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'الابتكار وريادة الأعمال (ENTR 201)', en: 'Innovation & Entrepreneurship (ENTR 201)' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'تصميم واجهات وتجربة المستخدم للأنظمة الذكية', en: 'UX/UI Design for Intelligent Systems' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'تقديم نموذج أولي في معرض نزوى للابتكار السنوي', en: 'Presenting MVP at Annual Nizwa Innovation Expo' },
      },
    ],
  },
  {
    id: 'leadership',
    number: 4,
    clusterId: 'leadership',
    name: { ar: 'القيادة', en: 'Leadership' },
    shortName: { ar: 'القيادة', en: 'Leadership' },
    isPriorityP: true,
    initialScore: 79,
    oqfBenchmark: 72,
    wefTarget: 84,
    behavioralDefinition: {
      ar: 'توجيه الفرق نحو رؤية مشتركة، وتفويض المهام بعدالة، وتحفيز الأعضاء، وتحمل المسؤولية الكاملة عن النتائج.',
      en: 'Aligning teams toward a shared vision, delegating equitably, inspiring members, and taking full accountability for outcomes.',
    },
    uonGraduateAttributes: [
      { ar: 'القيادة الأخلاقية والتأثير الإيجابي', en: 'Ethical Leadership & Positive Influence' },
      { ar: 'المواطنة الفاعلة', en: 'Active Citizenship' },
    ],
    wefAlignment: {
      ar: 'ركيزة أساسية في القيادة والتأثير الاجتماعي (Leadership & Social Influence - WEF 2030).',
      en: 'Core pillar of Leadership & Social Influence in WEF 2030.',
    },
    badgeTitle: { ar: 'قائد فرق العمل الميداني', en: 'Field Team Leader' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'ينفذ دوره داخل الفريق ويساعد عند الطلب.', en: 'Executes assigned role and assists when asked.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'ينسق اجتماعات المجموعة ويوزع المهام الأساسية بوضوح.', en: 'Coordinates group meetings and distributes basic tasks clearly.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يدير الخلافات بمهنية ويرفع أداء الفريق نحو أهداف قابلة للقياس.', en: 'Resolves conflicts professionally and elevates team performance toward KPIs.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'يقود مبادرات مؤسسية أو طلابية كبرى ويحقق أثراً مستداماً وموثقاً.', en: 'Leads major institutional or student initiatives achieving documented sustainable impact.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'الأندية الطلابية والقيادة التطوعية', en: 'Student Clubs & Volunteer Leadership' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'إدارة مشاريع البرمجيات الرشيقة (Agile Scrum Master)', en: 'Agile Software Project Management (Scrum Master)' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'قيادة فريق مشروع التخرج متعدد التخصصات', en: 'Leading multidisciplinary Capstone team' },
      },
    ],
  },
  {
    id: 'proactivity',
    number: 5,
    clusterId: 'leadership',
    name: { ar: 'الاستباقية والمبادرة', en: 'Proactivity & Initiative' },
    shortName: { ar: 'الاستباقية', en: 'Proactivity' },
    isPriorityP: true,
    initialScore: 81,
    oqfBenchmark: 72,
    wefTarget: 83,
    behavioralDefinition: {
      ar: 'استشراف الفرص والتحديات قبل وقوعها، والمضي قدماً في تنفيذ التحسينات ذاتياً دون انتظار التوجيه المباشر.',
      en: 'Anticipating opportunities and bottlenecks ahead of time and self-starting improvements without waiting for direct instruction.',
    },
    uonGraduateAttributes: [
      { ar: 'روح المبادرة والاستقلالية المهنية', en: 'Self-Initiative & Professional Autonomy' },
    ],
    wefAlignment: {
      ar: 'متصل بقدرات الاعتماد الذاتي والرشاقة المهنية (Active Learning & Initiative).',
      en: 'Linked to self-direction and professional agility (Active Learning & Initiative).',
    },
    badgeTitle: { ar: 'مبادر استباقي متميز', en: 'Distinguished Proactive Starter' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'ينتظر التعليمات التفصيلية قبل البدء بالمهمة.', en: 'Waits for detailed instructions before starting tasks.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'يتطوع بمهام إضافية ويطرح أسئلة استباقية لتجنب العقبات.', en: 'Volunteers for extra tasks and asks proactive questions to avoid blockers.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يرصد فجوات العمل ويقترح خطط تحسين عملية قبل تفاقمها.', en: 'Spots workflow gaps and proposes actionable improvements proactively.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'يؤسس مبادرات أو شراكات جديدة ذات أثر ملموس على مستوى الجامعة أو المجتمع.', en: 'Founds new initiatives or partnerships with measurable university/community impact.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'المشاركة في مبادرات خدمة المجتمع بمحافظة الداخلية', en: 'Community Service Initiatives in Al-Dakhiliyah' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'بناء أدوات مفتوحة المصدر أو أتمتة مختبرات القسم', en: 'Building open-source tools or department lab automation' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'تقديم مقترح تطويري لجهة التدريب الميداني', en: 'Delivering process improvement proposal to internship host' },
      },
    ],
  },
  {
    id: 'teamwork',
    number: 6,
    clusterId: 'leadership',
    name: { ar: 'العمل الجماعي والتعاون', en: 'Teamwork & Collaboration' },
    shortName: { ar: 'العمل الجماعي', en: 'Teamwork' },
    isPriorityP: true,
    initialScore: 86,
    oqfBenchmark: 76,
    wefTarget: 85,
    behavioralDefinition: {
      ar: 'التكامل البناء مع أعضاء الفريق متعددي الخلفيات، وتبادل المعرفة بشفافية، والالتزام بالنجاح الجماعي المشترك.',
      en: 'Integrating constructively with diverse teammates, sharing knowledge transparently, and committing to collective success.',
    },
    uonGraduateAttributes: [
      { ar: 'الشراكة الفاعلة واحترام التنوع', en: 'Effective Collaboration & Respect for Diversity' },
    ],
    wefAlignment: {
      ar: 'أساسي في بيئات العمل الهجينة ومتعددة التخصصات (WEF Collaboration Index).',
      en: 'Essential for hybrid and cross-functional work environments (WEF Collaboration Index).',
    },
    badgeTitle: { ar: 'شريك عمل جماعي موثق', en: 'Verified Team Collaborator' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'يحضر اجتماعات الفريق ويسلم الجزء الخاص به.', en: 'Attends team meetings and submits individual portion.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'يستمع بفاعلية لآراء الزملاء ويدمجها في العمل المشترك.', en: 'Listens actively to peers and integrates ideas into shared output.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يدعم الزملاء المتعثرين ويعزز الثقة والشفافية في مشاركة المهام.', en: 'Supports struggling teammates and fosters trust and transparency.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'ينتج مخرجات متكاملة عالية الجودة ضمن فرق متعددة التخصصات والثقافات.', en: 'Delivers seamless high-quality outcomes across multidisciplinary teams.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'المشاريع البحثية الجماعية في المتطلبات العامة', en: 'Collaborative research projects in general courses' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'العمل عبر Git & CI/CD ضمن فرق هندسة البرمجيات', en: 'Git & CI/CD collaboration in Software Engineering teams' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'التكامل مع فرق العمل المؤسسية أثناء التدريب الصيفي', en: 'Cross-team integration during corporate summer internship' },
      },
    ],
  },
  {
    id: 'communication',
    number: 7,
    clusterId: 'communication',
    name: { ar: 'مهارات التواصل', en: 'Communication Skills' },
    shortName: { ar: 'التواصل', en: 'Communication' },
    isPriorityP: true,
    initialScore: 80,
    oqfBenchmark: 75,
    wefTarget: 84,
    behavioralDefinition: {
      ar: 'نقل الأفكار التقنية والإدارية بوضوح وإقناع شفهياً وكتابياً ورقمياً باللغتين العربية والإنجليزية بما يناسب الجمهور المستهدف.',
      en: 'Conveying technical and executive ideas clearly and persuasively across oral, written, and digital channels in Arabic and English.',
    },
    uonGraduateAttributes: [
      { ar: 'الفصاحة المهنية والتواصل ثنائي اللغة', en: 'Professional Bilingual Communication' },
    ],
    wefAlignment: {
      ar: 'مطلب رئيسي للقيادة والعمل مع أصحاب المصلحة الدوليين.',
      en: 'Key requirement for stakeholder engagement and global leadership.',
    },
    badgeTitle: { ar: 'متحدث وكاتب مهني متمكن', en: 'Proficient Professional Communicator' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'يعرض المعلومات الأساسية بشكل مفهوم مع أخطاء تنظيمية طفيفة.', en: 'Presents basic information understandably with minor structural gaps.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'ينظم التقارير والعروض التقديمية بوضوح وترابط منطقي.', en: 'Organizes reports and presentations with clear logical flow.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يكيف الرسالة والأسلوب بدقة لجمهور غير متخصص أو قيادي.', en: 'Tailors message and tone precisely for non-technical or executive audiences.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'يقنع لجان التحكيم والمستثمرين بأسلوب تنفيذي رفيع وتقارير موثقة.', en: 'Persuades juries and investors with executive poise and rigorous documentation.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'مهارات اللغة العربية والكتابة الأكاديمية بالإنجليزية', en: 'Arabic Rhetoric & English Academic Writing' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'كتابة التوثيق التقني والعروض الهندسية', en: 'Technical Documentation & Engineering Pitches' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'مناقشة مشروع التخرج أمام لجنة الصناعة والكلية', en: 'Capstone defense before industry & faculty panel' },
      },
    ],
  },
  {
    id: 'social_skills',
    number: 8,
    clusterId: 'communication',
    name: { ar: 'المهارات الاجتماعية', en: 'Social Skills' },
    shortName: { ar: 'المهارات الاجتماعية', en: 'Social Skills' },
    isPriorityP: false,
    initialScore: 77,
    oqfBenchmark: 70,
    wefTarget: 80,
    behavioralDefinition: {
      ar: 'بناء علاقات مهنية إيجابية قائمة على الذكاء العاطفي، والاحترام الثقافي، واللباقة في التعامل مع مختلف شرائح المجتمع.',
      en: 'Building positive professional relationships rooted in emotional intelligence, cultural respect, and interpersonal tact.',
    },
    uonGraduateAttributes: [
      { ar: 'القيم العُمانية الأصيلة والانفتاح الحضاري', en: 'Authentic Omani Values & Cultural Openness' },
    ],
    wefAlignment: {
      ar: 'الذكاء العاطفي والتعاطف المهني (Empathy & Active Listening - WEF 2030).',
      en: 'Emotional intelligence & empathy (Empathy & Active Listening - WEF 2030).',
    },
    badgeTitle: { ar: 'سفير التواصل الإنساني', en: 'Social Intelligence Ambassador' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'يتعامل باحترام والتزام بالآداب العامة في المواقف المعتادة.', en: 'Interacts respectfully following basic etiquette in routine settings.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'يظهر تعاطفاً وتفهماً لاختلاف الآراء والشخصيات.', en: 'Demonstrates empathy and understanding of diverse personalities.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يبني شبكة علاقات مهنية فاعلة ويهيئ مناخاً مريحاً للتعاون.', en: 'Builds active professional networks and creates welcoming collaboration climates.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'يمثل الجامعة والمؤسسة باحترافية عالية في المحافل الوطنية والدولية.', en: 'Represents university and employer with exemplary diplomacy at national/global forums.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'الحضارة الإسلامية والمواطنة العُمانية', en: 'Islamic Civilization & Omani Citizenship' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'مقابلات المستخدمين وفهم احتياجات العملاء', en: 'User Interviews & Stakeholder Discovery' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'التمثيل الميداني مع الشركاء في أسبوع المهنة', en: 'Employer networking & Career Week representation' },
      },
    ],
  },
  {
    id: 'resilience',
    number: 9,
    clusterId: 'communication',
    name: { ar: 'الصمود والقدرة على التكيف', en: 'Resilience & Adaptability' },
    shortName: { ar: 'الصمود والتكيف', en: 'Resilience' },
    isPriorityP: true,
    initialScore: 75,
    oqfBenchmark: 71,
    wefTarget: 84,
    behavioralDefinition: {
      ar: 'الحفاظ على الاتزان والأداء تحت الضغط، والتعامل المرن مع تغير المتطلبات أو الإخفاقات المؤقتة وتحويلها لفرص تعلم.',
      en: 'Maintaining composure and performance under pressure, adapting flexibly to shifting requirements, and turning setbacks into learning.',
    },
    uonGraduateAttributes: [
      { ar: 'المرونة الذهنية والجاهزية للمستقبل', en: 'Mental Agility & Future Readiness' },
    ],
    wefAlignment: {
      ar: 'المهارة #2 عالمياً في الأهمية (Resilience, Flexibility & Agility - WEF 2030).',
      en: '#2 global priority skill (Resilience, Flexibility & Agility - WEF 2030).',
    },
    badgeTitle: { ar: 'رائد المرونة المهنية', en: 'Agility & Resilience Champion' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'يتقبل التغييرات البسيطة بعد توجيه واضح من المشرف.', en: 'Accepts minor changes after clear supervisor guidance.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'يستعيد توازنه سريعاً بعد الملاحظات النقدية ويعدل خطته.', en: 'Recovers quickly from critical feedback and adjusts plans.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يحافظ على جودة الإنجاز في بيئات متغيرة وضغوط مواعيد ضيقة.', en: 'Maintains output quality amid shifting scopes and tight deadlines.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'يبث الطمأنينة في الفريق وقت الأزمات ويقود التحول الاستراتيجي بنجاح.', en: 'Stabilizes teams during crises and leads successful strategic pivots.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'الانتقال الجامعي وإدارة الضغوط الأكاديمية', en: 'University Transition & Academic Resilience' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'تحديات الهاكاثون المكثفة لمدة 48 ساعة', en: '48-Hour Intensive Hackathon Sprints' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'التعامل مع متغيرات السوق الفعلية أثناء التدريب', en: 'Navigating live market pivots during internship' },
      },
    ],
  },
  {
    id: 'digital_literacy',
    number: 10,
    clusterId: 'digital',
    name: {
      ar: 'مهارات الثقافة الرقمية: المعلوماتية، الإعلامية، وتقنية المعلومات',
      en: 'Digital Literacy: Information, Media & ICT Skills',
    },
    shortName: { ar: 'الثقافة الرقمية', en: 'Digital Literacy' },
    isPriorityP: true,
    initialScore: 91,
    oqfBenchmark: 78,
    wefTarget: 90,
    behavioralDefinition: {
      ar: 'تقييم المعلومات الرقمية والمصادر الإعلامية بنقدية، واستخدام أدوات الذكاء الاصطناعي والحوسبة والأمن السيبراني بمسؤولية واحتراف.',
      en: 'Critically evaluating digital information and media, and responsibly leveraging AI, cloud computing, and cybersecurity tools.',
    },
    uonGraduateAttributes: [
      { ar: 'الجاهزية الرقمية والذكاء الاصطناعي التطبيقي', en: 'Digital Fluency & Applied AI' },
      { ar: 'المواطنة الرقمية والأمن المعلوماتي', en: 'Digital Citizenship & InfoSec' },
    ],
    wefAlignment: {
      ar: 'متوافق مع AI & Big Data و Technological Literacy في تقرير WEF 2030.',
      en: 'Aligned with AI & Big Data and Technological Literacy in WEF 2030.',
    },
    badgeTitle: { ar: 'خبير التحول الرقمي والبيانات', en: 'Digital & Data Fluency Expert' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'يستخدم التطبيقات المكتبية ومحركات البحث الأساسية بكفاءة.', en: 'Uses standard office suites and basic search effectively.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'يتحقق من موثوقية المصادر الرقمية ويحمي خصوصية البيانات.', en: 'Verifies digital source credibility and practices data privacy.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يوظف أدوات تحليل البيانات والذكاء الاصطناعي التوليدي بأمانة علمية.', en: 'Applies data analytics and generative AI ethically and effectively.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'يصمم حلولاً رقمية متكاملة مؤمنة ومستندة إلى معايير الحوكمة الرقمية.', en: 'Architects secure, integrated digital solutions aligned with digital governance.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'الثقافة الرقمية والذكاء الاصطناعي (COMP 101)', en: 'Digital Literacy & AI Fundamentals (COMP 101)' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'تطوير الأنظمة السحابية وتحليل البيانات الضخمة', en: 'Cloud Systems & Big Data Analytics' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'بناء منصة رقمية متكاملة في مشروع التخرج', en: 'Deploying full-stack digital platform in Capstone' },
      },
    ],
  },
  {
    id: 'productivity',
    number: 11,
    clusterId: 'digital',
    name: { ar: 'الإنتاجية وإدارة الوقت', en: 'Productivity & Time Management' },
    shortName: { ar: 'الإنتاجية والوقت', en: 'Productivity' },
    isPriorityP: false,
    initialScore: 83,
    oqfBenchmark: 74,
    wefTarget: 84,
    behavioralDefinition: {
      ar: 'ترتيب الأولويات بذكاء، وتحديد الأهداف المرحلية، والوفاء بالالتزامات والمواعيد النهائية بأعلى جودة ممكنة.',
      en: 'Prioritizing effectively, setting milestone-driven goals, and delivering commitments on schedule at high quality.',
    },
    uonGraduateAttributes: [
      { ar: 'الانضباط المهني وجودة التنفيذ', en: 'Professional Discipline & Execution Quality' },
    ],
    wefAlignment: {
      ar: 'أساسي لكفاءة الأداء في نماذج العمل المرنة والنتائجية.',
      en: 'Core to performance efficiency in outcome-driven agile work.',
    },
    badgeTitle: { ar: 'منجز فائق الكفاءة', en: 'High-Efficiency Achiever' },
    rubric: [
      {
        level: 1,
        title: { ar: 'مستوى الأساس (Benchmark 1)', en: 'Benchmark (1)' },
        descriptor: { ar: 'يسلم الواجبات الأساسية في وقتها مع حاجة للتذكير.', en: 'Submits basic assignments on time with occasional reminders.' },
      },
      {
        level: 2,
        title: { ar: 'مستوى التطوير (Milestone 2)', en: 'Milestone (2)' },
        descriptor: { ar: 'يستخدم قوائم المهام والجداول الزمنية لتنظيم أعبائه الدراسية.', en: 'Uses task lists and schedules to organize academic workload.' },
      },
      {
        level: 3,
        title: { ar: 'مستوى الإتقان (Milestone 3)', en: 'Milestone (3)' },
        descriptor: { ar: 'يوازن بين الدراسة والتطوع والمشاريع التقنية دون تراجع الجودة.', en: 'Balances academics, volunteering, and tech projects without quality drop.' },
      },
      {
        level: 4,
        title: { ar: 'مستوى التميز (Capstone 4)', en: 'Capstone (4)' },
        descriptor: { ar: 'يدير خطط عمل متعددة المسارات بأدوات أتمتة ومؤشرات إنجاز دقيقة.', en: 'Manages multi-track execution plans using automation and strict KPIs.' },
      },
    ],
    journeyMilestones: [
      {
        stage: 'general',
        stageLabel: { ar: 'متطلبات الجامعة', en: 'General Courses' },
        description: { ar: 'مهارات التعلم الذاتي وإدارة الوقت الجامعي', en: 'Self-Regulated Learning & Time Planning' },
      },
      {
        stage: 'major',
        stageLabel: { ar: 'متطلبات التخصص', en: 'Major Courses' },
        description: { ar: 'تطبيق منهجيات Sprint و Kanban في المختبرات', en: 'Applying Sprint & Kanban workflows in labs' },
      },
      {
        stage: 'capstone',
        stageLabel: { ar: 'التدريب ومشروع التخرج', en: 'Capstone & Internship' },
        description: { ar: 'الالتزام الكامل بمؤشرات الأداء في التدريب الميداني', en: '100% KPI delivery compliance in field internship' },
      },
    ],
  },
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q-alizz-green',
    title: {
      ar: 'تحدي تحليل البيانات المالية الخضراء - بنك العز الإسلامي',
      en: 'Green Islamic Finance Data Analytics Challenge - Alizz Islamic Bank',
    },
    description: {
      ar: 'تصميم لوحة مؤشرات لتحليل محافظ التمويل الأخضر المتوافقة مع الشريعة الإسلامية واقتراح نماذج تقييم مخاطر الاستدامة.',
      en: 'Design an analytics dashboard for Sharia-compliant green financing portfolios and propose sustainability risk scoring models.',
    },
    category: 'corporate',
    partnerOrCourse: {
      ar: 'بنك العز الإسلامي (Alizz Islamic Bank)',
      en: 'Alizz Islamic Bank',
    },
    xpReward: 350,
    skillImpacts: {
      critical_thinking: 6,
      digital_literacy: 4,
      problem_solving: 5,
    },
    deadline: { ar: 'متاح حتى 30 ديسمبر', en: 'Open until Dec 30' },
    difficulty: 'flagship',
    completed: false,
  },
  {
    id: 'q-volunteer-30',
    title: {
      ar: 'مبادرة التطوع المجتمعي المستدام - 30 ساعة',
      en: 'Sustainable Community Volunteering Initiative - 30 Hours',
    },
    description: {
      ar: 'قيادة وتنفيذ ورش توعية رقمية لطلبة المدارس والأسر المنتجة في ولاية نزوى بالتعاون مع مركز خدمة المجتمع.',
      en: 'Lead and deliver digital literacy workshops for local schools and productive families in Nizwa with the Community Service Center.',
    },
    category: 'co_curricular',
    partnerOrCourse: {
      ar: 'مركز خدمة المجتمع - جامعة نزوى',
      en: 'UoN Community Service Center',
    },
    xpReward: 250,
    hoursAwarded: 30,
    skillImpacts: {
      leadership: 6,
      social_skills: 7,
      communication: 5,
      proactivity: 4,
    },
    deadline: { ar: 'الفصل الخريفي 2026', en: 'Fall Semester 2026' },
    difficulty: 'advanced',
    completed: false,
  },
  {
    id: 'q-oq-energy',
    title: {
      ar: 'حل معضلة كفاءة الطاقة - مجموعة أوكيو OQ',
      en: 'Energy Efficiency Optimization Challenge - OQ Group',
    },
    description: {
      ar: 'تطوير خوارزمية تنبؤية لتقليل الفاقد الحراري في خطوط الإنتاج الصناعي بميناء صحار باستخدام بيانات المستشعرات.',
      en: 'Develop a predictive algorithm to reduce thermal loss in industrial pipelines at Sohar using IoT sensor telemetry.',
    },
    category: 'corporate',
    partnerOrCourse: {
      ar: 'مجموعة أوكيو (OQ Group)',
      en: 'OQ Group',
    },
    xpReward: 400,
    skillImpacts: {
      problem_solving: 7,
      creativity: 6,
      critical_thinking: 5,
      resilience: 5,
    },
    deadline: { ar: 'متاح حتى 15 يناير', en: 'Open until Jan 15' },
    difficulty: 'flagship',
    completed: false,
  },
  {
    id: 'q-se-lab',
    title: {
      ar: 'مختبر الابتكار وتصميم الأنظمة الذكية - هندسة البرمجيات',
      en: 'Smart Systems Innovation Lab - Software Engineering',
    },
    description: {
      ar: 'تسليم النموذج الأولي لنظام إدارة الموارد المائية الذكية للأفلاج العُمانية مع اختبارات الأداء والتوثيق الهندسي.',
      en: 'Deliver an MVP for smart Omani Aflaj water-resource monitoring with performance tests and engineering docs.',
    },
    category: 'curricular',
    partnerOrCourse: {
      ar: 'مساق SWEN 402 - كلية الهندسة والعمارة',
      en: 'Course SWEN 402 - College of Engineering',
    },
    xpReward: 200,
    skillImpacts: {
      teamwork: 4,
      productivity: 5,
      creativity: 4,
    },
    deadline: { ar: 'نهاية الأسبوع 12', en: 'End of Week 12' },
    difficulty: 'standard',
    completed: false,
  },
  {
    id: 'q-omantel-city',
    title: {
      ar: 'هاكاثون المدن الذكية العُمانية - عمانتل Omantel',
      en: 'Oman Smart Cities Hackathon - Omantel',
    },
    description: {
      ar: 'ابتكار حل رقمي يربط شبكات الجيل الخامس 5G بخدمات النقل والسياحة التراثية في محافظة الداخلية.',
      en: 'Create a 5G-enabled digital solution connecting smart mobility and heritage tourism in Al-Dakhiliyah.',
    },
    category: 'corporate',
    partnerOrCourse: {
      ar: 'عمانتل (Omantel Innovation Labs)',
      en: 'Omantel Innovation Labs',
    },
    xpReward: 300,
    skillImpacts: {
      creativity: 6,
      resilience: 6,
      teamwork: 4,
      communication: 4,
    },
    deadline: { ar: 'متاح حتى 20 فبراير', en: 'Open until Feb 20' },
    difficulty: 'advanced',
    completed: false,
  },
];

export const INITIAL_PERKS: PerkItem[] = [
  {
    id: 'perk-course-40',
    title: {
      ar: 'خصم 40% على دبلوم الذكاء الاصطناعي التطبيقي',
      en: '40% Discount on Applied AI Diploma',
    },
    description: {
      ar: 'قسيمة تخفيض ممولة من الشريك التدريبي (أكاديمية نزوى للتدريب والتطوير) تُفتح بالجواهر مع عمولة تشغيلية للمنصة.',
      en: 'Partner-funded discount voucher at Nizwa Training Academy unlocked via Gems.',
    },
    costGems: 7,
    category: { ar: 'متجر خصومات الدورات', en: 'Course Discount Store' },
    provider: { ar: 'أكاديمية نزوى للتدريب والتطوير', en: 'Nizwa Training Academy' },
    redeemed: false,
  },
  {
    id: 'perk-cert-50',
    title: {
      ar: 'قسيمة خصم 50% على شهادة مهنية معتمدة (PMP / Data)',
      en: '50% Off Accredited Professional Certificate',
    },
    description: {
      ar: 'تخفيض مباشر في متجر المنصة على الشهادات الاحترافية الدولية الممولة عبر شراكات الأكاديميات.',
      en: 'Direct platform store discount on international professional certifications.',
    },
    costGems: 10,
    category: { ar: 'متجر خصومات الدورات', en: 'Course Discount Store' },
    provider: { ar: 'شركاء التدريب المعتمدون', en: 'Accredited Training Partners' },
    redeemed: false,
  },
  {
    id: 'perk-reg',
    title: {
      ar: 'أولوية التسجيل المبكر للمساقات',
      en: 'Early Course Registration Priority',
    },
    description: {
      ar: 'فتح بوابة التسجيل قبل الموعد الرسمي بـ 48 ساعة لضمان اختيار الشعب والمختبرات.',
      en: '48-hour early access to course registration portal to secure preferred sections and labs.',
    },
    costGems: 8,
    category: { ar: 'امتياز أكاديمي', en: 'Academic Privilege' },
    provider: { ar: 'عمادة القبول والتسجيل', en: 'Deanship of Registration' },
    redeemed: false,
  },
  {
    id: 'perk-conf',
    title: {
      ar: 'مقعد ممول في مؤتمر دولي',
      en: 'Sponsored International Conference Seat',
    },
    description: {
      ar: 'تغطية رسوم المشاركة والسفر لحضور مؤتمر تقني أو علمي إقليمي باسم جامعة الطالب.',
      en: 'Full registration and travel sponsorship to attend a regional scientific/tech conference.',
    },
    costGems: 24,
    category: { ar: 'تطوير عالمي', en: 'Global Exposure' },
    provider: { ar: 'مكتب العلاقات الدولية', en: 'International Relations Office' },
    redeemed: false,
  },
  {
    id: 'perk-vip',
    title: {
      ar: 'مقابلة توظيف سريعة VIP مع الشركاء الاستراتيجيين',
      en: 'VIP Fast-Track Interview with Strategic Partners',
    },
    description: {
      ar: 'ترشيح مباشر لمقابلة التوظيف النهائية لدى OQ أو بنك العز الإسلامي أو عمانتل دون فرز أولي.',
      en: 'Direct nomination to final-stage interviews with OQ, Alizz Islamic Bank, or Omantel.',
    },
    costGems: 16,
    category: { ar: 'مسار مهني', en: 'Career Fast-Track' },
    provider: { ar: 'مركز التوجيه الوظيفي', en: 'Career Guidance Center' },
    redeemed: false,
  },
  {
    id: 'perk-mentor',
    title: {
      ar: 'جلسة إرشاد مهني فردية مع قيادي في القطاع',
      en: '1-on-1 Executive Mentorship Session',
    },
    description: {
      ar: 'جلسة توجيه لمدة 60 دقيقة مع مدير تنفيذي في قطاع الطاقة أو التقنية المالية.',
      en: '60-minute private mentoring session with an executive leader in Energy or FinTech.',
    },
    costGems: 10,
    category: { ar: 'إرشاد تنفيذي', en: 'Executive Mentorship' },
    provider: { ar: 'شبكة الخريجين والشركاء', en: 'Alumni & Partner Network' },
    redeemed: false,
  },
];

export const INITIAL_CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand-2',
    universityId: 'uon',
    universityName: { ar: 'جامعة نزوى', en: 'University of Nizwa' },
    name: { ar: 'مريم بنت خالد الرواحية', en: 'Maryam bint Khalid Al-Rawahi' },
    college: { ar: 'كلية الاقتصاد والإدارة ونظم المعلومات', en: 'College of Economics, Management & IS' },
    major: { ar: 'التقنية المالية والمحاسبة', en: 'FinTech & Accounting' },
    gpa: 3.82,
    tierXp: 3280,
    tierId: 'fellow',
    skills: {
      critical_thinking: 91,
      problem_solving: 88,
      creativity: 85,
      leadership: 89,
      proactivity: 90,
      teamwork: 87,
      communication: 92,
      social_skills: 88,
      resilience: 84,
      digital_literacy: 89,
      productivity: 91,
    },
    completedBounties: [
      { ar: 'تحدي التمويل الأخضر - بنك العز الإسلامي', en: 'Green Finance Challenge - Alizz Bank' },
      { ar: 'مبادرة الشمول المالي الرقمي - وزارة الاقتصاد', en: 'Digital Financial Inclusion - Ministry of Economy' },
    ],
    verifiedArtifacts: [
      {
        title: { ar: 'نموذج تقييم مخاطر التمويل المستدام', en: 'ESG Sustainable Credit Scoring Model' },
        issuer: { ar: 'بنك العز الإسلامي', en: 'Alizz Islamic Bank' },
        hash: '0x8b2f...c91e',
      },
    ],
  },
  {
    id: 'cand-3',
    universityId: 'gutech',
    universityName: { ar: 'الجامعة الألمانية للتكنولوجيا (GUtech)', en: 'GUtech Oman' },
    name: { ar: 'سعيد بن ناصر الكندي', en: 'Saeed bin Nasser Al-Kindi' },
    college: { ar: 'كلية الهندسة والعمارة', en: 'College of Engineering & Architecture' },
    major: { ar: 'الهندسة الكيميائية والطاقة', en: 'Chemical & Energy Engineering' },
    gpa: 3.59,
    tierXp: 3120,
    tierId: 'fellow',
    skills: {
      critical_thinking: 89,
      problem_solving: 93,
      creativity: 84,
      leadership: 85,
      proactivity: 86,
      teamwork: 88,
      communication: 81,
      social_skills: 80,
      resilience: 90,
      digital_literacy: 85,
      productivity: 87,
    },
    completedBounties: [
      { ar: 'حل معضلة كفاءة الطاقة - مجموعة أوكيو OQ', en: 'Energy Efficiency Challenge - OQ Group' },
      { ar: 'تحسين عمليات الهيدروجين الأخضر - PDO', en: 'Green Hydrogen Optimization - PDO' },
    ],
    verifiedArtifacts: [
      {
        title: { ar: 'محاكاة تقليل الانبعاثات الكربونية', en: 'Carbon Emissions Reduction Simulation' },
        issuer: { ar: 'مجموعة أوكيو OQ', en: 'OQ Group' },
        hash: '0x4d19...a72b',
      },
    ],
  },
  {
    id: 'cand-4',
    universityId: 'uon',
    universityName: { ar: 'جامعة نزوى', en: 'University of Nizwa' },
    name: { ar: 'فاطمة بنت علي الشكيلية', en: 'Fatima bint Ali Al-Shukaili' },
    college: { ar: 'كلية الصيدلة والتمريض', en: 'College of Pharmacy & Nursing' },
    major: { ar: 'الصيدلة السريرية', en: 'Clinical Pharmacy' },
    gpa: 3.74,
    tierXp: 2640,
    tierId: 'innovator',
    skills: {
      critical_thinking: 87,
      problem_solving: 84,
      creativity: 80,
      leadership: 82,
      proactivity: 85,
      teamwork: 91,
      communication: 89,
      social_skills: 92,
      resilience: 88,
      digital_literacy: 82,
      productivity: 86,
    },
    completedBounties: [
      { ar: 'مبادرة التطوع الصحي المجتمعي - 45 ساعة', en: 'Community Health Volunteering - 45 Hours' },
    ],
    verifiedArtifacts: [
      {
        title: { ar: 'دليل التوعية الدوائية الذكي للمسنين', en: 'Smart Medication Adherence Guide' },
        issuer: { ar: 'كلية الصيدلة - جامعة نزوى', en: 'UoN College of Pharmacy' },
        hash: '0x7c04...e11d',
      },
    ],
  },
  {
    id: 'cand-5',
    universityId: 'su',
    universityName: { ar: 'جامعة صحار', en: 'Sohar University' },
    name: { ar: 'عمر بن حمدان البوسعيدي', en: 'Omar bin Hamdan Al-Busaidi' },
    college: { ar: 'كلية العلوم والآداب', en: 'College of Arts & Sciences' },
    major: { ar: 'علوم البيانات والذكاء الاصطناعي', en: 'Data Science & AI' },
    gpa: 3.91,
    tierXp: 3410,
    tierId: 'fellow',
    skills: {
      critical_thinking: 94,
      problem_solving: 92,
      creativity: 90,
      leadership: 83,
      proactivity: 88,
      teamwork: 85,
      communication: 84,
      social_skills: 79,
      resilience: 86,
      digital_literacy: 96,
      productivity: 90,
    },
    completedBounties: [
      { ar: 'هاكاثون المدن الذكية - عمانتل Omantel', en: 'Smart Cities Hackathon - Omantel' },
      { ar: 'مؤشرات التخطيط الاقتصادي - وزارة الاقتصاد', en: 'Economic Planning Analytics - Ministry of Economy' },
    ],
    verifiedArtifacts: [
      {
        title: { ar: 'نظام التنبؤ بحركة المرور والسياحة في نزوى', en: 'Nizwa Smart Tourism Traffic Predictor' },
        issuer: { ar: 'عمانتل Omantel', en: 'Omantel' },
        hash: '0x9a31...f80c',
      },
    ],
  },
];

export const GOVERNANCE_MATRIX = [
  {
    pillar: { ar: 'متطلبات الجامعة العامة', en: 'General University Requirements' },
    coverage: { ar: 'تغطية 100% للمهارات التأسيسية (1-2-7-10)', en: '100% coverage of foundational skills (1, 2, 7, 10)' },
    mechanism: { ar: 'مساقات إلزامية + ملف إنجاز رقمي مبدئي', en: 'Mandatory courses + baseline e-Portfolio' },
    owner: { ar: 'عمادة الدراسات العامة', en: 'Deanship of General Studies' },
    readiness: 94,
  },
  {
    pillar: { ar: 'مساقات التخصص والمختبرات', en: 'Major Courses & Capstone Labs' },
    coverage: { ar: 'دمج مصفوفة AAC&U VALUE في 85% من الخطط', en: 'AAC&U VALUE Rubrics embedded in 85% of syllabi' },
    mechanism: { ar: 'تقييم مزدوج (درجة أكاديمية + شارة كفاءة)', en: 'Dual assessment (Academic Grade + Competency Badge)' },
    owner: { ar: 'الكليات الأربع ومجالس الأقسام', en: 'Four Colleges & Department Boards' },
    readiness: 86,
  },
  {
    pillar: { ar: 'الحياة اللاصفية والتطوع والاحتضان', en: 'Co-Curricular, Volunteering & Incubation' },
    coverage: { ar: 'توثيق الساعات القيادية والتطوعية والأندية', en: 'Verified logging of leadership, volunteering & clubs' },
    mechanism: { ar: 'اعتماد إلكتروني من مركز التميز الطلابي', en: 'Digital sign-off via Student Excellence Center' },
    owner: { ar: 'عمادة شؤون الطلاب ومركز ريادة الأعمال', en: 'Student Affairs & Entrepreneurship Center' },
    readiness: 91,
  },
  {
    pillar: { ar: 'شراكات سوق العمل (OQF & WEF 2030)', en: 'Labor Market Alignment (OQF & WEF 2030)' },
    coverage: { ar: 'تحديات حية مع OQ، بنك العز، عمانتل، PDO', en: 'Live bounties with OQ, Alizz Bank, Omantel, PDO' },
    mechanism: { ar: 'تحكيم مشترك مع مديري التوظيف + مصادقة QR', en: 'Co-jury with HR Directors + Cryptographic QR' },
    owner: { ar: 'مركز التوجيه الوظيفي وضمان الجودة', en: 'Career Center & Quality Assurance' },
    readiness: 89,
  },
];
