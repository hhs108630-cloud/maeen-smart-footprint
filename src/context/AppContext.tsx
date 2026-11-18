import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ActiveTab,
  BilingualText,
  CandidateProfile,
  CourseDeliveryMode,
  CourseProviderType,
  Language,
  PerkItem,
  Quest,
  StudentAccountRecord,
  StudentProfile,
  TrainingCourse,
} from '../types/uon';
import {
  GEM_PACKS,
  INITIAL_ACCOUNTS,
  INITIAL_CANDIDATES,
  INITIAL_COURSES,
  INITIAL_PERKS,
  INITIAL_QUESTS,
  SKILLS_DATA,
  UNIVERSITIES,
  getTierForXp,
} from '../data/uonData';

interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
  type: 'success' | 'info' | 'warning';
}

interface PersistedState {
  lang: Language;
  activeAccountId: string;
  accounts: StudentAccountRecord[];
  quests: Quest[];
  courses: TrainingCourse[];
  perks: PerkItem[];
  invitedCandidateIds: string[];
}

interface AppContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (text: BilingualText) => string;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeAccountId: string;
  accounts: StudentAccountRecord[];
  switchAccount: (accountId: string) => void;
  registerStudentAccount: (input: {
    nameAr: string;
    nameEn?: string;
    universityId: string;
    majorAr: string;
    collegeAr: string;
  }) => void;
  student: StudentProfile;
  skillScores: Record<string, number>;
  quests: Quest[];
  courses: TrainingCourse[];
  perks: PerkItem[];
  candidates: CandidateProfile[];
  invitedCandidateIds: string[];
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  pushToast: (title: string, subtitle?: string, type?: ToastMessage['type']) => void;
  completeQuest: (questId: string, fileName: string, reflection: string) => void;
  completeCourse: (courseId: string) => void;
  buyGemPack: (packId: string) => void;
  submitProviderCourse: (input: {
    titleAr: string;
    titleEn?: string;
    providerType: CourseProviderType;
    providerNameAr: string;
    descriptionAr: string;
    deliveryMode: CourseDeliveryMode;
    locationOrLinkAr: string;
    scheduleDateAr: string;
    durationHours: number;
    suggestedValueGems: number;
    selectedSkillIds: string[];
  }) => void;
  approveCourseByMaeen: (
    courseId: string,
    config: {
      xpReward: number;
      originalCostGems: number;
      maeenSupportPercent: number;
    }
  ) => void;
  redeemPerk: (perkId: string) => void;
  startNewSemester: () => void;
  publishCorporateBounty: (input: {
    titleAr: string;
    titleEn: string;
    partnerAr: string;
    partnerEn: string;
    descriptionAr: string;
    descriptionEn: string;
    xpReward: number;
    skillId: string;
  }) => void;
  inviteCandidate: (candidateId: string, candidateName: string) => void;
  resetDemo: () => void;
}

const STORAGE_KEY = 'uon_smart_footprint_v2';

