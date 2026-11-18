import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Building,
  Calculator,
  CheckCircle2,
  Coins,
  Layers,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GOVERNANCE_MATRIX } from '../../data/uonData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const OMR_TO_USD = 2.6; // Fixed Omani Rial peg

export const GovernanceROI: React.FC = () => {
  const { lang, t } = useApp();

  const [partnerUniversities, setPartnerUniversities] = useState(8);
  const [avgStudents, setAvgStudents] = useState(10000);
  const [feePerStudentOmr, setFeePerStudentOmr] = useState(5);
  const [corporateSubscribers, setCorporateSubscribers] = useState(25);
  const [corporateFeeOmr, setCorporateFeeOmr] = useState(2400);
  const [storePurchasesPerYear, setStorePurchasesPerYear] = useState(12000);
  const [avgCoursePriceOmr, setAvgCoursePriceOmr] = useState(40);
  const storeCommissionRate = 0.2; // 20% commission to Maeen Endowment

  const studentSaaSRevenueOmr =
    partnerUniversities * avgStudents * feePerStudentOmr;
  const corporateRevenueOmr = corporateSubscribers * corporateFeeOmr;
  const storeCommissionRevenueOmr = Math.round(
    storePurchasesPerYear * avgCoursePriceOmr * storeCommissionRate
  );
  const totalArrOmr =
    studentSaaSRevenueOmr + corporateRevenueOmr + storeCommissionRevenueOmr;
  const totalArrUsd = Math.round(totalArrOmr * OMR_TO_USD);
  const totalStudentsCovered = partnerUniversities * avgStudents;

  const chartData = {
    labels: [
      lang === 'ar' ? 'اشتراكات الطلبة/الجامعات' : 'Student/Uni SaaS',
      lang === 'ar' ? 'اشتراكات جهات التوظيف' : 'Employer Portal',
      lang === 'ar' ? 'عمولة متجر الدورات (20%)' : 'Store Commission (20%)',
      lang === 'ar' ? 'إجمالي الإيراد الوقفي ARR' : 'Total Endowment ARR',
    ],
    datasets: [
      {
        label: lang === 'ar' ? 'الإيراد السنوي (ريال عُماني)' : 'Annual Revenue (OMR)',
        data: [
          studentSaaSRevenueOmr,
          corporateRevenueOmr,
          storeCommissionRevenueOmr,
          totalArrOmr,
        ],
        backgroundColor: ['#0F3D3E', '#C59B27', '#2B5B84', '#10B981'],
        borderRadius: 10,
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
        beginAtZero: true,
        grid: { color: 'rgba(148,163,184,0.18)' },
        ticks: {
          color: '#64748B',
          font: { size: 11 },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: '#0F3D3E',
          font: {
            size: 11,
            weight: 600 as const,
            family:
              lang === 'ar'
                ? 'IBM Plex Sans Arabic, sans-serif'
                : 'Plus Jakarta Sans, sans-serif',
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FDF8EA] border border-[#C59B27]/30 text-[#9E7B1C] text-[11px] font-bold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          {lang === 'ar'
            ? 'لوحة القيادة التنفيذية ونموذج الترخيص التجاري White-Label SaaS'
            : 'Executive Governance & Commercial White-Label EdTech SaaS'}
        </div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D3E]">
          {lang === 'ar'
            ? 'حوكمة المنظومة وحاسبة العائد الاستثماري (SaaS ROI)'
            : 'Academic Governance Matrix & EdTech SaaS ROI Calculator'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {lang === 'ar'
            ? 'خارطة تضمين المهارات في البرامج الأكاديمية، بالإضافة إلى محاكي الإيرادات السنوية المتكررة عند تعميم المنصة على مؤسسات التعليم العالي.'
            : 'Institutional quality assurance across curricula alongside a live Annual Recurring Revenue (ARR) simulator for higher-ed licensing.'}
        </p>
      </section>

      {/* Academic Governance & Quality Matrix */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-[#C59B27]" />
          <h2 className="font-display text-lg font-bold text-[#0F3D3E]">
            {lang === 'ar'
              ? 'مصفوفة الحوكمة الأكاديمية وضمان الجودة'
              : 'Academic Governance & Quality Assurance Matrix'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOVERNANCE_MATRIX.map((row, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display font-bold text-sm text-[#0F3D3E]">
                  {t(row.pillar)}
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  {row.readiness}% {lang === 'ar' ? 'جاهزية' : 'Ready'}
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                {t(row.coverage)}
              </p>
              <div className="text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/70">
                <span>{t(row.mechanism)}</span>
                <span className="font-semibold text-[#9E7B1C]">{t(row.owner)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive EdTech SaaS Revenue Calculator */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="font-display text-lg font-bold text-[#0F3D3E] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#C59B27]" />
              {lang === 'ar'
                ? 'حاسبة العائد التجاري لمنصة White-Label SaaS'
                : 'Interactive White-Label EdTech SaaS Revenue Calculator'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'اضبط المعاملات لاحتساب الإيرادات السنوية المتكررة بالريال العُماني والدولار الأمريكي'
                : 'Adjust licensing parameters to project Annual Recurring Revenue in OMR and USD'}
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
            1 OMR = 2.60 USD
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sliders */}
          <div className="lg:col-span-6 space-y-5 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
            {/* Partner Universities */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#0F3D3E]" />
                  {lang === 'ar'
                    ? 'عدد الجامعات الشريكة المرخصة'
                    : 'Licensed Partner Universities'}
                </span>
                <span className="text-[#0F3D3E]">{partnerUniversities}</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={partnerUniversities}
                onChange={(e) => setPartnerUniversities(Number(e.target.value))}
                className="uon-slider w-full"
              />
            </div>

            {/* Avg Students */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#0F3D3E]" />
                  {lang === 'ar'
                    ? 'متوسط عدد الطلبة لكل جامعة'
                    : 'Avg. Students per University'}
                </span>
                <span className="text-[#0F3D3E]">
                  {avgStudents.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={30000}
                step={1000}
                value={avgStudents}
                onChange={(e) => setAvgStudents(Number(e.target.value))}
                className="uon-slider w-full"
              />
            </div>

            {/* Annual Per-Student Fee */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-[#C59B27]" />
                  {lang === 'ar'
                    ? 'رسوم الترخيص السنوية للطالب'
                    : 'Annual Per-Student SaaS Fee'}
                </span>
                <span className="text-[#0F3D3E]">
                  {feePerStudentOmr} OMR ($
                  {(feePerStudentOmr * OMR_TO_USD).toFixed(2)})
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={20}
                step={1}
                value={feePerStudentOmr}
                onChange={(e) => setFeePerStudentOmr(Number(e.target.value))}
                className="uon-slider w-full"
              />
            </div>

            {/* Corporate Portal Subscriptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>
                    {lang === 'ar' ? 'شركات التوظيف المشتركة' : 'Corporate Partners'}
                  </span>
                  <span className="text-[#0F3D3E]">{corporateSubscribers}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={corporateSubscribers}
                  onChange={(e) =>
                    setCorporateSubscribers(Number(e.target.value))
                  }
                  className="uon-slider w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>
                    {lang === 'ar' ? 'اشتراك الشركة السنوي' : 'Annual Corp. Fee'}
                  </span>
                  <span className="text-[#0F3D3E]">
                    {corporateFeeOmr.toLocaleString()} OMR
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={6000}
                  step={200}
                  value={corporateFeeOmr}
                  onChange={(e) => setCorporateFeeOmr(Number(e.target.value))}
                  className="uon-slider w-full"
                />
              </div>
            </div>

            {/* Store Commissions (20%) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>
                    {lang === 'ar' ? 'مشتريات الدورات المخفضة/سنة' : 'Store Course Sales/yr'}
                  </span>
                  <span className="text-[#0F3D3E]">
                    {storePurchasesPerYear.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={1000}
                  value={storePurchasesPerYear}
                  onChange={(e) =>
                    setStorePurchasesPerYear(Number(e.target.value))
                  }
                  className="uon-slider w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>
                    {lang === 'ar' ? 'متوسط سعر الدورة المخفضة' : 'Avg. Course Price'}
                  </span>
                  <span className="text-[#0F3D3E]">{avgCoursePriceOmr} OMR</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={100}
                  step={5}
                  value={avgCoursePriceOmr}
                  onChange={(e) => setAvgCoursePriceOmr(Number(e.target.value))}
                  className="uon-slider w-full"
                />
              </div>
            </div>
          </div>

          {/* KPI Outputs + Revenue Breakdown Chart */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl emerald-gradient text-white border border-[#C59B27]/40">
                <p className="text-[11px] text-emerald-100/80 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#E5C158]" />
                  {lang === 'ar'
                    ? 'الإيراد السنوي المتكرر (ARR)'
                    : 'Annual Recurring Revenue (ARR)'}
                </p>
                <p className="font-display text-2xl font-extrabold text-[#E5C158] mt-1">
                  {totalArrOmr.toLocaleString()} {lang === 'ar' ? 'ر.ع' : 'OMR'}
                </p>
                <p className="text-xs text-emerald-100 mt-0.5">
                  ≈ ${totalArrUsd.toLocaleString()} USD
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDF8EA] border border-[#C59B27]/40 text-[#0F3D3E]">
                <p className="text-[11px] text-[#9E7B1C] font-bold">
                  {lang === 'ar'
                    ? 'إجمالي الطلبة المغطين بالمنظومة'
                    : 'Total Students Covered'}
                </p>
                <p className="font-display text-2xl font-extrabold mt-1">
                  {totalStudentsCovered.toLocaleString()}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {lang === 'ar'
                    ? `عبر ${partnerUniversities} جامعة و ${corporateSubscribers} جهة توظيف`
                    : `Across ${partnerUniversities} universities & ${corporateSubscribers} employers`}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-white">
              <div className="h-56 w-full">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
