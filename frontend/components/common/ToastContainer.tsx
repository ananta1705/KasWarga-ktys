'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
            case 'error':
              return <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-sky-600 shrink-0" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case 'success':
              return 'border-emerald-200 bg-emerald-50 text-emerald-900';
            case 'error':
              return 'border-rose-200 bg-rose-50 text-rose-900';
            case 'warning':
              return 'border-amber-200 bg-amber-50 text-amber-900';
            default:
              return 'border-sky-200 bg-sky-50 text-sky-900';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-slide-up ${getBorderColor()}`}
          >
            {getIcon()}
            <div className="flex-1 text-xs">
              <div className="font-extrabold flex justify-between items-center mb-0.5">
                <span className="capitalize">{toast.type}</span>
                {toast.timestamp && <span className="text-[10px] opacity-75 font-semibold">{toast.timestamp}</span>}
              </div>
              <p className="opacity-90 leading-relaxed font-semibold">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-60 hover:opacity-100 transition-opacity p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
