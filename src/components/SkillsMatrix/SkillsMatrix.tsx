import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  GraduationCap,
  Layers,
  Shield,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLUSTERS, SKILLS_DATA } from '../../data/uonData';
import { ClusterId, SkillDefinition } from '../../types/uon';

export const SkillsMatrix: React.FC = () => {
  const { lang, t, skillScores } = useApp();
  const [selectedCluster, setSelectedCluster] = useState<'all' | ClusterId>('all');
  const [activeSkill, setActiveSkill] = useState<SkillDefinition | null>(null);

  const filteredSkills = SKILLS_DATA.filter((s) =>
    selectedCluster === 'all' ? true : s.clusterId === selectedCluster
  );

  const getRubricLevelForScore = (score: number): 1 | 2 | 3 | 4 => {
    if (score >= 90) return 4;
    if (score >= 80) return 3;
    if (score >= 65) return 2;
    return 1;
  };

  return (
    <div className="space-y-6">
      {/* Header & Cluster Filter Tabs */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FDF8EA] border border-[#C59B27]/30 text-[#9E7B1C] text-[11px] font-bold mb-2">
              <Layers className="w-3.5 h-3.5" />
              {lang === 'ar'
                ? 'مواءمة OQF 2021 • UNESCO 2030 • WEF Future of Jobs'
                : 'Aligned with Oman OQF 2021 • UNESCO 2030 • WEF Future of Jobs'}
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D3E]">
              {lang === 'ar'
                ? 'مصفوفة مهارات القرن الحادي والعشرين الـ 11 وسمات الخريج'
                : 'The 11 Approved 21st Century Skills & Graduate Attributes Matrix'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'ar'
                ? 'اضغط على أي مهارة لاستعراض التعريف السلوكي، معايير تقييم AAC&U VALUE الرباعية، وربطها بسمات خريج جامعة نزوى.'
                : 'Click any skill to inspect its behavioral definition, 4-level AAC&U VALUE Rubric, and UoN Graduate Attributes mapping.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-50 px-3.5 py-2.5 rounded-2xl border border-slate-200 shrink-0">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#0F3D3E] text-[#E5C158] font-bold text-[11px]">
              P
            </span>
            <span className="text-slate-600 font-medium">
              {lang === 'ar'
                ? 'أولوية وطنية في الإطار العُماني لمهارات المستقبل 2021'
                : 'Priority in Oman National Future Skills Framework 2021'}
            </span>
          </div>
        </div>

        {/* 4 Cluster Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">
          <button
            onClick={() => setSelectedCluster('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCluster === 'all'
                ? 'bg-[#0F3D3E] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            {lang === 'ar' ? 'جميع العناقيد (11 مهارة)' : 'All Clusters (11 Skills)'}
          </button>
          {CLUSTERS.map((cluster) => {
            const active = selectedCluster === cluster.id;
            return (
              <button
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  active
                    ? 'bg-[#0F3D3E] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {t(cluster.name)}
              </button>
            );
          })}
        </div>
      </section>

      {/* Skills Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => {
          const score = skillScores[skill.id] ?? skill.initialScore;
          const isBadgeVerified = score >= 80;
          const cluster = CLUSTERS.find((c) => c.id === skill.clusterId)!;
          const rubricLevel = getRubricLevelForScore(score);

          return (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill)}
              className="text-start bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-[#0F3D3E]/50 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0F3D3E]/10 text-[#0F3D3E] font-display font-bold text-xs flex items-center justify-center">
                      {skill.number}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {t(cluster.name)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {skill.isPriorityP && (
                      <span
                        className="px-2 py-0.5 rounded-md bg-[#0F3D3E] text-[#E5C158] text-[10px] font-extrabold"
                        title={
                          lang === 'ar'
                            ? 'مهارة ذات أولوية وطنية (Oman 2021)'
                            : 'Oman National Priority Skill (P)'
                        }
                      >
                        P
                      </span>
                    )}
                    {isBadgeVerified ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {lang === 'ar' ? 'شارة موثقة' : 'Verified'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-medium">
                        {lang === 'ar' ? 'قيد التطوير' : 'In Progress'}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-[#0F3D3E] transition mb-1.5">
                  {t(skill.name)}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {t(skill.behavioralDefinition)}
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100 w-full">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">
                    {lang === 'ar'
                      ? `مستوى الإتقان (Rubric ${rubricLevel}/4)`
                      : `Mastery (Rubric ${rubricLevel}/4)`}
                  </span>
                  <span className="font-display font-extrabold text-[#0F3D3E]">
                    {score}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isBadgeVerified ? 'bg-[#0F3D3E]' : 'bg-[#C59B27]'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#9E7B1C] font-semibold pt-1">
                  <span>{t(skill.badgeTitle)}</span>
                  <span className="inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
                    {lang === 'ar' ? 'عرض المصفوفة' : 'View Rubric'}
                    {lang === 'ar' ? (
                      <ChevronLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      {/* Detailed Assessment Modal / Drawer */}
      {activeSkill && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 p-6 pb-4 border-b border-slate-100 shrink-0 bg-white">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#0F3D3E] text-white text-xs font-bold">
                    #{activeSkill.number}
                  </span>
                  {activeSkill.isPriorityP && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#FDF8EA] text-[#9E7B1C] border border-[#C59B27]/40 text-xs font-bold">
                      {lang === 'ar'
                        ? 'أولوية وطنية (P) - عُمان 2021'
                        : 'National Priority (P) - Oman 2021'}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold">
                    {lang === 'ar'
                      ? `النتيجة الحالية: ${skillScores[activeSkill.id] ?? activeSkill.initialScore}%`
                      : `Current Score: ${skillScores[activeSkill.id] ?? activeSkill.initialScore}%`}
                  </span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D3E]">
                  {t(activeSkill.name)}
                </h2>
              </div>
              <button
                onClick={() => setActiveSkill(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Behavioral Definition */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xs font-bold text-[#0F3D3E] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#C59B27]" />
                {lang === 'ar' ? 'التعريف السلوكي المعتمد' : 'Official Behavioral Definition'}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {t(activeSkill.behavioralDefinition)}
              </p>
            </div>

            {/* Graduate Attributes + WEF 2030 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-[#0F3D3E] mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#C59B27]" />
                  {lang === 'ar'
                    ? 'الربط بسمات خريج جامعة نزوى'
                    : 'UoN Graduate Attributes Mapping'}
                </h4>
                <ul className="space-y-1.5">
                  {activeSkill.uonGraduateAttributes.map((attr, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-700 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
                      {t(attr)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-[#0F3D3E] mb-2 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#C59B27]" />
                  {lang === 'ar'
                    ? 'المواءمة مع WEF 2030'
                    : 'WEF Future of Jobs 2030 Alignment'}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {t(activeSkill.wefAlignment)}
                </p>
              </div>
            </div>

            {/* AAC&U VALUE Rubric 4-Level Scale */}
            <div>
              <h3 className="text-sm font-display font-bold text-[#0F3D3E] mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C59B27]" />
                {lang === 'ar'
                  ? 'مقياس التقييم الرباعي (AAC&U VALUE Rubric)'
                  : 'AAC&U VALUE Rubric 4-Level Scale'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSkill.rubric.map((item) => {
                  const currentLevel = getRubricLevelForScore(
                    skillScores[activeSkill.id] ?? activeSkill.initialScore
                  );
                  const isAchieved = item.level <= currentLevel;
                  const isCurrent = item.level === currentLevel;
                  return (
                    <div
                      key={item.level}
                      className={`p-3.5 rounded-2xl border transition ${
                        isCurrent
                          ? 'bg-[#FDF8EA] border-[#C59B27] ring-1 ring-[#C59B27]/40'
                          : isAchieved
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-slate-50 border-slate-200 opacity-75'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#0F3D3E]">
                          {t(item.title)}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0F3D3E] text-[#E5C158] font-bold">
                            {lang === 'ar' ? 'مستواك الحالي' : 'Your Level'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {t(item.descriptor)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3-Stage Student Journey Milestones */}
            <div>
              <h3 className="text-sm font-display font-bold text-[#0F3D3E] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C59B27]" />
                {lang === 'ar'
                  ? 'معالم الرحلة الطلابية عبر المساقات'
                  : 'Student Journey Milestones'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeSkill.journeyMilestones.map((m, idx) => (
                  <div
                    key={m.stage}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <span className="text-[10px] font-bold text-[#C59B27]">
                      {lang === 'ar' ? `المرحلة ${idx + 1}` : `Stage ${idx + 1}`}
                    </span>
                    <h4 className="text-xs font-bold text-[#0F3D3E] mt-0.5 mb-1">
                      {t(m.stageLabel)}
                    </h4>
                    <p className="text-xs text-slate-600">{t(m.description)}</p>
                  </div>
                ))}
              </div>
            </div>

            </div>

            <div className="flex justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/70 shrink-0">
              <button
                onClick={() => setActiveSkill(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0F3D3E] text-white text-xs font-bold hover:bg-[#165254] cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
