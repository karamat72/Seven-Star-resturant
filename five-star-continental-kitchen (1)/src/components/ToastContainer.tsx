import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-center justify-between gap-3 text-xs font-medium animate-in slide-in-from-bottom-5 duration-300 ${
            toast.type === 'success'
              ? 'bg-[#121c15]/95 text-emerald-200 border-emerald-700/60 shadow-emerald-950/40'
              : toast.type === 'error'
              ? 'bg-[#211314]/95 text-rose-200 border-rose-700/60 shadow-rose-950/40'
              : 'bg-[#151a1d]/95 text-stone-200 border-stone-700 shadow-black/50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#c5a059] flex-shrink-0" />}
            <span>{toast.message}</span>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-stone-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
