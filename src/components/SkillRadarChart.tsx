import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { SKILLS_DATA } from '../data/uonData';
import { useApp } from '../context/AppContext';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillRadarChartProps {
  scores?: Record<string, number>;
  compact?: boolean;
  showBenchmarks?: boolean;
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({
  scores,
  compact = false,
  showBenchmarks = true,
}) => {
  const { lang, skillScores } = useApp();
  const activeScores = scores ?? skillScores;

  const labels = SKILLS_DATA.map((s) =>
    compact ? `${s.number}` : s.shortName[lang]
  );

  const studentData = SKILLS_DATA.map((s) => activeScores[s.id] ?? s.initialScore);
  const oqfData = SKILLS_DATA.map((s) => s.oqfBenchmark);
  const wefData = SKILLS_DATA.map((s) => s.wefTarget);

  const datasets = [
    {
      label: lang === 'ar' ? 'رصيد الطالب الموثق' : 'Verified Student Score',
      data: studentData,
      backgroundColor: 'rgba(15, 61, 62, 0.22)',
      borderColor: '#0F3D3E',
      borderWidth: 2.5,
      pointBackgroundColor: '#C59B27',
      pointBorderColor: '#0F3D3E',
      pointRadius: compact ? 2.5 : 4,
      pointHoverRadius: 6,
    },
    ...(showBenchmarks
      ? [
          {
            label: lang === 'ar' ? 'معيار الإطار العُماني OQF' : 'Oman OQF Benchmark',
            data: oqfData,
            backgroundColor: 'rgba(197, 155, 39, 0.08)',
            borderColor: '#C59B27',
            borderWidth: 1.8,
            borderDash: [5, 4],
            pointRadius: 2,
          },
          {
            label: lang === 'ar' ? 'مستهدف سوق العمل WEF 2030' : 'WEF 2030 Target',
            data: wefData,
            backgroundColor: 'rgba(16, 185, 129, 0.04)',
            borderColor: '#10B981',
            borderWidth: 1.5,
            borderDash: [2, 3],
            pointRadius: 2,
          },
        ]
      : []),
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 40,
        max: 100,
        ticks: {
          stepSize: 15,
          display: !compact,
          backdropColor: 'transparent',
          color: '#64748B',
          font: { size: 10 },
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.25)',
        },
        angleLines: {
          color: 'rgba(148, 163, 184, 0.25)',
        },
        pointLabels: {
          color: '#0F3D3E',
          font: {
            family:
              lang === 'ar'
                ? 'IBM Plex Sans Arabic, Cairo, sans-serif'
                : 'Plus Jakarta Sans, sans-serif',
            size: compact ? 10 : 11,
            weight: 600 as const,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: !compact,
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 16,
          color: '#334155',
          font: {
            family:
              lang === 'ar'
                ? 'IBM Plex Sans Arabic, sans-serif'
                : 'Plus Jakarta Sans, sans-serif',
            size: 11,
            weight: 600 as const,
          },
        },
      },
      tooltip: {
        rtl: lang === 'ar',
        backgroundColor: '#0F3D3E',
        titleColor: '#FDF8EA',
        bodyColor: '#FFFFFF',
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className={compact ? 'h-48 w-full' : 'h-[360px] sm:h-[400px] w-full'}>
      <Radar data={{ labels, datasets }} options={options} />
    </div>
  );
};
