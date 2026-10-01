import React, { useState, useEffect, useMemo } from 'react';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Sign, Topic } from '../../types/sign';
import { SignDemonstrationPlayer } from '../common/SignDemonstrationPlayer';

interface FlashcardDeckProps {
  signs: Sign[];
  topics?: Topic[];
  initialDeckTopic?: string;
  onNavigateSign?: (slug: string) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  signs,
  topics = [],
  initialDeckTopic = 'all',
  onNavigateSign
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(initialDeckTopic);
  const [sortMode, setSortMode] = useState<'alphabetical' | 'topic-wise'>('alphabetical');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (initialDeckTopic) {
      setSelectedTopic(initialDeckTopic);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [initialDeckTopic]);

  // Filtered and sorted signs
  const activeDeck = useMemo(() => {
    let filtered = signs;

    // Filter by topic
    if (selectedTopic !== 'all') {
      filtered = filtered.filter((s) =>
        s.topics.some((t) => t.toLowerCase() === selectedTopic.toLowerCase())
      );
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.word.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    // Sort: Alphabetical vs Topic Wise
    const sorted = [...filtered];
    if (sortMode === 'alphabetical') {
      sorted.sort((a, b) => a.word.localeCompare(b.word));
    } else {
      sorted.sort(
        (a, b) =>
          (a.topics[0] || '').localeCompare(b.topics[0] || '') ||
          a.word.localeCompare(b.word)
      );
    }

    return sorted;
  }, [signs, selectedTopic, searchQuery, sortMode]);

  const currentSign = activeDeck[currentIndex] || null;

  const handleNext = () => {
    if (activeDeck.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeDeck.length);
    }, 150);
  };

  const handlePrev = () => {
    if (activeDeck.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + activeDeck.length) % activeDeck.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * Math.max(1, activeDeck.length)));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDeck.length]);

  if (signs.length === 0 || activeDeck.length === 0) {
    return (
      <div className="py-24 text-center bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto shadow-inner">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
          No flashcards available yet.
        </h2>
        <p className="text-sm text-[#374151] max-w-md mx-auto leading-relaxed">
          {selectedTopic !== 'all'
            ? `No signs have been uploaded for "${selectedTopic}" yet.`
            : 'Flashcards will appear once signs are published by SignWithChikky.'}
        </p>
        {selectedTopic !== 'all' && (
          <button
            type="button"
            onClick={() => {
              setSelectedTopic('all');
              setCurrentIndex(0);
            }}
            className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold"
          >
            Show All Signs
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Controls Bar: Topic Filter + Sorting Mode */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Topic Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#374151] shrink-0">Topic:</span>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-[#FAFAFA] border border-neutral-300 text-[#1A1A1A] focus:outline-hidden focus:border-[#DC2626]"
            >
              <option value="all">All Signs ({signs.length})</option>
              {topics.map((t) => (
                <option key={t.slug} value={t.title}>
                  {t.title} ({t.signCount || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Sorting Switch: Alphabetical vs Topic Wise */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#374151] shrink-0">Sort:</span>
            <div className="flex p-0.5 bg-[#F3F4F6] rounded-xl border border-neutral-200 text-xs">
              <button
                type="button"
                onClick={() => setSortMode('alphabetical')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  sortMode === 'alphabetical'
                    ? 'bg-white text-[#DC2626] shadow-2xs'
                    : 'text-[#374151] hover:text-[#1A1A1A]'
                }`}
              >
                Alphabetical
              </button>
              <button
                type="button"
                onClick={() => setSortMode('topic-wise')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  sortMode === 'topic-wise'
                    ? 'bg-white text-[#DC2626] shadow-2xs'
                    : 'text-[#374151] hover:text-[#1A1A1A]'
                }`}
              >
                Topic Wise
              </button>
            </div>

            <button
              type="button"
              onClick={handleShuffle}
              title="Shuffle Deck"
              className="p-2 rounded-xl bg-[#FAFAFA] hover:bg-[#FEE2E2] text-[#374151] hover:text-[#DC2626] transition-colors border border-neutral-200"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search within deck */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter current deck by word or sign ID..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FAFAFA] border border-neutral-300 text-[#1A1A1A] focus:outline-hidden focus:border-[#DC2626]"
          />
        </div>
      </div>

      {/* Main Flashcard Card Stage */}
      <div className="space-y-4">
        {/* Meta / Progress Header */}
        <div className="flex items-center justify-between text-xs text-[#374151] px-1 font-mono">
          <div>
            Card <strong className="text-[#1A1A1A]">{currentIndex + 1}</strong> of {activeDeck.length}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#DC2626]">{currentSign?.id}</span>
            <span>•</span>
            <span>{currentSign?.topics.join(', ')}</span>
          </div>
        </div>

        {/* 3D Animated Flip Card */}
        <div
          className="perspective-1000 w-full min-h-[420px] sm:min-h-[460px] cursor-pointer select-none"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative w-full h-full min-h-[420px] sm:min-h-[460px] rounded-3xl transition-transform duration-700 transform-style-preserve-3d shadow-md ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT SIDE: Word only */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-white border-2 border-neutral-200 p-8 sm:p-12 flex flex-col justify-between items-center text-center backface-hidden">
              <div className="w-full flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>{currentSign?.id}</span>
                <span className="text-[#DC2626] font-bold">
                  {currentSign?.topics[0] || 'ISL'}
                </span>
              </div>

              <div className="my-auto space-y-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#FEE2E2] text-[#DC2626] mx-auto font-mono text-5xl font-black shadow-inner">
                  {currentSign?.word}
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1A]">
                    {currentSign?.name}
                  </h2>
                  <p className="text-xs text-[#374151] font-mono mt-1">
                    Topics: {currentSign?.topics.join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626] bg-[#FEE2E2] px-5 py-2.5 rounded-full border border-[#FECDD3]">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap or Press Space to Reveal Sign</span>
              </div>
            </div>

            {/* BACK SIDE: Video, Meaning, How to Sign */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-[#1A1A1A] text-white border-2 border-neutral-800 p-6 sm:p-8 flex flex-col justify-between rotate-y-180 backface-hidden overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs text-neutral-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#FB7185] font-bold uppercase">{currentSign?.word}</span>
                  <span>•</span>
                  <span>{currentSign?.id}</span>
                </div>
                <span>Tap anywhere to flip back</span>
              </div>

              {currentSign && (
                <div className="my-4 space-y-4 text-left" onClick={(e) => e.stopPropagation()}>
                  <SignDemonstrationPlayer sign={currentSign} className="scale-95 origin-top" />
                  <div className="space-y-2 bg-neutral-900 p-4 rounded-2xl border border-neutral-800 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#FB7185] font-bold">Meaning</span>
                      <p className="text-neutral-300 mt-0.5 leading-relaxed">{currentSign.meaning}</p>
                    </div>
                    <div className="pt-2 border-t border-neutral-800">
                      <span className="text-[10px] uppercase font-mono text-[#FB7185] font-bold">How to Sign</span>
                      <p className="text-neutral-200 font-medium mt-0.5 leading-relaxed">{currentSign.howToSign.summary}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span className="font-mono text-[11px]">SignWithChikky Flashcards</span>
                {currentSign && onNavigateSign && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateSign(currentSign.slug);
                    }}
                    className="text-[#FB7185] hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Full Dictionary Entry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-neutral-200 text-[#1A1A1A] text-xs font-bold hover:border-[#DC2626] transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <span>Use Left / Right arrow keys</span>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
