import React from 'react';
import { X, ShieldCheck, Cpu, Code2, Sparkles, BookOpen } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white">
              PromptCraft AI Architecture & Engine
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Engine Transparency Notice */}
        <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3.5 space-y-1.5 text-xs text-emerald-200">
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Honest Engine Disclosure</span>
          </div>
          <p className="leading-relaxed text-slate-300 text-[12px]">
            PromptCraft AI is currently powered by a <strong>deterministic local prompt synthesis engine</strong>. It runs entirely inside your web browser. It does <em>not</em> claim to connect to a paid cloud LLM or burn API credits.
          </p>
        </div>

        {/* Why this method works */}
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
            <BookOpen className="w-4 h-4 text-purple-400" />
            Why the R-C-T-C-O Framework Matters
          </h4>
          <p>
            When beginners type vague prompts like <em>"Write an email about our app"</em>, large language models (ChatGPT, Claude, Gemini) produce generic, robotic answers.
          </p>
          <p>
            PromptCraft AI automatically converts your idea into the <strong>5 core pillars of prompt engineering</strong>:
          </p>
          <ul className="space-y-1 text-slate-300 list-disc list-inside bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
            <li><strong className="text-purple-300">Role:</strong> Assigns an elite domain specialist persona to set the baseline quality.</li>
            <li><strong className="text-purple-300">Context:</strong> Frames the objective, target audience, and stakes.</li>
            <li><strong className="text-purple-300">Task:</strong> Clear, step-by-step instructions.</li>
            <li><strong className="text-purple-300">Constraints:</strong> Negative rules, tone directives, and length guardrails.</li>
            <li><strong className="text-purple-300">Output Format:</strong> Explicit structure (markdown tables, bulleted lists, headers).</li>
          </ul>
        </div>

        {/* Future Backend API Ready */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-white flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-purple-400" />
            Architecture: Ready for Secure API Integration
          </h4>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            All synthesis logic is isolated in <code className="bg-slate-950 px-1 py-0.5 rounded text-purple-300 font-mono">synthesizePrompt()</code>. If you wish to connect a live Gemini or OpenAI server endpoint later, you simply route this through an Express server proxy without exposing API keys to client browsers:
          </p>
          <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-2.5 font-mono text-[10px] text-slate-300 overflow-x-auto">
            <code>
              {`// Secure server-side pattern:\napp.post('/api/craft-prompt', async (req, res) => {\n  const prompt = await gemini.models.generateContent(...);\n  res.json({ prompt });\n});`}
            </code>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-semibold text-white transition active:scale-[0.98]"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
