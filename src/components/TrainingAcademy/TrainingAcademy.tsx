import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Gem,
  HeartHandshake,
  Info,
  MapPin,
  PlusCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GEM_PACKS, SKILLS_DATA } from '../../data/uonData';
import { CourseDeliveryMode, CourseProviderType } from '../../types/uon';

type StoreSubView = 'store' | 'provider_submit' | 'maeen_admin';

export const TrainingAcademy: React.FC = () => {
  const {
    lang,
    t,
    student,
    courses,
    completeCourse,
    buyGemPack,
    submitProviderCourse,
    approveCourseByMaeen,
  } = useApp();

  const [subView, setSubView] = useState<StoreSubView>('store');
  const [providerFilter, setProviderFilter] = useState<'all' | CourseProviderType>('all');
  const [pricingFilter, setPricingFilter] = useState<'all' | 'free' | 'gems'>('all');

  // Provider Submission Form State (NO XP / Support controls — those belong to Maeen!)
  const [titleAr, setTitleAr] = useState('');
  const [providerType, setProviderType] =
    useState<CourseProviderType>('nizwa_academy');
  const [providerNameAr, setProviderNameAr] = useState(
    'أكاديمية نزوى للتدريب والتطوير'
  );
  const [descriptionAr, setDescriptionAr] = useState('');
  const [deliveryMode, setDeliveryMode] =
    useState<CourseDeliveryMode>('live_online');
  const [locationOrLinkAr, setLocationOrLinkAr] = useState(
    'عن بُعد عبر منصة البث المباشر'
  );
  const [scheduleDateAr, setScheduleDateAr] = useState('10–14 فبراير 2027');
  const [durationHours, setDurationHours] = useState(16);
  const [suggestedValueGems, setSuggestedValueGems] = useState(50);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([
    'critical_thinking',
    'leadership',
  ]);

  // Maeen Admin Approval State (per pending course id)
  const [adminConfigs, setAdminConfigs] = useState<
    Record<
      string,
      { xpReward: number; originalCostGems: number; maeenSupportPercent: number }
    >
  >({});

  const gemsBalance = student.gemsBalance ?? 0;
  const approvedCourses = courses.filter((c) => c.status === 'approved');
  const pendingCourses = courses.filter((c) => c.status === 'pending');

  const filteredCourses = approvedCourses.filter((c) => {
    if (providerFilter !== 'all' && c.providerType !== providerFilter) return false;
    if (pricingFilter === 'free' && c.costGems > 0) return false;
    if (pricingFilter === 'gems' && c.costGems === 0) return false;
    return true;
  });

  const toggleSkill = (sid: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid]
    );
  };

  const handleProviderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim()) return;
    submitProviderCourse({
      titleAr: titleAr.trim(),
      providerType,
      providerNameAr,
      descriptionAr:
        descriptionAr.trim() ||
        'برنامج تدريبي تطبيقي متخصص في مهارات القرن الحادي والعشرين.',
      deliveryMode,
      locationOrLinkAr,
      scheduleDateAr,
      durationHours,
      suggestedValueGems,
      selectedSkillIds,
    });
    setTitleAr('');
    setDescriptionAr('');
    setSubView('maeen_admin');
  };

  const getAdminConfig = (courseId: string, defaultCost: number) => {
    return (
      adminConfigs[courseId] ?? {
        xpReward: 250,
        originalCostGems: defaultCost,
        maeenSupportPercent: 5,
      }
    );
  };

  const updateAdminConfig = (
    courseId: string,
    defaultCost: number,
    patch: Partial<{
      xpReward: number;
      originalCostGems: number;
      maeenSupportPercent: number;
    }>
  ) => {
    const current = getAdminConfig(courseId, defaultCost);
    setAdminConfigs((prev) => ({
      ...prev,
      [courseId]: { ...current, ...patch },
    }));
  };

  const providerBadge = (type: CourseProviderType) => {
    if (type === 'nizwa_academy') {
      return {
        label:
          lang === 'ar'
            ? 'أكاديمية نزوى للتدريب والتطوير'
            : 'Nizwa Training Academy',
        cls: 'bg-[#FDF8EA] text-[#9E7B1C] border-[#C59B27]/40',
      };
    }
    if (type === 'smart_platform') {
      return {
        label:
          lang === 'ar' ? 'منصة بصمة معين الذكية' : 'Maeen Smart Footprint',
        cls: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    }
    return {
      label:
        lang === 'ar'
          ? 'جامعة نزوى والجامعات المتعاونة'
          : 'Partner Universities',
      cls: 'bg-slate-100 text-[#0F3D3E] border-slate-200',
    };
  };

  return (
    <div className="space-y-6">
      {/* Header + 3-Role Switcher (Student Store | Provider Submit | Maeen Admin) */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FDF8EA] border border-[#C59B27]/30 text-[#9E7B1C] text-[11px] font-bold mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              {lang === 'ar'
                ? 'متجر الدورات المدعوم وقفياً من مؤسسة معين • 1 جوهرة ≈ 1 ر.ع'
                : 'Endowment-Supported Courses Store • 1 Gem ≈ 1 OMR'}
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D3E]">
              {lang === 'ar'
                ? 'متجر الدورات التدريبية واعتماد مؤسسة معين الوقفية'
                : 'Training Store & Maeen Endowment Governance'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'ar'
                ? 'تدعم مؤسسة معين الوقفية الدورات المعتمدة (مثل 5% أو 10%)، وتتحكم حصرياً في اعتماد الدورات وتحديد نقاطها وجواهرها.'
                : 'Maeen Endowment subsidizes approved courses (e.g., 5%–10%) and exclusively governs course approval, XP, and Gem pricing.'}
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-[#FDF8EA] border border-[#C59B27]/40 flex items-center gap-2 shrink-0">
            <Gem className="w-5 h-5 text-[#C59B27]" />
            <div>
              <p className="text-[10px] text-[#9E7B1C] font-bold">
                {lang === 'ar' ? 'رصيدك الحالي' : 'Your Balance'}
              </p>
              <p className="font-display font-extrabold text-base text-[#0F3D3E]">
                {gemsBalance} 💎
              </p>
            </div>
          </div>
        </div>

        {/* Sub-View Role Tabs */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => setSubView('store')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              subView === 'store'
                ? 'bg-[#0F3D3E] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {lang === 'ar' ? 'متجر الطلاب والدورات' : 'Student Courses Store'}
          </button>

          <button
            onClick={() => setSubView('provider_submit')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              subView === 'provider_submit'
                ? 'bg-[#0F3D3E] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            {lang === 'ar'
              ? 'تسجيل دورة (بوابة الجهات التدريبية)'
              : 'Submit Course (Training Providers)'}
          </button>

          <button
            onClick={() => setSubView('maeen_admin')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              subView === 'maeen_admin'
                ? 'bg-[#0F3D3E] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
            {lang === 'ar'
              ? 'اعتماد مؤسسة معين الوقفية'
              : 'Maeen Endowment Approval'}
            {pendingCourses.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#C59B27] text-[#0A2B2C] text-[10px] font-extrabold">
                {pendingCourses.length}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* VIEW 1: STUDENT STORE */}
      {subView === 'store' && (
        <>
          {/* Buy Gems Packs Section */}
          <section className="rounded-3xl emerald-gradient text-white p-6 shadow-md border border-[#C59B27]/30 space-y-4">
            <div>
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <Gem className="w-5 h-5 text-[#E5C158]" />
                {lang === 'ar'
                  ? 'شراء باقات الجواهر (1 جوهرة = 1 ر.ع)'
                  : 'Purchase Gem Packs (1 Gem = 1 OMR)'}
              </h2>
              <p className="text-xs text-emerald-100/85 mt-0.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
                {lang === 'ar'
                  ? 'الجواهر لشراء الدورات التدريبية فقط، بينما يعتمد ترتيبك على المنحنى على النقاط الفصلية (XP) حصراً.'
                  : 'Gems are strictly for purchasing courses; peer leaderboard rank depends solely on Semester XP.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {GEM_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 flex items-center justify-between gap-3 hover:border-[#E5C158] transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-xl text-[#E5C158]">
                        {pack.gems} 💎
                      </span>
                      {pack.savingsLabel && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/40 text-[10px] font-bold text-white">
                          {t(pack.savingsLabel)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-100 mt-0.5">
                      {t(pack.label)}
                    </p>
                  </div>
                  <button
                    onClick={() => buyGemPack(pack.id)}
                    className="px-4 py-2 rounded-xl gold-emboss text-[#0A2B2C] text-xs font-extrabold shadow-sm hover:opacity-95 transition cursor-pointer shrink-0"
                  >
                    {pack.priceOmr} {lang === 'ar' ? 'ر.ع' : 'OMR'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: 'all', ar: 'جميع الجهات', en: 'All Providers' },
                  {
                    id: 'nizwa_academy',
                    ar: 'أكاديمية نزوى للتدريب',
                    en: 'Nizwa Academy',
                  },
                  {
                    id: 'university',
                    ar: 'الجامعات المتعاونة',
                    en: 'Universities',
                  },
                  {
                    id: 'smart_platform',
                    ar: 'بصمة معين الذكية',
                    en: 'Maeen Platform',
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setProviderFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    providerFilter === tab.id
                      ? 'bg-[#0F3D3E] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lang === 'ar' ? tab.ar : tab.en}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0">
              {(
                [
                  { id: 'all', ar: 'الكل', en: 'All' },
                  { id: 'free', ar: 'مجانية (0 💎)', en: 'Free (0 💎)' },
                  { id: 'gems', ar: 'بالجواهر (💎)', en: 'Paid in Gems' },
                ] as const
              ).map((pf) => (
                <button
                  key={pf.id}
                  onClick={() => setPricingFilter(pf.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    pricingFilter === pf.id
                      ? 'bg-white text-[#0F3D3E] shadow-2xs'
                      : 'text-slate-600'
                  }`}
                >
                  {lang === 'ar' ? pf.ar : pf.en}
                </button>
              ))}
            </div>
          </div>

          {/* Approved Courses Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCourses.map((course) => {
              const badge = providerBadge(course.providerType);
              const isFree = course.costGems === 0;
              const hasSupport = course.maeenSupportPercent > 0;
              const canAfford = isFree || gemsBalance >= course.costGems;
              return (
                <div
                  key={course.id}
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                    course.completed
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-white border-slate-200/90 hover:shadow-md hover:border-[#0F3D3E]/40'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.cls}`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        {t(course.providerName)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {hasSupport && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <HeartHandshake className="w-3.5 h-3.5 text-[#0F3D3E]" />
                            {lang === 'ar'
                              ? `بدعم ${course.maeenSupportPercent}% من مؤسسة معين`
                              : `${course.maeenSupportPercent}% Maeen Support`}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-[#0F3D3E]">
                          <Sparkles className="w-3 h-3 text-[#C59B27]" />+
                          {course.xpReward} XP
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#0F3D3E] mb-2">
                      {t(course.title)}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {t(course.description)}
                    </p>

                    {/* Delivery Mode, Location & Schedule */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/70 mb-3">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                        {t(course.locationOrLink)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0F3D3E] shrink-0" />
                        {t(course.scheduleDate)}
                      </span>
                    </div>

                    {/* 21st Century Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {Object.entries(course.skillImpacts).map(([sid, boost]) => {
                        const sDef = SKILLS_DATA.find((s) => s.id === sid);
                        if (!sDef) return null;
                        return (
                          <span
                            key={sid}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-[#0F3D3E]"
                          >
                            {t(sDef.shortName)} +{boost}%
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                        {course.durationHours}{' '}
                        {lang === 'ar' ? 'ساعة' : 'Hours'} • {t(course.format)}
                      </span>

                      <div className="flex items-center gap-2">
                        {hasSupport && (
                          <span className="text-xs text-slate-400 line-through">
                            {course.originalCostGems} 💎
                          </span>
                        )}
                        <span className="font-display font-extrabold text-sm text-[#0F3D3E]">
                          {isFree
                            ? lang === 'ar'
                              ? 'مجانية (0 💎)'
                              : 'Free (0 💎)'
                            : `${course.costGems} 💎`}
                        </span>
                      </div>
                    </div>

                    {course.completed ? (
                      <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        {lang === 'ar'
                          ? 'تم الالتحاق وإتمام الدورة ✓'
                          : 'Enrolled & Completed ✓'}
                      </div>
                    ) : (
                      <button
                        onClick={() => completeCourse(course.id)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                          canAfford
                            ? 'bg-[#0F3D3E] hover:bg-[#165254] text-white'
                            : 'bg-[#FDF8EA] text-[#9E7B1C] border border-[#C59B27]/50 hover:bg-[#f7ecc8]'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-[#E5C158]" />
                        {isFree
                          ? lang === 'ar'
                            ? 'التحاق مجاني وإتمام الدورة'
                            : 'Enroll Free & Complete'
                          : canAfford
                          ? lang === 'ar'
                            ? `شراء والالتحاق (${course.costGems} 💎)`
                            : `Enroll with ${course.costGems} 💎`
                          : lang === 'ar'
                          ? `تحتاج ${course.costGems} 💎 (اشحن الجواهر أعلاه)`
                          : `Need ${course.costGems} 💎 (Top-up above)`}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        </>
      )}

      {/* VIEW 2: TRAINING PROVIDER SUBMISSION PORTAL */}
      {subView === 'provider_submit' && (
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#C59B27]">
              {lang === 'ar'
                ? 'بوابة تسجيل الدورات للمعاهد والأكاديميات والجامعات'
                : 'Training Provider Course Registration Portal'}
            </span>
            <h2 className="font-display text-xl font-bold text-[#0F3D3E] mt-0.5">
              {lang === 'ar'
                ? 'تسجيل دورة تدريبية جديدة للاعتماد'
                : 'Submit New Training Course for Maeen Approval'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ar'
                ? 'تحدد الجهة مواصفات الدورة وموعدها ومكانها ومهارات القرن الـ 21 المستهدفة؛ بينما تتولى مؤسسة معين الوقفية وحدها تحديد النقاط (XP) والجواهر ونسبة الدعم الوقفي عند الاعتماد.'
                : 'Providers specify course details, delivery, schedule, and 21st-century skills. Maeen Endowment exclusively sets XP, Gems, and subsidy % upon approval.'}
            </p>
          </div>

          <form onSubmit={handleProviderSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم الدورة التدريبية' : 'Course Title'}
                </label>
                <input
                  required
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'مثال: إدارة المشاريع الهندسية والابتكار'
                      : 'e.g., Engineering Project Management'
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-[#0F3D3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم الجهة التدريبية / المعهد' : 'Provider Name'}
                </label>
                <input
                  required
                  type="text"
                  value={providerNameAr}
                  onChange={(e) => setProviderNameAr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-[#0F3D3E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'ar' ? 'وصف الدورة ومواصفاتها' : 'Course Specifications'}
              </label>
              <textarea
                rows={3}
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'اشرح محاور الدورة، الفئة المستهدفة، والمخرجات العملية...'
                    : 'Describe syllabus, target audience, and outcomes...'
                }
                className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:outline-none focus:border-[#0F3D3E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'طريقة التقديم' : 'Delivery Mode'}
                </label>
                <select
                  value={deliveryMode}
                  onChange={(e) =>
                    setDeliveryMode(e.target.value as CourseDeliveryMode)
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-slate-50"
                >
                  <option value="in_person">
                    {lang === 'ar' ? 'حضوري' : 'In-Person'}
                  </option>
                  <option value="live_online">
                    {lang === 'ar' ? 'عن بُعد (مباشر)' : 'Live Online'}
                  </option>
                  <option value="recorded">
                    {lang === 'ar' ? 'مسجلة' : 'Recorded'}
                  </option>
                  <option value="hybrid">
                    {lang === 'ar' ? 'مدمج (حضوري + عن بُعد)' : 'Hybrid'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'المكان / المنصة' : 'Location / Platform'}
                </label>
                <input
                  required
                  type="text"
                  value={locationOrLinkAr}
                  onChange={(e) => setLocationOrLinkAr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'موعد التدريب' : 'Schedule Date'}
                </label>
                <input
                  required
                  type="text"
                  value={scheduleDateAr}
                  onChange={(e) => setScheduleDateAr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عدد الساعات التدريبية' : 'Training Hours'}
                </label>
                <input
                  type="number"
                  min={2}
                  max={100}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar'
                    ? 'القيمة السوقية المقترحة (ر.ع / جوهرة)'
                    : 'Suggested Market Value (OMR / Gems)'}
                </label>
                <input
                  type="number"
                  min={0}
                  max={500}
                  value={suggestedValueGems}
                  onChange={(e) => setSuggestedValueGems(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>
            </div>

            {/* Multi-select 21st Century Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {lang === 'ar'
                  ? 'مهارات القرن الحادي والعشرين التي سيكتسبها الطالب (اختر المهارات):'
                  : '21st Century Skills Acquired by Student (Select):'}
              </label>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.map((s) => {
                  const selected = selectedSkillIds.includes(s.id);
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => toggleSkill(s.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        selected
                          ? 'bg-[#0F3D3E] text-white border-[#0F3D3E]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0F3D3E]/40'
                      }`}
                    >
                      {s.number}. {t(s.shortName)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#0F3D3E] hover:bg-[#165254] text-white text-xs font-bold cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Award className="w-4 h-4 text-[#E5C158]" />
                {lang === 'ar'
                  ? 'إرسال للاعتماد من مؤسسة معين الوقفية'
                  : 'Submit for Maeen Endowment Approval'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* VIEW 3: MAEEN ENDOWMENT ADMIN APPROVAL PANEL */}
      {subView === 'maeen_admin' && (
        <section className="space-y-4">
          <div className="bg-[#FDF8EA] border border-[#C59B27]/40 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0F3D3E] shrink-0 mt-0.5" />
            <div className="text-xs text-[#0F3D3E]">
              <p className="font-bold">
                {lang === 'ar'
                  ? 'لوحة تحكم واعتماد مؤسسة معين الوقفية (خاصة بإدارة المؤسسة)'
                  : 'Maeen Endowment Foundation Exclusive Control Panel'}
              </p>
              <p className="text-slate-600 mt-0.5">
                {lang === 'ar'
                  ? 'راجع الدورات المرفوعة من الجهات، وحدد عدد النقاط (XP)، السعر بالجواهر (💎)، ونسبة الدعم الوقفي من مؤسسة معين (مثل 5%) قبل نشرها للطلاب.'
                  : 'Review provider submissions, assign XP, Gem cost, and Maeen Endowment subsidy % (e.g., 5%) before publishing to the Student Store.'}
              </p>
            </div>
          </div>

          {pendingCourses.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="font-display font-bold text-base text-[#0F3D3E]">
                {lang === 'ar'
                  ? 'لا توجد طلبات دورات معلقة حالياً'
                  : 'No Pending Course Requests'}
              </p>
              <p className="text-xs text-slate-500">
                {lang === 'ar'
                  ? 'يمكنك تقديم دورة جديدة من تبويب «تسجيل دورة (بوابة الجهات التدريبية)» لاختبار دورة الاعتماد.'
                  : 'Submit a new course from the Training Providers tab to test the approval workflow.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingCourses.map((course) => {
                const cfg = getAdminConfig(course.id, course.originalCostGems);
                const finalGems = Math.max(
                  0,
                  Math.round(
                    cfg.originalCostGems * (1 - cfg.maeenSupportPercent / 100)
                  )
                );

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-3xl border-2 border-[#C59B27]/50 p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                          {lang === 'ar'
                            ? 'بانتظار اعتماد مؤسسة معين'
                            : 'Pending Maeen Approval'}
                        </span>
                        <h3 className="font-display font-bold text-lg text-[#0F3D3E] mt-1">
                          {t(course.title)}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {t(course.providerName)} • {t(course.format)} •{' '}
                          {t(course.locationOrLink)} • {t(course.scheduleDate)}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600">{t(course.description)}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {Object.keys(course.skillImpacts).map((sid) => {
                        const sDef = SKILLS_DATA.find((s) => s.id === sid);
                        if (!sDef) return null;
                        return (
                          <span
                            key={sid}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-[#0F3D3E]"
                          >
                            {t(sDef.shortName)}
                          </span>
                        );
                      })}
                    </div>

                    {/* Maeen Exclusive Controls: XP, Gems, Support % */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 items-end">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {lang === 'ar' ? 'النقاط الممنوحة (XP)' : 'Awarded XP'}
                        </label>
                        <input
                          type="number"
                          min={50}
                          max={600}
                          step={10}
                          value={cfg.xpReward}
                          onChange={(e) =>
                            updateAdminConfig(course.id, course.originalCostGems, {
                              xpReward: Number(e.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {lang === 'ar' ? 'القيمة الأصلية (💎)' : 'Original Gems (💎)'}
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={500}
                          value={cfg.originalCostGems}
                          onChange={(e) =>
                            updateAdminConfig(course.id, course.originalCostGems, {
                              originalCostGems: Number(e.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {lang === 'ar'
                            ? 'دعم مؤسسة معين (%)'
                            : 'Maeen Support (%)'}
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={cfg.maeenSupportPercent}
                          onChange={(e) =>
                            updateAdminConfig(course.id, course.originalCostGems, {
                              maeenSupportPercent: Number(e.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold"
                        />
                      </div>

                      <button
                        onClick={() => approveCourseByMaeen(course.id, cfg)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0F3D3E] hover:bg-[#165254] text-white text-xs font-bold cursor-pointer shadow-sm"
                      >
                        {lang === 'ar'
                          ? `اعتماد ونشر (${finalGems} 💎)`
                          : `Approve & Publish (${finalGems} 💎)`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
