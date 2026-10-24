import React from 'react';
import { Sparkles, Info, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInfo }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Brand Zone */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center brand-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">PromptCraft</span>
              <span className="text-[10px] font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 rounded">
                AI ARCHITECT
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Transform raw ideas into high-yield AI prompts</p>
          </div>
        </div>

        {/* Right Action: Info / Transparency */}
        <button
          type="button"
          onClick={onOpenInfo}
          className="min-h-[44px] px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition active:scale-95"
          title="About the Local Pattern Engine"
        >
          <Info className="w-4 h-4 text-purple-400" />
          <span className="hidden sm:inline">Engine Info</span>
        </button>
      </div>
    </header>
  );
};
