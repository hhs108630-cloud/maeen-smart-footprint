import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Gem, RefreshCw, TrendingUp, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

type ScopeType = 'section' | 'program' | 'platform';

export const PeerBenchmarkCurve: React.FC = () => {
  const { lang, student, startNewSemester } = useApp();
  const [scope, setScope] = useState<ScopeType>('section');

  const semesterXp = student.semesterXp ?? student.tierXp;
  const gems = student.gemsBalance ?? 0;

  // Dynamic percentile calculation based on semester XP
  const computePercentile = (xp: number, factor: number) => {
    const raw = Math.max(5, Math.min(95, Math.round(92 - (xp / 3200) * 78 * factor)));
    return raw; // e.g., Top 14%
  };

  const scopeConfig: Record<
    ScopeType,
    {
      label: { ar: string; en: string };
      cohortSize: number;
      topPercent: number;
      avgXp: number;
      avgGems: number;
    }
  > = {
    section: {
      label: { ar: 'الشعبة الدراسية', en: 'Class Section' },
      cohortSize: 42,
      topPercent: computePercentile(semesterXp, 1.05),
      avgXp: 1620,
      avgGems: 32,
    },
    program: {
      label: { ar: 'البرنامج الأكاديمي', en: 'Academic Program' },
      cohortSize: 310,
      topPercent: computePercentile(semesterXp, 1.0),
      avgXp: 1480,
      avgGems: 29,
    },
    platform: {
      label: { ar: 'إجمالي الملتحقين بالمنصة', en: 'All Platform Students' },
      cohortSize: 12450,
      topPercent: computePercentile(semesterXp, 0.94),
      avgXp: 1290,
      avgGems: 25,
    },
  };

  const activeCfg = scopeConfig[scope];

  // Bell curve buckets (0..3000+ XP)
  const buckets = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500];
  const distribution = [6, 14, 24, 30, 22, 13, 7, 3];
  const studentBucketIdx = Math.min(
    buckets.length - 1,
    Math.floor(semesterXp / 500)
  );

  const chartData = {
    labels: buckets.map((b) => `${b} XP`),
    datasets: [
      {
        label: lang === 'ar' ? 'توزيع الأقران' : 'Peer Distribution',
        data: distribution,
        fill: true,
        tension: 0.42,
        borderColor: '#0F3D3E',
        backgroundColor: 'rgba(15, 61, 62, 0.12)',
        pointRadius: buckets.map((_, idx) => (idx === studentBucketIdx ? 8 : 3)),
        pointBackgroundColor: buckets.map((_, idx) =>
          idx === studentBucketIdx ? '#C59B27' : '#0F3D3E'
        ),
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F3D3E',
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
      },
      x: {
        grid: { display: false },
        ticks: {
          color: '#64748B',
          font: { size: 10 },
        },
      },
    },
  };

  // Closest 3 peers neighborhood
  const peers = [
    {
      name: lang === 'ar' ? 'زميل متقدم (+1 مركز)' : 'Peer Ahead (+1)',
      xp: semesterXp + 120,
      gems: (student.totalGemsEarned ?? 0) + 2,
      isMe: false,
    },
    {
      name: lang === 'ar' ? `${student.name.ar} (أنت)` : `${student.name.en} (You)`,
      xp: semesterXp,
      gems: student.totalGemsEarned ?? gems,
      isMe: true,
    },
    {
      name: lang === 'ar' ? 'زميل منافس (-1 مركز)' : 'Peer Behind (-1)',
      xp: Math.max(0, semesterXp - 90),
      gems: Math.max(0, (student.totalGemsEarned ?? 0) - 2),
      isMe: false,
    },
  ];

  return (
    <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FDF8EA] border border-[#C59B27]/30 text-[#9E7B1C] text-[11px] font-bold mb-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            {lang === 'ar'
              ? 'منحنى التميز التنافسي (كل 50 XP = 1 جوهرة 💎)'
              : 'Peer Benchmarking Curve (50 XP = 1 Gem 💎)'}
          </div>
          <h2 className="font-display text-lg font-bold text-[#0F3D3E]">
            {lang === 'ar'
              ? 'موقعك ومنحنى تميزك بين أقرانك'
              : 'Your Percentile Position & Peer Curve'}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['section', 'program', 'platform'] as ScopeType[]).map((s) => (
              <button
                key={s}
                onClick={() => setScope(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  scope === s
                    ? 'bg-[#0F3D3E] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {scopeConfig[s].label[lang]}
              </button>
            ))}
          </div>

          <button
            onClick={startNewSemester}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
            title={
              lang === 'ar'
                ? 'محاكاة بداية فصل جديد: تصفير نقاط الفصل مع بقاء الجواهر'
                : 'Simulate New Semester: Reset Semester XP while keeping Gems'
            }
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#C59B27]" />
            {lang === 'ar' ? 'فصل جديد' : 'New Semester'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Curve Chart */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-emerald-50/70 border border-emerald-200 px-4 py-2.5 rounded-2xl">
            <span className="font-bold text-[#0F3D3E]">
              {lang === 'ar'
                ? `أنت ضمن أفضل ${activeCfg.topPercent}% في ${activeCfg.label.ar}`
                : `You are in the Top ${activeCfg.topPercent}% of ${activeCfg.label.en}`}
            </span>
            <span className="text-slate-600 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#0F3D3E]" />
              {activeCfg.cohortSize.toLocaleString()}{' '}
              {lang === 'ar' ? 'طالب' : 'students'}
            </span>
          </div>

          <div className="h-44 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
          <p className="text-[11px] text-slate-500 text-center">
            {lang === 'ar'
              ? `النقطة الذهبية تمثل موقعك الحالي (${semesterXp.toLocaleString()} XP فصلي) مقارنة بمتوسط الأقران (${activeCfg.avgXp.toLocaleString()} XP)`
              : `Gold dot shows your current position (${semesterXp.toLocaleString()} Semester XP) vs peer average (${activeCfg.avgXp.toLocaleString()} XP)`}
          </p>
        </div>

        {/* Closest Peers Neighborhood */}
        <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-[#0F3D3E]">
              {lang === 'ar' ? 'نافذة الجوار التنافسي' : 'Closest Peer Window'}
            </span>
            <span className="text-[11px] text-slate-500">
              {lang === 'ar' ? 'نقاط الفصل • الجواهر' : 'Semester XP • Gems'}
            </span>
          </div>

          {peers.map((p, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                p.isMe
                  ? 'bg-[#FDF8EA] border-[#C59B27] font-bold text-[#0F3D3E] shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <span className="truncate">{p.name}</span>
              <div className="flex items-center gap-2.5 shrink-0">
                <span>{p.xp.toLocaleString()} XP</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0F3D3E]/10 text-[#0F3D3E] font-bold">
                  <Gem className="w-3 h-3 text-[#C59B27]" />
                  {p.gems}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
