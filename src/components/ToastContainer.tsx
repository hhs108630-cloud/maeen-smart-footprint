import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 end-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xl animate-[fadeIn_0.2s_ease-out]"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#0F3D3E]" />
            )}
            {toast.type === 'warning' && (
              <AlertTriangle className="w-5 h-5 text-[#C59B27]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900">{toast.title}</p>
            {toast.subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                {toast.subtitle}
              </p>
            )}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
