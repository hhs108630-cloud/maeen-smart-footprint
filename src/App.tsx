import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard/StudentDashboard';
import { SkillsMatrix } from './components/SkillsMatrix/SkillsMatrix';
import { TrainingAcademy } from './components/TrainingAcademy/TrainingAcademy';
import { DualDiploma } from './components/DualDiploma/DualDiploma';
import { EmployerPortal } from './components/EmployerPortal/EmployerPortal';
import { GovernanceROI } from './components/GovernanceROI/GovernanceROI';
import { ToastContainer } from './components/ToastContainer';

const MainShell: React.FC = () => {
  const { activeTab, lang } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && <StudentDashboard />}
        {activeTab === 'skills' && <SkillsMatrix />}
        {activeTab === 'academy' && <TrainingAcademy />}
        {activeTab === 'diploma' && <DualDiploma />}
        {activeTab === 'employer' && <EmployerPortal />}
        {activeTab === 'governance' && <GovernanceROI />}
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            {lang === 'ar'
              ? '© 2026 بصمة معين الذكية (Maeen Smart Footprint Web Service) • مؤسسة معين الوقفية'
              : '© 2026 Maeen Smart Footprint (Web Service) • Maeen Endowment Foundation'}
          </span>
          <span className="font-medium text-[#0F3D3E]">
            {lang === 'ar'
              ? 'متوافق مع رؤية عُمان 2040 • OQF • UNESCO 2030 • WEF 2030'
              : 'Aligned with Oman Vision 2040 • OQF • UNESCO 2030 • WEF 2030'}
          </span>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainShell />
    </AppProvider>
  );
}

export default App;
