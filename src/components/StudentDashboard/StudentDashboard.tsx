import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  Crown,
  FileCheck2,
  Gem,
  Gift,
  HeartHandshake,
  Lock,
  Sparkles,
  TrendingUp,
  Upload,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SKILLS_DATA, TIERS, getTierForXp } from '../../data/uonData';
import { Quest, QuestCategory } from '../../types/uon';
import { SkillRadarChart } from '../SkillRadarChart';
import { PeerBenchmarkCurve } from './PeerBenchmarkCurve';

export const StudentDashboard: React.FC = () => {
  const {
    lang,
    t,
    student,
    skillScores,
    quests,
    perks,
    completeQuest,
    redeemPerk,
  } = useApp();

  const [questFilter, setQuestFilter] = useState<'all' | QuestCategory>('all');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [fileName, setFileName] = useState('UoN_Verified_Project_Report.pdf');
  const [reflection, setReflection] = useState('');

  const currentTier = getTierForXp(student.tierXp);
  const nextTier = TIERS.find((item) => item.minXp > student.tierXp);
  const overallAvg = Math.round(
    Object.values(skillScores).reduce((a, b) => a + b, 0) /
      Math.max(1, Object.values(skillScores).length)
  );
  const badgesEarned = SKILLS_DATA.filter(
    (s) => (skillScores[s.id] ?? s.initialScore) >= 80
  ).length;

  const filteredQuests = quests.filter((q) =>
    questFilter === 'all' ? true : q.category === questFilter
  );

  const handleConfirmQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuest) return;
    completeQuest(
      selectedQuest.id,
      fileName.trim() || 'evidence_artifact.pdf',
      reflection.trim() ||
        (lang === 'ar'
          ? 'تم تنفيذ المخرجات وتوثيق الأدلة وفق معايير جامعة نزوى.'
          : 'Deliverables executed and verified against UoN competency standards.')
    );
    setSelectedQuest(null);
    setReflection('');
  };

  const categoryBadge = (cat: QuestCategory) => {
    if (cat === 'corporate') {
      return {
        label: lang === 'ar' ? 'تحدي شركات' : 'Corporate Bounty',
        cls: 'bg-[#FDF8EA] text-[#9E7B1C] border-[#C59B27]/40',
        icon: <Briefcase className="w-3.5 h-3.5" />,
      };
    }
    if (cat === 'co_curricular') {
      return {
        label: lang === 'ar' ? 'تطوع ولاصفي' : 'Co-Curricular',
        cls: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        icon: <HeartHandshake className="w-3.5 h-3.5" />,
      };
    }
    return {
      label: lang === 'ar' ? 'مساق أكاديمي' : 'Curricular',
      cls: 'bg-slate-100 text-[#0F3D3E] border-slate-200',
      icon: <BookOpen className="w-3.5 h-3.5" />,
    };
  };

  return (
    <div className="space-y-6">
      {/* Hero Profile Card + 4-Tier Progression */}
      <section className="rounded-3xl emerald-gradient text-white p-6 sm:p-8 shadow-lg border border-[#C59B27]/30 relative overflow-hidden">
        <div className="absolute -top-24 -end-24 w-72 h-72 rounded-full bg-[#C59B27]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
          {/* Student Identity */}
          <div className="xl:col-span-5 flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-[#C59B27] flex items-center justify-center text-2xl font-display font-bold text-[#FDF8EA] shrink-0 shadow-inner">
              {student.avatarInitials}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold gold-emboss text-[#0A2B2C] shadow-sm">
                  <Crown className="w-3.5 h-3.5" />
                  {t(currentTier.name)}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-emerald-100 border border-white/15">
                  ID: {student.id}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-100 border border-emerald-300/30">
                  {student.accountType === 'public'
                    ? lang === 'ar'
                      ? 'حساب عام (استكشاف)'
                      : 'Public Explorer'
                    : lang === 'ar'
                    ? 'اشتراك سنوي: 5 ر.ع'
                    : 'Plan: 5 OMR/yr'}
                </span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                {t(student.name)}
              </h1>
              <p className="text-sm text-emerald-100/90">
                {t(student.universityName)} • {t(student.major)} • {t(student.college)}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-emerald-100/90">
                <span>
                  {lang === 'ar' ? 'المعدل التراكمي:' : 'GPA:'}{' '}
                  <strong className="text-white">{student.gpa.toFixed(2)}</strong>
                </span>
                <span>
                  {lang === 'ar' ? 'ساعات التطوع:' : 'Volunteering:'}{' '}
                  <strong className="text-white">{student.volunteeringHours}h</strong>
                </span>
                <span>
                  {lang === 'ar' ? 'الشارات الموثقة:' : 'Verified Badges:'}{' '}
                  <strong className="text-[#E5C158]">{badgesEarned}/11</strong>
                </span>
              </div>
            </div>
          </div>

          {/* XP Metrics & 4-Tier Progression Track */}
          <div className="xl:col-span-7 bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/15">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-emerald-100/80">
                  {lang === 'ar'
                    ? 'إجمالي نقاط المسار (Octalysis XP)'
                    : 'Total Progression XP'}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#E5C158]">
                    {student.tierXp.toLocaleString()} XP
                  </span>
                  {nextTier ? (
                    <span className="text-xs text-emerald-100/80">
                      {lang === 'ar'
                        ? `متبقي ${(nextTier.minXp - student.tierXp).toLocaleString()} XP للوصول إلى "${nextTier.name.ar}"`
                        : `${(nextTier.minXp - student.tierXp).toLocaleString()} XP to "${nextTier.name.en}"`}
                    </span>
                  ) : (
                    <span className="text-xs text-[#E5C158] font-semibold">
                      {lang === 'ar'
                        ? 'تم تفعيل الختم الذهبي على الشهادة!'
                        : 'Gold Diploma Seal Unlocked!'}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs">
                  <span className="text-emerald-100/80">
                    {lang === 'ar' ? 'نقاط الفصل:' : 'Semester:'}{' '}
                  </span>
                  <strong className="text-white">
                    {(student.semesterXp ?? student.tierXp).toLocaleString()} XP
                  </strong>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#C59B27]/25 border border-[#E5C158]/50 text-xs flex items-center gap-1.5">
                  <Gem className="w-3.5 h-3.5 text-[#E5C158]" />
                  <strong className="text-[#FDF8EA]">
                    {student.gemsBalance ?? 0} {lang === 'ar' ? 'جوهرة' : 'Gems'}
                  </strong>
                </div>
              </div>
            </div>

            {/* 4-Tier Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TIERS.map((tier, idx) => {
                const reached = student.tierXp >= tier.minXp;
                const isCurrent = currentTier.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    className={`rounded-xl p-2.5 border transition-all ${
                      isCurrent
                        ? 'bg-[#C59B27]/25 border-[#E5C158] shadow-sm'
                        : reached
                        ? 'bg-emerald-500/20 border-emerald-300/40'
                        : 'bg-black/15 border-white/10 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-white">
                        {idx + 1}. {t(tier.name)}
                      </span>
                      {reached ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C158]" />
                      ) : (
                        <Lock className="w-3 h-3 text-white/50" />
                      )}
                    </div>
                    <p className="text-[10px] text-emerald-100/80">
                      {tier.maxXp
                        ? `${tier.minXp.toLocaleString()}–${tier.maxXp.toLocaleString()} XP`
                        : `${tier.minXp.toLocaleString()}+ XP`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Peer Benchmarking Curve (Section / Program / Platform) */}
      <PeerBenchmarkCurve />

      {/* Main Grid: Live Radar Chart + Summary KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live 11-Skill Radar Chart */}
        <section className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-[#0F3D3E]">
                {lang === 'ar'
                  ? 'رادار الكفاءات الحي (11 مهارة قرن 21)'
                  : 'Live 11-Skill Competency Radar'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'ar'
                  ? 'مقارنة معيارية مع الإطار العُماني للمؤهلات OQF ومستهدف WEF 2030'
                  : 'Benchmarked against Oman Qualifications Framework (OQF) & WEF 2030'}
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <TrendingUp className="w-4 h-4 text-[#0F3D3E]" />
              <span className="text-xs font-bold text-[#0F3D3E]">
                {lang === 'ar' ? `المتوسط العام: ${overallAvg}%` : `Overall Index: ${overallAvg}%`}
              </span>
            </div>
          </div>
          <SkillRadarChart />
        </section>

        {/* XP Perks Store */}
        <section className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-[#0F3D3E] flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#C59B27]" />
                {lang === 'ar'
                  ? 'متجر خصومات الدورات والامتيازات'
                  : 'Courses Discount & Perks Store'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'ar'
                  ? 'استبدل نقاطك بخصومات دورات ممولة من الشركاء وامتيازات جامعية'
                  : 'Redeem XP for partner-funded course discounts & academic perks'}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#FDF8EA] text-[#9E7B1C] border border-[#C59B27]/30 text-xs font-bold inline-flex items-center gap-1">
              <Gem className="w-3.5 h-3.5 text-[#C59B27]" />
              {student.gemsBalance ?? 0} 💎
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {perks.map((perk) => {
              const canAfford = (student.gemsBalance ?? 0) >= perk.costGems;
              return (
                <div
                  key={perk.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    perk.redeemed
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-slate-50/70 border-slate-200/80 hover:border-[#C59B27]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                        {t(perk.category)}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        {t(perk.title)}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {t(perk.description)}
                      </p>
                    </div>
                    <button
                      disabled={perk.redeemed || !canAfford}
                      onClick={() => redeemPerk(perk.id)}
                      className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer inline-flex items-center gap-1 ${
                        perk.redeemed
                          ? 'bg-emerald-600 text-white cursor-default'
                          : canAfford
                          ? 'bg-[#0F3D3E] text-white hover:bg-[#165254]'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {perk.redeemed ? (
                        lang === 'ar' ? 'تم الاستبدال ✓' : 'Redeemed ✓'
                      ) : (
                        <>
                          {perk.costGems} 💎
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Active Quests & Corporate Bounties */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="font-display text-lg font-bold text-[#0F3D3E] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#C59B27]" />
              {lang === 'ar'
                ? 'سوق التحديات والمهام الحية'
                : 'Active Quests & Corporate Bounties'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'وثّق إنجازك لرفع نسب المهارات على الرادار فوراً وفتح شارات الكفاءة (≥ 80%)'
                : 'Verify deliverables to boost radar skill scores in real time & unlock badges (≥ 80%)'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(
              [
                { id: 'all', ar: 'الكل', en: 'All' },
                { id: 'corporate', ar: 'تحديات الشركات', en: 'Corporate' },
                { id: 'co_curricular', ar: 'التطوع واللاصفي', en: 'Co-Curricular' },
                { id: 'curricular', ar: 'المساقات', en: 'Curricular' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setQuestFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  questFilter === tab.id
                    ? 'bg-[#0F3D3E] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'ar' ? tab.ar : tab.en}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredQuests.map((quest) => {
            const badge = categoryBadge(quest.category);
            return (
              <div
                key={quest.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                  quest.completed
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-[#0F3D3E]/40 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${badge.cls}`}
                    >
                      {badge.icon}
                      {badge.label}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FDF8EA] text-[#9E7B1C] border border-[#C59B27]/40">
                      <Sparkles className="w-3 h-3" />+{quest.xpReward} XP
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-900 mb-1.5">
                    {t(quest.title)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {t(quest.description)}
                  </p>

                  {/* Skill Boost Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {Object.entries(quest.skillImpacts).map(([skillId, boost]) => {
                      const skillDef = SKILLS_DATA.find((s) => s.id === skillId);
                      if (!skillDef) return null;
                      return (
                        <span
                          key={skillId}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-[#0F3D3E]"
                        >
                          {t(skillDef.shortName)} +{boost}%
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium truncate">{t(quest.partnerOrCourse)}</span>
                    <span className="inline-flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {t(quest.deadline)}
                    </span>
                  </div>

                  {quest.completed ? (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-100/80 text-emerald-900 text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <FileCheck2 className="w-4 h-4" />
                        {lang === 'ar' ? 'تم التوثيق والاعتماد' : 'Verified & Credited'}
                      </span>
                      <span className="font-mono text-[10px] opacity-80">
                        {quest.evidenceSubmitted?.hash}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedQuest(quest)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0F3D3E] hover:bg-[#165254] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-[#E5C158]" />
                      {lang === 'ar'
                        ? 'إنجاز المهمة وتوثيق الدليل'
                        : 'Complete & Verify Evidence'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Evidence Submission Modal */}
      {selectedQuest && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-[11px] font-bold text-[#C59B27] uppercase tracking-wider">
                  {lang === 'ar' ? 'توثيق الدليل الرقمي' : 'Digital Evidence Verification'}
                </span>
                <h3 className="font-display text-lg font-bold text-[#0F3D3E] mt-0.5">
                  {t(selectedQuest.title)}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuest(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmQuest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'ar'
                    ? 'ملف الإنجاز أو رابط المشروع الموثق'
                    : 'Deliverable File or Verified Artifact'}
                </label>
                <div className="flex items-center gap-2 p-3 rounded-xl border border-dashed border-[#0F3D3E]/40 bg-slate-50">
                  <Upload className="w-4 h-4 text-[#0F3D3E] shrink-0" />
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'ar'
                    ? 'ملخص الأثر والمهارات المكتسبة (اختياري)'
                    : 'Reflection & Impact Summary (Optional)'}
                </label>
                <textarea
                  rows={3}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'صف بإيجاز المنهجية التي طبقتها والنتائج التي تم تحقيقها...'
                      : 'Briefly describe your methodology and verified outcomes...'
                  }
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:outline-none focus:border-[#0F3D3E]"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[11px]">
                <p className="font-bold text-[#0F3D3E]">
                  {lang === 'ar'
                    ? 'مسار التحقق ثلاثي الطبقات (Anti-Fraud):'
                    : '3-Layer Anti-Fraud Verification Pipeline:'}
                </p>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-semibold">
                    1. AI Pre-Check
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#FDF8EA] text-[#9E7B1C] font-semibold">
                    2. OTP / QR Sign-off
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-200/70 text-slate-800 font-semibold">
                    3. Audit Hash
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FDF8EA] border border-[#C59B27]/30 text-xs text-[#9E7B1C] flex items-center justify-between">
                <span>
                  {lang === 'ar' ? 'المكافأة الفورية عند الاعتماد:' : 'Instant Reward:'}
                </span>
                <strong className="text-[#0F3D3E]">+{selectedQuest.xpReward} XP</strong>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedQuest(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F3D3E] hover:bg-[#165254] text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  {lang === 'ar' ? 'اعتماد وإصدار النقاط' : 'Verify & Claim XP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
