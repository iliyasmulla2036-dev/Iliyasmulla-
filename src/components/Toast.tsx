import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = '📋' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0f172a] text-white text-xs font-medium px-4 py-2.5 rounded-full border border-purple-500/40 shadow-2xl flex items-center gap-2 brand-glow animate-fade-in pointer-events-none">
      <span className="text-sm">{icon}</span>
      <span className="text-slate-100">{message}</span>
    </div>
  );
};
