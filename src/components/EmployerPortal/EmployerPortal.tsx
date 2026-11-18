import React, { useState } from 'react';
import {
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle2,
  Crown,
  Filter,
  PlusCircle,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SKILLS_DATA, TIERS, UNIVERSITIES } from '../../data/uonData';
import { TierInfo } from '../../types/uon';
import { SkillRadarChart } from '../SkillRadarChart';

export const EmployerPortal: React.FC = () => {
  const {
    lang,
    t,
    candidates,
    inviteCandidate,
    publishCorporateBounty,
  } = useApp();

  const [tierFilter, setTierFilter] = useState<'all' | TierInfo['id']>('all');
  const [universityFilter, setUniversityFilter] = useState<string>('all');
  const [minCritical, setMinCritical] = useState<number>(75);
  const [minLeadership, setMinLeadership] = useState<number>(75);
  const [onlyBountyHolders, setOnlyBountyHolders] = useState<boolean>(false);
  const [showPostModal, setShowPostModal] = useState<boolean>(false);

  // Post New Corporate Bounty Form State
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [partnerAr, setPartnerAr] = useState('شركة تنمية نفط عُمان (PDO)');
  const [partnerEn, setPartnerEn] = useState('Petroleum Development Oman (PDO)');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [xpReward, setXpReward] = useState(350);
  const [skillId, setSkillId] = useState('critical_thinking');

  const filteredCandidates = candidates.filter((cand) => {
    if (tierFilter !== 'all' && cand.tierId !== tierFilter) return false;
    if (universityFilter !== 'all' && cand.universityId !== universityFilter)
      return false;
    if ((cand.skills.critical_thinking ?? 0) < minCritical) return false;
    if ((cand.skills.leadership ?? 0) < minLeadership) return false;
    if (onlyBountyHolders && cand.completedBounties.length === 0) return false;
    return true;
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim()) return;
    publishCorporateBounty({
      titleAr: titleAr.trim(),
      titleEn: titleEn.trim() || titleAr.trim(),
      partnerAr,
      partnerEn,
      descriptionAr:
        descriptionAr.trim() ||
        'تحدي تطبيقي مباشر من شريك القطاع لتقييم جاهزية الطلبة وحل مشكلات العمل الحقيقية.',
      descriptionEn:
        descriptionAr.trim() ||
        'Direct industry partner challenge assessing student readiness on real operational problems.',
      xpReward,
      skillId,
    });
    setTitleAr('');
    setTitleEn('');
    setDescriptionAr('');
    setShowPostModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FDF8EA] border border-[#C59B27]/30 text-[#9E7B1C] text-[11px] font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            {lang === 'ar'
              ? 'شركاء الاستقطاب: OQ • بنك العز الإسلامي • عمانتل • PDO'
              : 'Recruitment Partners: OQ • Alizz Islamic Bank • Omantel • PDO'}
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D3E]">
            {lang === 'ar'
              ? 'بوابة جهات التوظيف والاستقطاب المبني على المهارات'
              : 'Skills-First Employer Talent Matchmaker Portal'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {lang === 'ar'
              ? 'ابحث عن خريجي جامعة نزوى وفق نسب الإتقان الموثقة في مهارات القرن الـ 21 والتحديات المؤسسية المنجزة.'
              : 'Filter UoN graduates by verified 21st-century skill mastery, competency tier, and completed corporate bounties.'}
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F3D3E] hover:bg-[#165254] text-white text-xs font-bold shadow-sm transition cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#E5C158]" />
          {lang === 'ar'
            ? 'نشر تحدي مؤسسي جديد (Bounty)'
            : 'Post New Corporate Bounty'}
        </button>
      </section>

      {/* Skills-First Filtering Engine */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-sm font-display font-bold text-[#0F3D3E]">
          <SlidersHorizontal className="w-4 h-4 text-[#C59B27]" />
          {lang === 'ar'
            ? 'محرك الفرز الذكي بالكفاءات (Skills-First Engine)'
            : 'Skills-First Filtering Engine'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* University Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {lang === 'ar' ? 'الجامعة' : 'University'}
            </label>
            <select
              value={universityFilter}
              onChange={(e) => setUniversityFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0F3D3E]"
            >
              <option value="all">
                {lang === 'ar' ? 'جميع الجامعات' : 'All Universities'}
              </option>
              {UNIVERSITIES.map((u) => (
                <option key={u.id} value={u.id}>
                  {t(u.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Tier Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {lang === 'ar' ? 'مستوى الجدارة (Tier)' : 'Competency Tier'}
            </label>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as 'all' | TierInfo['id'])}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0F3D3E]"
            >
              <option value="all">
                {lang === 'ar' ? 'جميع المستويات' : 'All Tiers'}
              </option>
              {TIERS.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {t(tier.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Min Critical Thinking */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>{lang === 'ar' ? 'التفكير الناقد ≥' : 'Critical Thinking ≥'}</span>
              <span className="text-[#0F3D3E]">{minCritical}%</span>
            </div>
            <input
              type="range"
              min={60}
              max={95}
              value={minCritical}
              onChange={(e) => setMinCritical(Number(e.target.value))}
              className="uon-slider w-full"
            />
          </div>

          {/* Min Leadership */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>{lang === 'ar' ? 'القيادة ≥' : 'Leadership ≥'}</span>
              <span className="text-[#0F3D3E]">{minLeadership}%</span>
            </div>
            <input
              type="range"
              min={60}
              max={95}
              value={minLeadership}
              onChange={(e) => setMinLeadership(Number(e.target.value))}
              className="uon-slider w-full"
            />
          </div>

          {/* Corporate Bounties Only */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <label
              htmlFor="bounty-toggle"
              className="text-xs font-semibold text-slate-700 cursor-pointer"
            >
              {lang === 'ar'
                ? 'منجزو تحديات الشركات فقط'
                : 'Completed Bounties Only'}
            </label>
            <input
              id="bounty-toggle"
              type="checkbox"
              checked={onlyBountyHolders}
              onChange={(e) => setOnlyBountyHolders(e.target.checked)}
              className="w-4 h-4 accent-[#0F3D3E] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* Candidate Cards Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="flex items-center gap-1.5 font-semibold">
            <Filter className="w-3.5 h-3.5 text-[#0F3D3E]" />
            {lang === 'ar'
              ? `عدد المرشحين المطابقين: ${filteredCandidates.length}`
              : `Matching Graduates: ${filteredCandidates.length}`}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredCandidates.map((cand) => {
            const tierObj = TIERS.find((x) => x.id === cand.tierId) ?? TIERS[0];
            const topBadges = SKILLS_DATA.filter(
              (s) => (cand.skills[s.id] ?? 0) >= 85
            ).slice(0, 3);

            return (
              <div
                key={cand.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Info */}
                  <div className="sm:col-span-7 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          cand.tierId === 'fellow'
                            ? 'gold-emboss text-[#0A2B2C]'
                            : 'bg-[#0F3D3E] text-white'
                        }`}
                      >
                        <Crown className="w-3 h-3" />
                        {t(tierObj.name)}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        GPA {cand.gpa.toFixed(2)} • {cand.tierXp.toLocaleString()} XP
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-lg text-[#0F3D3E]">
                        {t(cand.name)}
                      </h3>
                      <p className="text-xs font-semibold text-[#9E7B1C]">
                        {t(cand.universityName)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {t(cand.major)} • {t(cand.college)}
                      </p>
                    </div>

                    {/* Top Verified Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {topBadges.map((b) => (
                        <span
                          key={b.id}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold"
                        >
                          <BadgeCheck className="w-3 h-3" />
                          {t(b.shortName)} {cand.skills[b.id]}%
                        </span>
                      ))}
                    </div>

                    {/* Verified Artifacts */}
                    {cand.verifiedArtifacts.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#C59B27]" />
                          {lang === 'ar' ? 'أدلة مشاريع موثقة:' : 'Verified Project Artifacts:'}
                        </p>
                        {cand.verifiedArtifacts.map((art, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-[11px]"
                          >
                            <span className="font-semibold text-slate-800 truncate">
                              {t(art.title)}
                            </span>
                            <span className="font-mono text-[10px] text-emerald-700 shrink-0 ms-2">
                              {art.hash}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mini Radar Snapshot */}
                  <div className="sm:col-span-5 bg-slate-50/70 rounded-2xl p-2 border border-slate-100">
                    <SkillRadarChart
                      scores={cand.skills}
                      compact
                      showBenchmarks={false}
                    />
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#C59B27]" />
                    {lang === 'ar'
                      ? `${cand.completedBounties.length} تحديات قطاعية منجزة`
                      : `${cand.completedBounties.length} Corporate Bounties`}
                  </span>

                  <button
                    disabled={cand.invited}
                    onClick={() => inviteCandidate(cand.id, t(cand.name))}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      cand.invited
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-[#0F3D3E] hover:bg-[#165254] text-white shadow-2xs'
                    }`}
                  >
                    {cand.invited ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        {lang === 'ar' ? 'تم إرسال الدعوة ✓' : 'Invited ✓'}
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#E5C158]" />
                        {lang === 'ar'
                          ? 'دعوة لمقابلة توظيف مباشرة'
                          : 'Fast-Track Interview Invite'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Post New Corporate Bounty Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-[11px] font-bold text-[#C59B27]">
                  {lang === 'ar'
                    ? 'بوابة شركاء سوق العمل'
                    : 'Corporate Partner Publishing'}
                </span>
                <h3 className="font-display text-lg font-bold text-[#0F3D3E]">
                  {lang === 'ar'
                    ? 'نشر تحدي مؤسسي جديد للطلبة'
                    : 'Publish New Corporate Bounty'}
                </h3>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان التحدي (بالعربية)' : 'Bounty Title (Arabic)'}
                </label>
                <input
                  required
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'مثال: تصميم لوحة ذكاء أعمال لسلاسل الإمداد'
                      : 'e.g., Supply Chain BI Dashboard Challenge'
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-[#0F3D3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar'
                    ? 'عنوان التحدي (بالإنجليزية - اختياري)'
                    : 'Bounty Title (English - Optional)'}
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="Supply Chain BI Dashboard Challenge"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-[#0F3D3E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الجهة الشريكة' : 'Partner Organization'}
                  </label>
                  <select
                    value={partnerAr}
                    onChange={(e) => {
                      setPartnerAr(e.target.value);
                      setPartnerEn(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-slate-50"
                  >
                    <option value="شركة تنمية نفط عُمان (PDO)">
                      PDO - تنمية نفط عُمان
                    </option>
                    <option value="مجموعة أوكيو (OQ Group)">
                      OQ Group - مجموعة أوكيو
                    </option>
                    <option value="بنك العز الإسلامي (Alizz)">
                      Alizz Islamic Bank - بنك العز
                    </option>
                    <option value="عمانتل (Omantel)">Omantel - عمانتل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المهارة المستهدفة' : 'Target 21st Skill'}
                  </label>
                  <select
                    value={skillId}
                    onChange={(e) => setSkillId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-slate-50"
                  >
                    {SKILLS_DATA.map((s) => (
                      <option key={s.id} value={s.id}>
                        {t(s.shortName)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'وصف التحدي والمطلوب' : 'Challenge Scope'}
                </label>
                <textarea
                  rows={2}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none focus:border-[#0F3D3E]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>{lang === 'ar' ? 'مكافأة النقاط (XP)' : 'XP Reward'}</span>
                  <span className="text-[#0F3D3E] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />+{xpReward} XP
                  </span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={600}
                  step={50}
                  value={xpReward}
                  onChange={(e) => setXpReward(Number(e.target.value))}
                  className="uon-slider w-full"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F3D3E] hover:bg-[#165254] text-white text-xs font-bold cursor-pointer"
                >
                  {lang === 'ar'
                    ? 'نشر في سوق مهام الطلبة'
                    : 'Publish to Quest Board'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
