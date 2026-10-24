import React, { useState } from 'react';
import { GeneratedPrompt, Category, Tone, OutputLength } from '../types';
import { formatPromptForClipboard, copyToClipboard } from '../utils/promptEngine';
import { Check, Copy, User, Globe, Target, ShieldAlert, FileText, Sparkles, SlidersHorizontal, Lightbulb, Code } from 'lucide-react';

interface OutputDisplayProps {
  prompt: GeneratedPrompt;
  category: Category;
  tone: Tone;
  length: OutputLength;
  onNotify: (msg: string, icon?: string) => void;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  prompt,
  category,
  tone,
  length,
  onNotify,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopyFullPrompt = async () => {
    const text = formatPromptForClipboard(prompt);
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedAll(true);
      onNotify('Full prompt copied to clipboard!', '✅');
      setTimeout(() => setCopiedAll(false), 2200);
    } else {
      onNotify('Failed to copy. Please select and copy manually.', '❌');
    }
  };

  const handleCopySingleSection = async (title: string, content: string) => {
    const text = `### ${title}\n${content}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedSection(title);
      onNotify(`Copied ${title}!`, '📋');
      setTimeout(() => setCopiedSection(null), 1800);
    }
  };

  return (
    <section className="space-y-3.5 scroll-mt-20">
      {/* Top Header of Output */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        {/* Unboxed Metadata following frontend-design constitution */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span className="text-purple-400 font-semibold">{category}</span>
          <span aria-hidden="true">·</span>
          <span>{tone} Tone</span>
          <span aria-hidden="true">·</span>
          <span>{length} Detail</span>
        </div>

        {/* Copy All Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyFullPrompt}
            className={`min-h-[44px] px-4 rounded-xl text-xs font-semibold transition active:scale-95 flex items-center gap-1.5 ${
              copiedAll
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-purple-600 hover:bg-purple-500 text-white brand-glow'
            }`}
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Structured Cards Container */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3.5">
        
        {/* 1. Role Block */}
        <div className="bg-[#080d1a] border border-slate-800 rounded-xl p-3.5 transition hover:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" />
              1. Role & Persona
            </span>
            <button
              type="button"
              onClick={() => handleCopySingleSection('ROLE & PERSONA', prompt.role)}
              className="text-[11px] text-slate-400 hover:text-slate-200 p-1 rounded transition"
              title="Copy this section"
            >
              {copiedSection === 'ROLE & PERSONA' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            {prompt.role}
          </p>
        </div>

        {/* 2. Context & Audience */}
        <div className="bg-[#080d1a] border border-slate-800 rounded-xl p-3.5 transition hover:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              2. Context & Audience
            </span>
            <button
              type="button"
              onClick={() => handleCopySingleSection('CONTEXT & AUDIENCE', prompt.context)}
              className="text-[11px] text-slate-400 hover:text-slate-200 p-1 rounded transition"
              title="Copy this section"
            >
              {copiedSection === 'CONTEXT & AUDIENCE' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            {prompt.context}
          </p>
        </div>

        {/* 3. Core Task */}
        <div className="bg-[#080d1a] border border-slate-800 rounded-xl p-3.5 transition hover:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-purple-400" />
              3. Core Task
            </span>
            <button
              type="button"
              onClick={() => handleCopySingleSection('CORE TASK', prompt.task)}
              className="text-[11px] text-slate-400 hover:text-slate-200 p-1 rounded transition"
              title="Copy this section"
            >
              {copiedSection === 'CORE TASK' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-slate-100 text-xs sm:text-sm font-medium leading-relaxed">
            {prompt.task}
          </p>
        </div>

        {/* 4. Constraints & Rules */}
        <div className="bg-[#080d1a] border border-slate-800 rounded-xl p-3.5 transition hover:border-slate-700">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              4. Constraints & Guidelines
            </span>
            <button
              type="button"
              onClick={() => handleCopySingleSection('CONSTRAINTS & GUIDELINES', prompt.constraints.map(c => `- ${c}`).join('\n'))}
              className="text-[11px] text-slate-400 hover:text-slate-200 p-1 rounded transition"
              title="Copy this section"
            >
              {copiedSection === 'CONSTRAINTS & GUIDELINES' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <ul className="space-y-1.5 text-slate-300 text-xs sm:text-sm">
            {prompt.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-purple-400 mt-1 text-[10px]">•</span>
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Expected Output Format */}
        <div className="bg-[#080d1a] border border-slate-800 rounded-xl p-3.5 transition hover:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              5. Expected Output Format
            </span>
            <button
              type="button"
              onClick={() => handleCopySingleSection('OUTPUT FORMAT', prompt.outputFormat)}
              className="text-[11px] text-slate-400 hover:text-slate-200 p-1 rounded transition"
              title="Copy this section"
            >
              {copiedSection === 'OUTPUT FORMAT' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <pre className="text-slate-200 text-xs sm:text-sm font-sans whitespace-pre-line leading-relaxed">
            {prompt.outputFormat}
          </pre>
        </div>

        {/* Image Generation Specifics: Negative Prompt & Parameters */}
        {prompt.negativePrompt && (
          <div className="bg-[#080d1a] border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div>
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 mb-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
                Negative Prompt (Tokens to Exclude)
              </span>
              <p className="text-xs text-rose-300/90 font-mono bg-rose-950/20 border border-rose-900/30 p-2 rounded-lg">
                {prompt.negativePrompt}
              </p>
            </div>
            {prompt.parameterFlags && (
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Engine Parameters
                </span>
                <p className="text-xs text-indigo-300 font-mono bg-indigo-950/20 border border-indigo-900/30 p-2 rounded-lg">
                  {prompt.parameterFlags}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Suggested Variables to Customize */}
        {prompt.suggestedVariables && prompt.suggestedVariables.length > 0 && (
          <div className="bg-purple-950/15 border border-purple-900/40 rounded-xl p-3">
            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Code className="w-3 h-3 text-purple-400" />
              Customize These Variables For Best Results
            </span>
            <div className="flex flex-wrap gap-1.5">
              {prompt.suggestedVariables.map((v, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-purple-900/30 text-purple-200 font-mono text-xs border border-purple-800/40"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Beginner Pro Tips */}
        {prompt.tips && prompt.tips.length > 0 && (
          <div className="bg-[#0b1222] border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-slate-100">Beginner Pro Tips:</strong>
              <ul className="space-y-0.5 list-disc list-inside text-slate-400 text-[11px]">
                {prompt.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