function getDefaultPersistedState(): PersistedState {
  return {
    lang: 'ar',
    activeAccountId: INITIAL_ACCOUNTS[0].profile.id,
    accounts: INITIAL_ACCOUNTS,
    quests: INITIAL_QUESTS,
    courses: INITIAL_COURSES,
    perks: INITIAL_PERKS,
    invitedCandidateIds: [],
  };
}

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultPersistedState();
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    const defaults = getDefaultPersistedState();
    return {
      lang: parsed.lang === 'en' ? 'en' : 'ar',
      activeAccountId: parsed.activeAccountId ?? defaults.activeAccountId,
      accounts: parsed.accounts?.length ? parsed.accounts : defaults.accounts,
      quests: parsed.quests ?? defaults.quests,
      courses: parsed.courses ?? defaults.courses,
      perks: parsed.perks ?? defaults.perks,
      invitedCandidateIds: parsed.invitedCandidateIds ?? [],
    };
  } catch {
    return getDefaultPersistedState();
  }
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PersistedState>(loadState);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = state.lang;
    html.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  }, [state.lang]);

  const activeAccount =
    state.accounts.find((a) => a.profile.id === state.activeAccountId) ??
    state.accounts[0];

  const student = activeAccount.profile;
  const skillScores = activeAccount.skillScores;

  const quests: Quest[] = state.quests.map((q) => ({
    ...q,
    completed: activeAccount.completedQuestIds.includes(q.id),
  }));

  const courses: TrainingCourse[] = state.courses.map((c) => ({
    ...c,
    completed: activeAccount.completedCourseIds.includes(c.id),
  }));

  const perks: PerkItem[] = state.perks.map((p) => ({
    ...p,
    redeemed: activeAccount.redeemedPerkIds.includes(p.id),
  }));

  const t = (text: BilingualText) => text[state.lang];

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const pushToast = (
    title: string,
    subtitle?: string,
    type: ToastMessage['type'] = 'success'
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, subtitle, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4500);
  };

  const setLang = (lang: Language) => setState((prev) => ({ ...prev, lang }));
  const toggleLang = () =>
    setState((prev) => ({ ...prev, lang: prev.lang === 'ar' ? 'en' : 'ar' }));

  const fireCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#0F3D3E', '#C59B27', '#E5C158', '#10B981'],
    });
  };

  const switchAccount = (accountId: string) => {
    const target = state.accounts.find((a) => a.profile.id === accountId);
    if (!target) return;
    setState((prev) => ({ ...prev, activeAccountId: accountId }));
    pushToast(
      state.lang === 'ar'
        ? `تم التبديل إلى: ${target.profile.name.ar}`
        : `Switched to: ${target.profile.name.en}`,
      target.profile.universityName[state.lang],
      'info'
    );
  };

  const registerStudentAccount: AppContextValue['registerStudentAccount'] = (input) => {
    const uni = UNIVERSITIES.find((u) => u.id === input.universityId) ?? UNIVERSITIES[0];
    const newId = `2026${Math.floor(10000 + Math.random() * 89999)}`;
    const initials = input.nameAr
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('');

    const baselineSkills: Record<string, number> = {};
    SKILLS_DATA.forEach((s) => {
      baselineSkills[s.id] = 68;
    });

    const newRecord: StudentAccountRecord = {
      profile: {
        id: newId,
        accountType: 'student',
        subscriptionStatus: 'active_5_omr',
        universityId: uni.id,
        universityName: uni.name,
        name: {
          ar: input.nameAr,
          en: input.nameEn?.trim() || input.nameAr,
        },
        major: { ar: input.majorAr, en: input.majorAr },
        college: { ar: input.collegeAr, en: input.collegeAr },
        gpa: 3.5,
        graduationYear: 2027,
        tierXp: 500,
        semesterXp: 500,
        redeemableXp: 500,
        gemsBalance: 10,
        totalGemsEarned: 10,
        volunteeringHours: 0,
        leadershipHours: 0,
        avatarInitials: initials || 'ط',
        blockchainDid: `did:${uni.code.toLowerCase()}:oman:${newId}:${Math.random()
          .toString(16)
          .slice(2, 10)}`,
      },
      skillScores: baselineSkills,
      completedQuestIds: [],
      completedCourseIds: [],
      redeemedPerkIds: [],
    };

    setState((prev) => ({
      ...prev,
      accounts: [newRecord, ...prev.accounts],
      activeAccountId: newId,
    }));

    fireCelebration();
    pushToast(
      state.lang === 'ar'
        ? 'تم تفعيل اشتراك الطالب السنوي (5 ر.ع) بنجاح!'
        : 'Student Annual Subscription (5 OMR/yr) Activated!',
      `${input.nameAr} • ${uni.name[state.lang]}`,
      'success'
    );
  };

  const updateActiveAccount = (
    updater: (acc: StudentAccountRecord) => StudentAccountRecord
  ) => {
    setState((prev) => ({
      ...prev,
      accounts: prev.accounts.map((acc) =>
        acc.profile.id === prev.activeAccountId ? updater(acc) : acc
      ),
    }));
  };

  const completeQuest = (questId: string, fileName: string, reflection: string) => {
    const quest = state.quests.find((q) => q.id === questId);
    if (!quest || activeAccount.completedQuestIds.includes(questId)) return;

    const hash = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random()
      .toString(16)
      .slice(2, 6)}`;

    const updatedSkills = { ...activeAccount.skillScores };
    Object.entries(quest.skillImpacts).forEach(([skillId, boost]) => {
      const prevScore = updatedSkills[skillId] ?? 70;
      updatedSkills[skillId] = Math.min(100, prevScore + boost);
    });

    const prevSemXp = activeAccount.profile.semesterXp ?? activeAccount.profile.tierXp;
    const newSemXp = prevSemXp + quest.xpReward;
    const gemsAwarded = Math.floor(newSemXp / 50) - Math.floor(prevSemXp / 50);

    const newTierXp = activeAccount.profile.tierXp + quest.xpReward;
    const prevTier = getTierForXp(activeAccount.profile.tierXp);
    const nextTier = getTierForXp(newTierXp);

    setState((prev) => ({
      ...prev,
      quests: prev.quests.map((q) =>
        q.id === questId
          ? {
              ...q,
              evidenceSubmitted: {
                fileName: fileName || 'verified_artifact.pdf',
                reflection,
                verifiedAt: new Date().toISOString(),
                hash,
              },
            }
          : q
      ),
      accounts: prev.accounts.map((acc) =>
        acc.profile.id === prev.activeAccountId
          ? {
              ...acc,
              profile: {
                ...acc.profile,
                tierXp: newTierXp,
                semesterXp: newSemXp,
                redeemableXp: acc.profile.redeemableXp + quest.xpReward,
                gemsBalance: (acc.profile.gemsBalance ?? 0) + gemsAwarded,
                totalGemsEarned: (acc.profile.totalGemsEarned ?? 0) + gemsAwarded,
                volunteeringHours:
                  acc.profile.volunteeringHours + (quest.hoursAwarded ?? 0),
              },
              skillScores: updatedSkills,
              completedQuestIds: [...acc.completedQuestIds, questId],
            }
          : acc
      ),
    }));

    fireCelebration();
    pushToast(
      prevTier.id !== nextTier.id
        ? state.lang === 'ar'
          ? `ترقية مستوى! أصبحت الآن "${nextTier.name.ar}"`
          : `Tier Up! You are now "${nextTier.name.en}"`
        : state.lang === 'ar'
        ? 'تم توثيق الدليل وإضافة النقاط والجواهر!'
        : 'Evidence Verified & XP/Gems Awarded!',
      `+${quest.xpReward} XP • +${gemsAwarded} 💎`,
      'success'
    );
  };

  const buyGemPack = (packId: string) => {
    const pack = GEM_PACKS.find((p) => p.id === packId);
    if (!pack) return;
    updateActiveAccount((acc) => ({
      ...acc,
      profile: {
        ...acc.profile,
        gemsBalance: (acc.profile.gemsBalance ?? 0) + pack.gems,
      },
    }));
    fireCelebration();
    pushToast(
      state.lang === 'ar'
        ? `تم شحن ${pack.gems} جوهرة 💎 بنجاح (${pack.priceOmr} ر.ع)`
        : `Purchased ${pack.gems} Gems 💎 (${pack.priceOmr} OMR)`,
      state.lang === 'ar'
        ? 'يمكنك الآن الالتحاق بأي دورة مدفوعة بالجواهر في المتجر'
        : 'You can now enroll in any Gem-priced course in the Store',
      'success'
    );
  };

  const completeCourse = (courseId: string) => {
    const course = state.courses.find((c) => c.id === courseId);
    if (!course || activeAccount.completedCourseIds.includes(courseId)) return;

    const currentGems = activeAccount.profile.gemsBalance ?? 0;
    if (course.costGems > 0 && currentGems < course.costGems) {
      pushToast(
        state.lang === 'ar' ? 'رصيد الجواهر غير كافٍ لهذه الدورة' : 'Insufficient Gems for Course',
        state.lang === 'ar'
          ? `تحتاج ${course.costGems} 💎 — يمكنك جمعها من النقاط أو شراء باقة جواهر من المتجر`
          : `Requires ${course.costGems} 💎 — earn via XP or top-up in the Store`,
        'warning'
      );
      return;
    }

    const updatedSkills = { ...activeAccount.skillScores };
    Object.entries(course.skillImpacts).forEach(([skillId, boost]) => {
      const prevScore = updatedSkills[skillId] ?? 70;
      updatedSkills[skillId] = Math.min(100, prevScore + boost);
    });

    const prevSemXp = activeAccount.profile.semesterXp ?? activeAccount.profile.tierXp;
    const newSemXp = prevSemXp + course.xpReward;
    const gemsAwarded = Math.floor(newSemXp / 50) - Math.floor(prevSemXp / 50);

    updateActiveAccount((acc) => ({
      ...acc,
      profile: {
        ...acc.profile,
        tierXp: acc.profile.tierXp + course.xpReward,
        semesterXp: newSemXp,
        redeemableXp: acc.profile.redeemableXp + course.xpReward,
        gemsBalance: (acc.profile.gemsBalance ?? 0) - course.costGems + gemsAwarded,
        totalGemsEarned: (acc.profile.totalGemsEarned ?? 0) + gemsAwarded,
      },
      skillScores: updatedSkills,
      completedCourseIds: [...acc.completedCourseIds, courseId],
    }));

    fireCelebration();
    pushToast(
      state.lang === 'ar'
        ? 'تم الالتحاق وإتمام الدورة وتحديث رادار المهارات!'
        : 'Course Completed & Competency Radar Updated!',
      `${course.title[state.lang]} (+${course.xpReward} XP • +${gemsAwarded} 💎)`,
      'success'
    );
  };

  const submitProviderCourse: AppContextValue['submitProviderCourse'] = (input) => {
    const modeLabels: Record<CourseDeliveryMode, BilingualText> = {
      in_person: { ar: 'حضوري', en: 'In-Person' },
      live_online: { ar: 'عن بُعد (مباشر)', en: 'Live Online' },
      recorded: { ar: 'مسجلة', en: 'Recorded' },
      hybrid: { ar: 'مدمج (حضوري + عن بُعد)', en: 'Hybrid' },
    };

    const impacts: Record<string, number> = {};
    (input.selectedSkillIds.length ? input.selectedSkillIds : ['leadership']).forEach(
      (sid) => {
        impacts[sid] = 5;
      }
    );

    const newCourse: TrainingCourse = {
      id: `crs-${Date.now()}`,
      title: { ar: input.titleAr, en: input.titleEn?.trim() || input.titleAr },
      description: { ar: input.descriptionAr, en: input.descriptionAr },
      providerType: input.providerType,
      providerName: { ar: input.providerNameAr, en: input.providerNameAr },
      deliveryMode: input.deliveryMode,
      locationOrLink: { ar: input.locationOrLinkAr, en: input.locationOrLinkAr },
      scheduleDate: { ar: input.scheduleDateAr, en: input.scheduleDateAr },
      durationHours: input.durationHours,
      xpReward: 0,
      originalCostGems: input.suggestedValueGems,
      maeenSupportPercent: 0,
      costGems: input.suggestedValueGems,
      status: 'pending',
      skillImpacts: impacts,
      format: modeLabels[input.deliveryMode],
      priceLabel: {
        ar: 'بانتظار اعتماد مؤسسة معين',
        en: 'Pending Maeen Approval',
      },
    };

    setState((prev) => ({
      ...prev,
      courses: [newCourse, ...prev.courses],
    }));

    pushToast(
      state.lang === 'ar'
        ? 'تم إرسال طلب الدورة لمؤسسة معين الوقفية للاعتماد'
        : 'Course Submitted to Maeen Endowment for Approval',
      newCourse.title[state.lang],
      'info'
    );
  };

  const approveCourseByMaeen: AppContextValue['approveCourseByMaeen'] = (
    courseId,
    config
  ) => {
    const finalCost = Math.max(
      0,
      Math.round(config.originalCostGems * (1 - config.maeenSupportPercent / 100))
    );

    setState((prev) => ({
      ...prev,
      courses: prev.courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              status: 'approved',
              xpReward: config.xpReward,
              originalCostGems: config.originalCostGems,
              maeenSupportPercent: config.maeenSupportPercent,
              costGems: finalCost,
              priceLabel:
                finalCost === 0
                  ? { ar: 'مجانية (0 💎)', en: 'Free (0 💎)' }
                  : config.maeenSupportPercent > 0
                  ? {
                      ar: `${finalCost} 💎 (بدعم ${config.maeenSupportPercent}% من معين)`,
                      en: `${finalCost} 💎 (${config.maeenSupportPercent}% Maeen Support)`,
                    }
                  : { ar: `${finalCost} 💎`, en: `${finalCost} 💎` },
            }
          : c
      ),
    }));

    fireCelebration();
    pushToast(
      state.lang === 'ar'
        ? 'تم اعتماد الدورة من مؤسسة معين الوقفية ونشرها في المتجر!'
        : 'Course Approved by Maeen Endowment & Published to Store!',
      `+${config.xpReward} XP • ${finalCost} 💎`,
      'success'
    );
  };

  const redeemPerk = (perkId: string) => {
    const perk = state.perks.find((p) => p.id === perkId);
    if (!perk || activeAccount.redeemedPerkIds.includes(perkId)) return;
    const currentGems = activeAccount.profile.gemsBalance ?? 0;
    if (currentGems < perk.costGems) {
      pushToast(
        state.lang === 'ar' ? 'رصيد الجواهر غير كافٍ' : 'Insufficient Gems Balance',
        state.lang === 'ar'
          ? 'اجمع 50 نقطة XP للحصول على جوهرة جديدة 💎'
          : 'Earn 50 XP per new Gem 💎',
        'warning'
      );
      return;
    }

    updateActiveAccount((acc) => ({
      ...acc,
      profile: {
        ...acc.profile,
        gemsBalance: (acc.profile.gemsBalance ?? 0) - perk.costGems,
      },
      redeemedPerkIds: [...acc.redeemedPerkIds, perkId],
    }));

    fireCelebration();
    pushToast(
      state.lang === 'ar' ? 'تم استبدال الامتياز بالجواهر بنجاح!' : 'Redeemed with Gems!',
      `${perk.title[state.lang]} (-${perk.costGems} 💎)`,
      'success'
    );
  };

  const startNewSemester = () => {
    updateActiveAccount((acc) => ({
      ...acc,
      profile: {
        ...acc.profile,
        semesterXp: 0,
      },
    }));
    pushToast(
      state.lang === 'ar'
        ? 'تم بدء فصل دراسي جديد! تم تصفير نقاط الفصل مع بقاء جواهرك محفوظة 💎'
        : 'New Semester Started! Semester XP reset while your Gems remain 💎',
      undefined,
      'info'
    );
  };

  const publishCorporateBounty: AppContextValue['publishCorporateBounty'] = (input) => {
    const newQuest: Quest = {
      id: `q-corp-${Date.now()}`,
      title: { ar: input.titleAr, en: input.titleEn || input.titleAr },
      description: {
        ar: input.descriptionAr,
        en: input.descriptionEn || input.descriptionAr,
      },
      category: 'corporate',
      partnerOrCourse: {
        ar: input.partnerAr,
        en: input.partnerEn || input.partnerAr,
      },
      xpReward: input.xpReward,
      skillImpacts: {
        [input.skillId]: 6,
        problem_solving: 4,
      },
      deadline: { ar: 'مفتوح الآن', en: 'Open Now' },
      difficulty: 'flagship',
      completed: false,
    };

    setState((prev) => ({
      ...prev,
      quests: [newQuest, ...prev.quests],
    }));

    pushToast(
      state.lang === 'ar'
        ? 'تم نشر التحدي المؤسسي في سوق مهام الطلبة'
        : 'Corporate Bounty Published to Student Quest Board',
      newQuest.title[state.lang],
      'success'
    );
  };

  const inviteCandidate = (candidateId: string, candidateName: string) => {
    if (state.invitedCandidateIds.includes(candidateId)) return;
    setState((prev) => ({
      ...prev,
      invitedCandidateIds: [...prev.invitedCandidateIds, candidateId],
    }));
    pushToast(
      state.lang === 'ar'
        ? 'تم إرسال دعوة مقابلة توظيف سريعة (Fast-Track)'
        : 'Fast-Track Interview Invite Sent',
      candidateName,
      'success'
    );
  };

  const resetDemo = () => {
    const defaults = getDefaultPersistedState();
    setState((prev) => ({ ...defaults, lang: prev.lang }));
    pushToast(
      state.lang === 'ar' ? 'تمت إعادة ضبط بيانات العرض التجريبي' : 'Demo Data Reset',
      undefined,
      'info'
    );
  };

  // Expose all registered student accounts (excluding public guest) to Employer Portal
  const studentAccountsAsCandidates: CandidateProfile[] = state.accounts
    .filter((acc) => acc.profile.accountType === 'student')
    .map((acc) => ({
      id: acc.profile.id,
      universityId: acc.profile.universityId,
      universityName: acc.profile.universityName,
      name: acc.profile.name,
      college: acc.profile.college,
      major: acc.profile.major,
      gpa: acc.profile.gpa,
      tierXp: acc.profile.tierXp,
      tierId: getTierForXp(acc.profile.tierXp).id,
      skills: acc.skillScores,
      completedBounties: state.quests
        .filter((q) => acc.completedQuestIds.includes(q.id))
        .map((q) => q.title),
      verifiedArtifacts: state.quests
        .filter((q) => acc.completedQuestIds.includes(q.id) && q.evidenceSubmitted)
        .map((q) => ({
          title: q.title,
          issuer: q.partnerOrCourse,
          hash: q.evidenceSubmitted!.hash,
        })),
    }));

  const candidates: CandidateProfile[] = [
    ...studentAccountsAsCandidates,
    ...INITIAL_CANDIDATES,
  ].map((c) => ({
    ...c,
    invited: state.invitedCandidateIds.includes(c.id),
  }));

  return (
    <AppContext.Provider
      value={{
        lang: state.lang,
        setLang,
        toggleLang,
        t,
        activeTab,
        setActiveTab,
        activeAccountId: state.activeAccountId,
        accounts: state.accounts,
        switchAccount,
        registerStudentAccount,
        student,
        skillScores,
        quests,
        courses,
        perks,
        candidates,
        invitedCandidateIds: state.invitedCandidateIds,
        toasts,
        dismissToast,
        pushToast,
        completeQuest,
        completeCourse,
        buyGemPack,
        submitProviderCourse,
        approveCourseByMaeen,
        redeemPerk,
        startNewSemester,
        publishCorporateBounty,
        inviteCandidate,
        resetDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
