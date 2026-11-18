import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Award,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Crown,
  ExternalLink,
  Fingerprint,
  Lock,
  QrCode,
  RefreshCw,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SKILLS_DATA, getTierForXp } from '../../data/uonData';
import { SkillRadarChart } from '../SkillRadarChart';

export const DualDiploma: React.FC = () => {
  const { lang, t, student, skillScores, quests } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const tier = getTierForXp(student.tierXp);
  const isNizwaFellow = student.tierXp >= 3000;
  const verifiedSkills = SKILLS_DATA.filter(
    (s) => (skillScores[s.id] ?? s.initialScore) >= 80
  );
  const completedQuests = quests.filter((q) => q.completed);

  const verificationUrl = `https://verify.uon.edu.om/passport/${student.id}?did=${encodeURIComponent(
    student.blockchainDid
  )}&xp=${student.tierXp}`;

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#C59B27] uppercase tracking-wider">
            {lang === 'ar'
              ? 'مستلهم من UK HEAR • Canadian CCR • NUS Open Badges 3.0'
              : 'Inspired by UK HEAR • Canadian CCR • NUS Open Badges 3.0'}
          </span>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D3E] mt-0.5">
            {lang === 'ar'
              ? 'الشهادة المزدوجة الذكية وجواز الكفاءة الموثق'
              : 'Dual Smart Diploma & Blockchain Competency Passport'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {lang === 'ar'
              ? 'اقلب الوثيقة ثلاثية الأبعاد لاستعراض الوجه الأكاديمي الرسمي وظهر جواز الكفاءة المزود برمز التحقق التشفيري.'
              : 'Flip the 3D credential to inspect the official Academic Degree and the Competency Passport with live QR verification.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsFlipped((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F3D3E] hover:bg-[#165254] text-white text-xs font-bold shadow-sm transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-[#E5C158]" />
            {isFlipped
              ? lang === 'ar'
                ? 'عرض الوجه الأكاديمي'
                : 'Show Academic Front'
              : lang === 'ar'
              ? 'قلب إلى جواز الكفاءة'
              : 'Flip to Competency Passport'}
          </button>

          <button
            onClick={() => setShowVerifyModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FDF8EA] hover:bg-[#f7ecc8] text-[#9E7B1C] border border-[#C59B27]/50 text-xs font-bold transition cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            {lang === 'ar' ? 'محاكاة مسح جهة التوظيف' : 'Simulate Employer Scan'}
          </button>
        </div>
      </section>

      {/* 3D Perspective Flip Card */}
      <div className="perspective-1200 max-w-5xl mx-auto">
        <div
          className={`relative w-full transition-transform duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ minHeight: '540px' }}
        >
          {/* FRONT SIDE: Official Academic Degree */}
          <div className="backface-hidden w-full rounded-3xl bg-white border-4 border-[#0F3D3E] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Decorative Gold Inner Border */}
            <div className="border-2 border-[#C59B27]/50 rounded-2xl p-6 sm:p-8 relative">
              {/* Top Crest */}
              <div className="flex flex-col items-center text-center space-y-2 mb-6">
                <div className="w-16 h-16 rounded-2xl emerald-gradient border-2 border-[#C59B27] flex items-center justify-center shadow-md">
                  <Award className="w-8 h-8 text-[#E5C158]" />
                </div>
                <p className="text-xs font-bold tracking-widest text-[#C59B27] uppercase">
                  {lang === 'ar'
                    ? 'سلطنة عُمان • جامعة نزوى'
                    : 'Sultanate of Oman • University of Nizwa'}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F3D3E]">
                  {lang === 'ar' ? 'وثيقة التخرج الأكاديمية الرسمية' : 'Official Academic Degree Certificate'}
                </h2>
              </div>

              {/* Body */}
              <div className="text-center max-w-2xl mx-auto space-y-4 my-6">
                <p className="text-sm text-slate-600">
                  {lang === 'ar'
                    ? 'يشهد مجلس أمناء جامعة نزوى بناءً على توصية مجلس الكلية بأن الطالب:'
                    : 'The Board of Trustees of the University of Nizwa, upon recommendation of the College Council, certifies that:'}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F3D3E] py-2 border-y border-[#C59B27]/30">
                  {t(student.name)}
                </h3>
                <p className="text-sm sm:text-base text-slate-700">
                  {lang === 'ar'
                    ? `قد أتم بنجاح متطلبات درجة البكالوريوس في ${student.major.ar} — ${student.college.ar}`
                    : `Has fulfilled all requirements for the Bachelor of Science in ${student.major.en} — ${student.college.en}`}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                  <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-slate-500">
                      {lang === 'ar' ? 'المعدل التراكمي:' : 'Cumulative GPA:'}{' '}
                    </span>
                    <strong className="text-[#0F3D3E] text-sm">
                      {student.gpa.toFixed(2)} / 4.00
                    </strong>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-slate-500">
                      {lang === 'ar' ? 'الرقم الجامعي:' : 'Student ID:'}{' '}
                    </span>
                    <strong className="text-[#0F3D3E] text-sm">{student.id}</strong>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-slate-500">
                      {lang === 'ar' ? 'دفعة التخرج:' : 'Class of:'}{' '}
                    </span>
                    <strong className="text-[#0F3D3E] text-sm">
                      {student.graduationYear}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Footer Seals */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-start">
                  <div className="w-32 h-0.5 bg-slate-300 mb-1.5 mx-auto sm:mx-0" />
                  <p className="text-xs font-bold text-[#0F3D3E]">
                    {lang === 'ar' ? 'رئيس جامعة نزوى' : 'Vice Chancellor, UoN'}
                  </p>
                </div>

                {/* Nizwa Fellow Gold Seal */}
                <div
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border ${
                    isNizwaFellow
                      ? 'gold-emboss text-[#0A2B2C] border-[#9E7B1C] shadow-md'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {isNizwaFellow ? (
                    <Crown className="w-5 h-5" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  <div className="text-start">
                    <p className="text-xs font-extrabold">
                      {isNizwaFellow
                        ? lang === 'ar'
                          ? 'الختم الذهبي: سفير نزوى'
                          : 'Gold Seal: Nizwa Fellow'
                        : lang === 'ar'
                        ? 'الختم الذهبي (يفتح عند 3,000 XP)'
                        : 'Gold Seal (Unlocks at 3,000 XP)'}
                    </p>
                    <p className="text-[10px] opacity-80">
                      {lang === 'ar'
                        ? `الرصيد الحالي: ${student.tierXp.toLocaleString()} XP (${tier.name.ar})`
                        : `Current: ${student.tierXp.toLocaleString()} XP (${tier.name.en})`}
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-end">
                  <div className="w-32 h-0.5 bg-slate-300 mb-1.5 mx-auto sm:mx-0" />
                  <p className="text-xs font-bold text-[#0F3D3E]">
                    {lang === 'ar' ? 'عميد الكلية' : 'Dean of College'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BACK SIDE: Competency Passport */}
          <div className="backface-hidden rotate-y-180 absolute inset-0 w-full rounded-3xl emerald-gradient text-white border-4 border-[#C59B27] p-6 sm:p-8 shadow-2xl overflow-y-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-6 h-full">
              {/* Left Column: Radar & Hours */}
              <div className="lg:w-5/12 flex flex-col justify-between bg-white rounded-2xl p-5 text-slate-900">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-sm text-[#0F3D3E]">
                      {lang === 'ar'
                        ? 'بصمة الكفاءات الـ 11 الموثقة'
                        : 'Verified 11-Skill Footprint'}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                      Open Badges 3.0
                    </span>
                  </div>
                  <SkillRadarChart compact showBenchmarks={false} />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 mt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 text-center">
                    <p className="text-[10px] text-slate-500">
                      {lang === 'ar' ? 'ساعات التطوع الموثقة' : 'Verified Volunteering'}
                    </p>
                    <p className="font-display font-extrabold text-base text-[#0F3D3E]">
                      {student.volunteeringHours}h
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-center">
                    <p className="text-[10px] text-slate-500">
                      {lang === 'ar' ? 'ساعات القيادة والأندية' : 'Leadership Hours'}
                    </p>
                    <p className="font-display font-extrabold text-base text-[#0F3D3E]">
                      {student.leadershipHours}h
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Badges + Cryptographic QR */}
              <div className="lg:w-7/12 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div>
                      <p className="text-[11px] font-bold text-[#E5C158] uppercase">
                        {lang === 'ar'
                          ? 'جواز كفاءة الخريج الموثق'
                          : 'Verified Graduate Competency Passport'}
                      </p>
                      <h3 className="font-display text-lg font-bold text-white">
                        {t(student.name)} • {t(tier.name)}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono">
                      {student.tierXp.toLocaleString()} XP
                    </span>
                  </div>

                  <p className="text-xs text-emerald-100/80 mb-2">
                    {lang === 'ar'
                      ? `الشارات الرقمية المفتوحة المكتسبة (${verifiedSkills.length}/11 عند ≥ 80%):`
                      : `Earned Open Badges (${verifiedSkills.length}/11 at ≥ 80%):`}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {verifiedSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-[#C59B27]/40 text-[11px] font-semibold text-[#FDF8EA]"
                      >
                        <BadgeCheck className="w-3.5 h-3.5 text-[#E5C158]" />
                        {t(skill.badgeTitle)} ({skillScores[skill.id]}%)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cryptographic QR Block */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#E5C158]">
                      <Fingerprint className="w-4 h-4" />
                      {lang === 'ar'
                        ? 'رمز التحقق التشفيري الحي (JWT / DID)'
                        : 'Dynamic Cryptographic QR Verification'}
                    </div>
                    <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                      {lang === 'ar'
                        ? 'اضغط على الرمز لمحاكاة بوابة التحقق الفوري لجهات التوظيف والتأكد من عدم قابلية السجل للتعديل.'
                        : 'Click the QR code to open the Employer Public Verification Simulator.'}
                    </p>
                    <p className="text-[10px] font-mono text-emerald-200/70 break-all">
                      {student.blockchainDid}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowVerifyModal(true)}
                    className="p-2.5 bg-white rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer shrink-0 group"
                    title={lang === 'ar' ? 'فتح محاكي التحقق' : 'Open Verification Simulator'}
                  >
                    <QRCodeSVG
                      value={verificationUrl}
                      size={96}
                      fgColor="#0F3D3E"
                      bgColor="#FFFFFF"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Public Verification Simulator Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">
                    {lang === 'ar' ? 'سجل موثق ومطابق 100%' : 'Cryptographically Verified Record'}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#0F3D3E]">
                    {lang === 'ar'
                      ? 'بوابة التحقق العام لجهات التوظيف'
                      : 'Employer Public Verification View'}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {lang === 'ar' ? 'اسم الخريج:' : 'Graduate:'}
                </span>
                <strong className="text-slate-900">{t(student.name)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {lang === 'ar' ? 'المستوى المعتمد:' : 'Verified Tier:'}
                </span>
                <strong className="text-[#0F3D3E]">
                  {t(tier.name)} ({student.tierXp.toLocaleString()} XP)
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {lang === 'ar' ? 'توقيع البصمة الرقمية (DID):' : 'Blockchain DID:'}
                </span>
                <span className="font-mono text-[11px] text-slate-700">
                  {student.blockchainDid}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {lang === 'ar' ? 'الطابع الزمني للتحقق:' : 'Verification Timestamp:'}
                </span>
                <span className="font-mono text-[11px] text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#0F3D3E] mb-2">
                {lang === 'ar'
                  ? 'الأدلة والمشاريع الموثقة المرتبطة بالسجل:'
                  : 'Tamper-Proof Portfolio Evidence Links:'}
              </h4>
              <div className="space-y-2 max-h-44 overflow-y-auto">
                {completedQuests.length === 0 ? (
                  <p className="text-xs text-slate-500 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    {lang === 'ar'
                      ? 'قم بإنجاز مهمة من لوحة الطالب لإظهار روابط الأدلة الموثقة هنا فوراً.'
                      : 'Complete a quest in Student Journey to populate live verified evidence artifacts here.'}
                  </p>
                ) : (
                  completedQuests.map((q) => (
                    <div
                      key={q.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{t(q.title)}</p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {q.evidenceSubmitted?.fileName} • {q.evidenceSubmitted?.hash}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#0F3D3E] text-white text-xs font-bold hover:bg-[#165254] cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق نافذة التحقق' : 'Close Verification'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
