import React from 'react';
import { QuickSample } from '../types';
import { QUICK_SAMPLES } from '../utils/promptEngine';

interface QuickSamplesProps {
  onSelectSample: (sample: QuickSample) => void;
}

export const QuickSamples: React.FC<QuickSamplesProps> = ({ onSelectSample }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Quick Starter Ideas
        </span>
        <span className="text-[11px] text-purple-400 font-medium">Tap to load & generate</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1.5 custom-scroll">
        {QUICK_SAMPLES.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => onSelectSample(sample)}
            className="shrink-0 min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-medium transition active:scale-95 flex items-center gap-2"
          >
            <span className="text-sm">{sample.icon}</span>
            <span>{sample.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
