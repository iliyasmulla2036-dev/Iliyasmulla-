import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface NoticeBannerProps {
  onOpenInfo: () => void;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ onOpenInfo }) => {
  return (
    <div className="bg-purple-950/30 border-b border-purple-900/30 px-4 py-2 text-xs text-purple-200">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="leading-tight">
            <strong>Local Pattern Engine:</strong> 100% free & offline in your browser. No paid API key required.
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenInfo}
          className="text-purple-300 hover:text-white underline underline-offset-2 shrink-0 font-medium inline-flex items-center gap-0.5 text-[11px]"
        >
          How it works <ArrowRight className="w-3 h-3 inline" />
        </button>
      </div>
    </div>
  );
};
