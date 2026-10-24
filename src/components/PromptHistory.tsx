import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { formatPromptForClipboard, copyToClipboard } from '../utils/promptEngine';
import { Clock, Trash2, ArrowUpRight, Copy, Check, AlertTriangle } from 'lucide-react';

interface PromptHistoryProps {
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onNotify: (msg: string, icon?: string) => void;
}

export const PromptHistory: React.FC<PromptHistoryProps> = ({
  history,
  onRestore,
  onDelete,
  onClearAll,
  onNotify,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleCopyHistory = async (item: HistoryItem) => {
    const text = formatPromptForClipboard(item.prompt);
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(item.id);
      onNotify('Copied historical prompt!', '📋');
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      onNotify('Failed to copy. Please select manually.', '❌');
    }
  };

  return (
    <section className="space-y-3 pt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Local Prompt History
          </h2>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
            {history.length} saved
          </span>
        </div>

        {history.length > 0 && (
          <div>
            {showConfirmClear ? (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-rose-300">Clear all?</span>
                <button
                  type="button"
                  onClick={() => {
                    onClearAll();
                    setShowConfirmClear(false);
                  }}
                  className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-medium"
                >
                  Yes, Clear
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmClear(false)}
                  className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[11px]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirmClear(true)}
                className="text-xs text-rose-400 hover:text-rose-300 transition flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* History Items or Empty Notice */}
      {history.length === 0 ? (
        <div className="text-center py-8 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30 text-slate-500 text-xs space-y-1">
          <p className="text-slate-400 font-medium">No prompts generated yet in this browser.</p>
          <p className="text-[11px]">
            Your generated prompts are automatically saved locally here so you never lose them.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3 hover:border-slate-700 transition flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                {/* Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400 overflow-hidden">
                  <span className="text-purple-300 font-medium truncate">
                    {item.category}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-[11px] text-slate-500 truncate">
                    {item.formattedDate}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-[10px] text-slate-500">
                    {item.tone}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRestore(item)}
                    className="min-h-[36px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition active:scale-95 flex items-center gap-1"
                    title="Load into editor"
                  >
                    <span>Load</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyHistory(item)}
                    className="min-h-[36px] min-w-[36px] p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95 flex items-center justify-center"
                    title="Copy prompt"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="min-h-[36px] min-w-[36px] p-1.5 rounded-lg hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition flex items-center justify-center"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Task Preview */}
              <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                {item.userIdea}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
