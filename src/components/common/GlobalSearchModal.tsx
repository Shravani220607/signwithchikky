import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';
import { searchAll, getAutocompleteSuggestions, SearchResult } from '../../utils/search';
import { Sign, Topic } from '../../types/sign';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
  signs: Sign[];
  topics: Topic[];
  initialQuery?: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  signs,
  topics,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions(getAutocompleteSuggestions('', 6, signs, topics));
      return;
    }
    const res = searchAll(query, signs, topics);
    setResults(res);
    setSuggestions(getAutocompleteSuggestions(query, 6, signs, topics));
  }, [query, signs, topics]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-neutral-200">
          <Search className="w-5 h-5 text-[#DC2626] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all signs, words, letters, numbers, or topics..."
            className="w-full bg-transparent text-[#1A1A1A] placeholder-neutral-400 text-base focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-xs font-mono px-2 py-1 bg-neutral-100 text-neutral-500 rounded-md border border-neutral-200"
          >
            ESC
          </button>
        </div>

        {/* Suggestions Bar */}
        {suggestions.length > 0 && (
          <div className="px-4 py-2 bg-[#FAFAFA] border-b border-neutral-200 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#374151] font-bold shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#DC2626]" />
              Suggestions:
            </span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="px-2.5 py-1 rounded-md bg-[#F3F4F6] hover:bg-[#FEE2E2] hover:text-[#DC2626] transition-colors whitespace-nowrap text-[#374151] font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-[#374151]">
              <p className="text-sm">Type any letter (A-Z), number (0-9), symbol (?, @), or word (Apple, Computer).</p>
              {signs.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['Apple', 'A', 'Book', 'Computer', '5', '?', 'Namaste'].map((w) => {
                    return (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setQuery(w)}
                        className="text-xs px-2.5 py-1 rounded-lg border border-neutral-200 hover:border-[#DC2626] text-[#374151] font-mono font-bold"
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-[#374151]">
              <p className="text-base font-bold text-[#1A1A1A]">No signs found for &quot;{query}&quot;</p>
              <p className="text-xs text-neutral-400 mt-1">
                Signs published by SignWithChikky will be searchable here.
              </p>
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={`${item.type}-${item.title}-${idx}`}
                onClick={() => {
                  onNavigate(item.url);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#FEE2E2]/60 border border-transparent hover:border-[#DC2626]/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                      item.type === 'sign'
                        ? 'bg-[#DC2626] text-white font-mono text-base'
                        : 'bg-[#1A1A1A] text-white'
                    }`}
                  >
                    {item.type === 'sign' ? item.sign?.word || <BookOpen className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#DC2626]">
                        {item.title}
                      </span>
                      {item.sign && (
                        <span className="text-[10px] font-mono text-[#DC2626] font-semibold bg-[#FEE2E2] px-1.5 py-0.5 rounded">
                          {item.sign.id}
                        </span>
                      )}
                      {item.badge && (
                        <span className="text-[10px] font-mono uppercase text-neutral-500 bg-[#F3F4F6] px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#374151] mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-neutral-400 group-hover:text-[#DC2626] shrink-0">
                  <span className="hidden sm:inline mr-1">View</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#FAFAFA] text-neutral-500 text-xs flex justify-between items-center border-t border-neutral-200">
          <span>SignWithChikky Public ISL Dictionary</span>
          <span className="font-mono text-[11px]">{results.length} results</span>
        </div>
      </div>
    </div>
  );
};
