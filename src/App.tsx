import React, { useState, useEffect, useRef } from 'react';
import { Category, Tone, OutputLength, GeneratedPrompt, HistoryItem, QuickSample } from './types';
import { synthesizePrompt } from './utils/promptEngine';
import { Header } from './components/Header';
import { NoticeBanner } from './components/NoticeBanner';
import { QuickSamples } from './components/QuickSamples';
import { PromptForm } from './components/PromptForm';
import { OutputDisplay } from './components/OutputDisplay';
import { PromptHistory } from './components/PromptHistory';
import { InfoModal } from './components/InfoModal';
import { Toast } from './components/Toast';

const STORAGE_KEY = 'promptcraft_history_v1';

export default function App() {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState<Category>('Content Creation');
  const [tone, setTone] = useState<Tone>('Professional');
  const [length, setLength] = useState<OutputLength>('Medium');
  
  const [currentPrompt, setCurrentPrompt] = useState<GeneratedPrompt | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; icon?: string } | null>(null);

  const outputRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (err) {
      console.warn('Failed to parse prompt history from localStorage:', err);
    }
  }, []);

  // Save history to localStorage whenever updated
  const saveHistory = (items: HistoryItem[]) => {
    setHistory(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Failed to save prompt history to localStorage:', err);
    }
  };

  // Toast messenger helper
  const showToast = (message: string, icon = '📋') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast(null);
    }, 2400);
  };

  // Clear validation when user types
  const handleTaskChange = (val: string) => {
    setTask(val);
    if (val.trim().length > 0 && validationError) {
      setValidationError(null);
    }
  };

  // Quick Starter Sample handler
  const handleSelectSample = (sample: QuickSample) => {
    setTask(sample.task);
    setCategory(sample.category);
    setTone(sample.tone);
    setLength(sample.length);
    setValidationError(null);

    // Immediately generate for instant preview
    const generated = synthesizePrompt(sample.task, sample.category, sample.tone, sample.length);
    setCurrentPrompt(generated);

    // Save to history
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      formattedDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userIdea: sample.task,
      category: sample.category,
      tone: sample.tone,
      length: sample.length,
      prompt: generated,
    };

    const updated = [newItem, ...history.filter(h => h.userIdea !== sample.task)].slice(0, 15);
    saveHistory(updated);

    showToast(`Loaded "${sample.label}" sample!`, '✨');

    // Smooth scroll to output
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Primary Prompt Generation handler
  const handleGeneratePrompt = () => {
    const trimmed = task.trim();

    // Validation
    if (!trimmed) {
      setValidationError('Please describe your idea or task before generating.');
      setIsShaking(true);
      showToast('Please enter an idea first!', '⚠️');
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setValidationError(null);

    // Run synthesis engine
    const prompt = synthesizePrompt(trimmed, category, tone, length);
    setCurrentPrompt(prompt);

    // Append to local history
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      formattedDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userIdea: trimmed,
      category,
      tone,
      length,
      prompt,
    };

    const updated = [newItem, ...history.filter(h => h.userIdea !== trimmed)].slice(0, 15);
    saveHistory(updated);

    showToast('Prompt generated successfully!', '🪄');

    // Scroll smoothly to output
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Working Clear Handler
  const handleClear = () => {
    setTask('');
    setValidationError(null);
    setCurrentPrompt(null);
    showToast('Cleared input & prompt', '🗑️');
  };

  // Restore from history
  const handleRestoreHistory = (item: HistoryItem) => {
    setTask(item.userIdea);
    setCategory(item.category);
    setTone(item.tone);
    setLength(item.length);
    setValidationError(null);
    setCurrentPrompt(item.prompt);

    showToast('Restored from prompt history!', '📂');

    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Delete single history item
  const handleDeleteHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    saveHistory(updated);
    showToast('Removed from history', '🗑️');
  };

  // Clear all history
  const handleClearAllHistory = () => {
    saveHistory([]);
    showToast('All history cleared', '🧹');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between antialiased selection:bg-purple-600 selection:text-white bg-[#0b0f19] text-slate-100">
      
      {/* Top Header */}
      <Header onOpenInfo={() => setIsInfoOpen(true)} />

      {/* Notice Banner: Engine Transparency */}
      <NoticeBanner onOpenInfo={() => setIsInfoOpen(true)} />

      {/* Main Responsive Content */}
      <main className="max-w-2xl mx-auto w-full px-4 py-4 flex-1 space-y-5">
        
        {/* Quick Try Samples Carousel */}
        <QuickSamples onSelectSample={handleSelectSample} />

        {/* Input Form & Selectors */}
        <PromptForm
          task={task}
          category={category}
          tone={tone}
          length={length}
          validationError={validationError}
          isShaking={isShaking}
          onTaskChange={handleTaskChange}
          onCategoryChange={setCategory}
          onToneChange={setTone}
          onLengthChange={setLength}
          onGenerate={handleGeneratePrompt}
          onClear={handleClear}
        />

        {/* Structured Output Panel */}
        <div ref={outputRef}>
          {currentPrompt && (
            <OutputDisplay
              prompt={currentPrompt}
              category={category}
              tone={tone}
              length={length}
              onNotify={showToast}
            />
          )}
        </div>

        {/* Local History Section */}
        <PromptHistory
          history={history}
          onRestore={handleRestoreHistory}
          onDelete={handleDeleteHistory}
          onClearAll={handleClearAllHistory}
          onNotify={showToast}
        />

        {/* Transparency Footnote */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setIsInfoOpen(true)}
            className="text-xs text-slate-500 hover:text-purple-300 underline underline-offset-4 decoration-slate-800 transition"
          >
            How PromptCraft AI works: Zero API keys, 100% deterministic local engine
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-3 text-center text-[11px] text-slate-500">
        PromptCraft AI · Designed for high-clarity prompting on Android & Web
      </footer>

      {/* Info & Architecture Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />

      {/* Instant Feedback Toast */}
      <Toast message={toast?.message ?? null} icon={toast?.icon} />
    </div>
  );
}
