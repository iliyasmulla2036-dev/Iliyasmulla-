import React from 'react';
import { Category, Tone, OutputLength } from '../types';
import { Wand2, RotateCcw, AlertCircle, HelpCircle } from 'lucide-react';

interface PromptFormProps {
  task: string;
  category: Category;
  tone: Tone;
  length: OutputLength;
  validationError: string | null;
  isShaking: boolean;
  onTaskChange: (val: string) => void;
  onCategoryChange: (cat: Category) => void;
  onToneChange: (tone: Tone) => void;
  onLengthChange: (len: OutputLength) => void;
  onGenerate: () => void;
  onClear: () => void;
}

const CATEGORIES: { label: Category; icon: string; desc: string }[] = [
  { label: 'Content Creation', icon: '✍️', desc: 'Copywriting, blogs, social hooks' },
  { label: 'Business', icon: '💼', desc: 'Strategy, memos, proposals, ROI' },
  { label: 'Education', icon: '🎓', desc: 'Analogies, lessons, explainers' },
  { label: 'Productivity', icon: '⚡', desc: 'Routines, checklists, sprint SOPs' },
  { label: 'Image Generation', icon: '🖼️', desc: 'Midjourney, DALL-E, optics' },
];

const TONES: { label: Tone; icon: string }[] = [
  { label: 'Professional', icon: '👔' },
  { label: 'Friendly', icon: '😊' },
  { label: 'Creative', icon: '🎨' },
  { label: 'Simple', icon: '💡' },
];

const LENGTHS: { label: OutputLength; hint: string }[] = [
  { label: 'Short', hint: 'Concise sprint' },
  { label: 'Medium', hint: 'Balanced depth' },
  { label: 'Detailed', hint: 'In-depth brief' },
];

export const PromptForm: React.FC<PromptFormProps> = ({
  task,
  category,
  tone,
  length,
  validationError,
  isShaking,
  onTaskChange,
  onCategoryChange,
  onToneChange,
  onLengthChange,
  onGenerate,
  onClear,
}) => {
  const isTooShort = task.trim().length > 0 && task.trim().length < 8;

  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Task Input Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="taskInput" className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            <span>What do you want the AI to do?</span>
            <span className="text-purple-400 font-bold">*</span>
          </label>
          <span className="text-[11px] font-mono text-slate-400">
            {task.length} chars
          </span>
        </div>

        <div className="relative">
          <textarea
            id="taskInput"
            rows={3}
            value={task}
            onChange={(e) => onTaskChange(e.target.value)}
            placeholder="e.g. Write a friendly follow-up email to pitch our product to marketing agencies..."
            className={`w-full bg-[#080d1a] border rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none leading-relaxed ${
              validationError
                ? 'border-rose-500 focus:ring-rose-500'
                : 'border-slate-800 focus:border-purple-500'
            } ${isShaking ? 'animate-shake' : ''}`}
          />
        </div>

        {/* Validation Errors & Helpful Advice */}
        {validationError && (
          <div className="mt-2 text-xs text-rose-400 flex items-start gap-1.5 font-medium bg-rose-950/20 border border-rose-900/40 p-2.5 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span>{validationError}</span>
              <p className="text-[11px] text-rose-300/80 mt-0.5">
                Try writing 3–5 words or tapping one of the Quick Starter Ideas above!
              </p>
            </div>
          </div>
        )}

        {isTooShort && !validationError && (
          <div className="mt-2 text-xs text-amber-300 flex items-center gap-1.5 bg-amber-950/20 border border-amber-900/40 p-2 rounded-xl">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Tip: Adding who the audience is or specific goals will produce a vastly better prompt.</span>
          </div>
        )}
      </div>

      {/* Category Selector (5 distinct options) */}
      <div className="space-y-2">
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.label;
            const isWide = cat.label === 'Image Generation';

            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => onCategoryChange(cat.label)}
                className={`min-h-[48px] p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 active:scale-95 ${
                  isWide ? 'col-span-2 sm:col-span-2' : 'col-span-1'
                } ${
                  isSelected
                    ? 'border-purple-500 bg-purple-500/15 text-purple-200 brand-glow-sm'
                    : 'border-slate-800 bg-[#080d1a]/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <span className="text-lg shrink-0">{cat.icon}</span>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold truncate text-slate-100">
                    {cat.label}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {cat.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tone & Length Segmented Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Tone */}
        <div>
          <label htmlFor="toneSelect" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Tone
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#080d1a] border border-slate-800 rounded-xl">
            {TONES.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => onToneChange(t.label)}
                className={`min-h-[40px] px-2 py-1.5 text-xs font-medium rounded-lg transition flex items-center justify-center gap-1 active:scale-95 ${
                  tone === t.label
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Output Length */}
        <div>
          <label htmlFor="lengthSelect" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Output Detail Level
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#080d1a] border border-slate-800 rounded-xl">
            {LENGTHS.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => onLengthChange(l.label)}
                className={`min-h-[40px] px-2 py-1.5 text-xs font-medium rounded-lg transition flex flex-col items-center justify-center active:scale-95 ${
                  length === l.label
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{l.label}</span>
                <span className="text-[9px] opacity-75 font-normal">{l.hint}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="button"
          onClick={onGenerate}
          className="flex-1 min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:opacity-95 active:scale-[0.98] text-white font-semibold text-sm shadow-lg brand-glow flex items-center justify-center gap-2 transition"
        >
          <Wand2 className="w-4 h-4" />
          <span>Generate Structured Prompt</span>
        </button>

        <button
          type="button"
          onClick={onClear}
          className="min-h-[48px] px-4 rounded-xl border border-slate-800 bg-[#080d1a] hover:bg-slate-800/80 active:scale-95 text-slate-300 font-medium text-xs transition flex items-center justify-center gap-1.5"
          title="Reset input and output"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Clear</span>
        </button>
      </div>
    </section>
  );
};
