import React, { useState } from 'react';
import {
  Award,
  Briefcase,
  CheckCircle2,
  Compass,
  Globe,
  GraduationCap,
  Grid,
  LayoutDashboard,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types/uon';
import { UNIVERSITIES, getTierForXp } from '../data/uonData';

export const Navbar: React.FC = () => {
  const {
    lang,
    toggleLang,
    t,
    activeTab,
    setActiveTab,
    student,
    accounts,
    activeAccountId,
    switchAccount,
    registerStudentAccount,
    resetDemo,
  } = useApp();
  const tier = getTierForXp(student.tierXp);

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Registration form state
  const [nameAr, setNameAr] = useState('');
  const [universityId, setUniversityId] = useState('uon');
  const [collegeAr, setCollegeAr] = useState('كلية الهندسة والعمارة');
  const [majorAr, setMajorAr] = useState('هندسة البرمجيات');

  const navItems: {
    id: ActiveTab;
    label: { ar: string; en: string };
    icon: React.ReactNode;
  }[] = [
    {
      id: 'dashboard',
      label: { ar: 'رحلة الطالب', en: 'Student Journey' },
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'skills',
      label: { ar: 'مصفوفة المهارات', en: '11-Skill Matrix' },
      icon: <Grid className="w-4 h-4" />,
    },
    {
      id: 'academy',
      label: { ar: 'المتجر', en: 'Store' },
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      id: 'diploma',
      label: { ar: 'الشهادة المزدوجة', en: 'Smart Diploma' },
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: 'employer',
      label: { ar: 'بوابة التوظيف', en: 'Employer Portal' },
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'governance',
      label: { ar: 'الحوكمة و ROI', en: 'Governance & ROI' },
      icon: <ShieldCheck className="w-4 h-4" />,
    },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) return;
    registerStudentAccount({
      nameAr: nameAr.trim(),
      universityId,
      collegeAr,
      majorAr,
    });
    setNameAr('');
    setShowRegisterForm(false);
    setShowAccountModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Brand Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl emerald-gradient flex items-center justify-center shadow-sm border border-[#C59B27]/40">
                <Compass className="w-5 h-5 text-[#C59B27]" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm sm:text-base text-[#0F3D3E]">
                    {lang === 'ar' ? 'بصمة معين الذكية' : 'Maeen Smart Footprint'}
                  </span>
                  <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FDF8EA] text-[#9E7B1C] border border-[#C59B27]/30">
                    Web Service • SaaS
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block truncate max-w-[200px]">
                  {t(student.universityName)}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
              {navItems.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0F3D3E] text-white shadow-sm'
                        : 'text-slate-600 hover:text-[#0F3D3E] hover:bg-white/70'
                    }`}
                  >
                    {item.icon}
                    <span>{t(item.label)}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Account Switcher, XP Pill, Language Toggle, Reset */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  setShowRegisterForm(false);
                  setShowAccountModal(true);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FDF8EA] hover:bg-[#f7ecc8] border border-[#C59B27]/40 text-xs font-bold text-[#0F3D3E] transition cursor-pointer"
                title={
                  lang === 'ar'
                    ? 'تبديل الحساب أو تسجيل طالب جديد (5 ر.ع)'
                    : 'Switch Account or Register (5 OMR/yr)'
                }
              >
                <Users className="w-3.5 h-3.5 text-[#C59B27]" />
                <span className="hidden sm:inline max-w-[110px] truncate">
                  {student.accountType === 'public'
                    ? lang === 'ar'
                      ? 'حساب عام'
                      : 'Public Guest'
                    : student.name[lang].split(' ')[0]}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#0F3D3E] text-[#E5C158]">
                  {student.tierXp.toLocaleString()} XP
                </span>
              </button>

              <button
                onClick={toggleLang}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#0F3D3E] transition cursor-pointer shadow-2xs"
                title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                <Globe className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              <button
                onClick={resetDemo}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-[#0F3D3E] transition cursor-pointer"
                title={lang === 'ar' ? 'إعادة ضبط العرض التجريبي' : 'Reset Demo Data'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Navigation Bar */}
          <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pb-2.5 pt-1 no-scrollbar">
            {navItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0F3D3E] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {item.icon}
                  <span>{t(item.label)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Account Switcher & 5 OMR Student Registration Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-[#C59B27]">
                  {lang === 'ar'
                    ? 'منصة محلية وعالمية متعددة الجامعات • اشتراك 5 ر.ع سنوياً'
                    : 'Multi-University Local & Global Platform • 5 OMR/yr'}
                </span>
                <h3 className="font-display text-lg font-bold text-[#0F3D3E]">
                  {showRegisterForm
                    ? lang === 'ar'
                      ? 'تسجيل حساب طالب جديد (5 ر.ع / سنة)'
                      : 'Register New Student Account (5 OMR/yr)'
                    : lang === 'ar'
                    ? 'الحسابات الشخصية والحساب العام'
                    : 'Personal Accounts & Public Explorer'}
                </h3>
              </div>
              <button
                onClick={() => setShowAccountModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!showRegisterForm ? (
              <div className="space-y-3">
                {accounts.map((acc) => {
                  const isCurrent = acc.profile.id === activeAccountId;
                  const isPublic = acc.profile.accountType === 'public';
                  return (
                    <button
                      key={acc.profile.id}
                      onClick={() => {
                        switchAccount(acc.profile.id);
                        setShowAccountModal(false);
                      }}
                      className={`w-full text-start p-4 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-50/70 border-[#0F3D3E] ring-1 ring-[#0F3D3E]/20'
                          : 'bg-slate-50/70 border-slate-200 hover:border-[#0F3D3E]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm ${
                            isPublic
                              ? 'bg-slate-200 text-slate-700'
                              : 'emerald-gradient text-[#E5C158]'
                          }`}
                        >
                          {acc.profile.avatarInitials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">
                              {t(acc.profile.name)}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                isPublic
                                  ? 'bg-slate-200 text-slate-700'
                                  : 'bg-[#FDF8EA] text-[#9E7B1C] border border-[#C59B27]/40'
                              }`}
                            >
                              {isPublic
                                ? lang === 'ar'
                                  ? 'حساب عام'
                                  : 'Public Mode'
                                : lang === 'ar'
                                ? 'مشترك 5 ر.ع'
                                : '5 OMR Active'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {t(acc.profile.universityName)} •{' '}
                            {acc.profile.tierXp.toLocaleString()} XP
                          </p>
                        </div>
                      </div>

                      {isCurrent ? (
                        <CheckCircle2 className="w-5 h-5 text-[#0F3D3E] shrink-0" />
                      ) : (
                        <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                  );
                })}

                <button
                  onClick={() => setShowRegisterForm(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-[#0F3D3E] hover:bg-[#165254] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <UserPlus className="w-4 h-4 text-[#E5C158]" />
                  {lang === 'ar'
                    ? 'إنشاء حساب طالب شخصي جديد (اشتراك 5 ر.ع سنوياً)'
                    : 'Create Personal Student Account (5 OMR/year)'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'اسم الطالب الكامل' : 'Full Student Name'}
                  </label>
                  <input
                    required
                    type="text"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'مثال: سالم بن حمد المعولي'
                        : 'e.g., Salim bin Hamad Al-Maawali'
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-[#0F3D3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar'
                      ? 'الجامعة (محلية أو عالمية)'
                      : 'University (Local or Global)'}
                  </label>
                  <select
                    value={universityId}
                    onChange={(e) => setUniversityId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-slate-50"
                  >
                    {UNIVERSITIES.map((u) => (
                      <option key={u.id} value={u.id}>
                        {t(u.name)} ({t(u.country)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'الكلية' : 'College'}
                    </label>
                    <input
                      type="text"
                      value={collegeAr}
                      onChange={(e) => setCollegeAr(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'التخصص' : 'Major'}
                    </label>
                    <input
                      type="text"
                      value={majorAr}
                      onChange={(e) => setMajorAr(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FDF8EA] border border-[#C59B27]/40 text-xs text-[#9E7B1C] flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    {lang === 'ar'
                      ? 'رسوم العضوية السنوية للوصول للدورات وبوابة الشركات:'
                      : 'Annual Membership (Courses + Employer Access):'}
                  </span>
                  <strong className="text-[#0F3D3E]">
                    {lang === 'ar' ? '5 ر.ع / سنة' : '5 OMR / yr'}
                  </strong>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRegisterForm(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    {lang === 'ar' ? 'رجوع' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0F3D3E] hover:bg-[#165254] text-white text-xs font-bold cursor-pointer"
                  >
                    {lang === 'ar'
                      ? 'تفعيل الحساب (5 ر.ع)'
                      : 'Activate Account (5 OMR)'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
