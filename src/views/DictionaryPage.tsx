import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  BookOpen,
  ChevronRight,
  Hand,
  RotateCcw,
  Sparkles,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Sign, Topic } from '../types/sign';
import { getAutocompleteSuggestions } from '../utils/search';

interface DictionaryPageProps {
  signs: Sign[];
  topics: Topic[];
  initialSearchQuery?: string;
  initialMode?: 'alphabetical' | 'topic-wise';
  initialTopic?: string;
  onNavigateSign: (slug: string) => void;
  onNavigateTopic: (slug: string) => void;
}

export const DictionaryPage: React.FC<DictionaryPageProps> = ({
  signs,
  topics,
  initialSearchQuery = '',
  initialMode = 'alphabetical',
  initialTopic = 'all',
  onNavigateSign,
  onNavigateTopic
}) => {
  const [browseMode, setBrowseMode] = useState<'alphabetical' | 'topic-wise'>(initialMode);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  useEffect(() => {
    if (initialMode) {
      setBrowseMode(initialMode);
    }
  }, [initialMode]);

  useEffect(() => {
    if (initialTopic && initialTopic !== 'all') {
      setSelectedTopic(initialTopic);
      setBrowseMode('topic-wise');
    }
  }, [initialTopic]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    return getAutocompleteSuggestions(searchQuery, 6, signs, topics);
  }, [searchQuery, signs, topics]);

  // Filtered signs based on active mode & search query
  const filteredSigns = useMemo(() => {
    let result = signs;

    // Search query matches across all signs
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return result.filter((s) => {
        const w = s.word.toLowerCase();
        const n = s.name.toLowerCase();
        const sl = s.slug.toLowerCase();
        const id = s.id.toLowerCase();
        const m = s.meaning.toLowerCase();
        const tMatch = s.topics.some((t) => t.toLowerCase().includes(q));

        return (
          w === q ||
          w.startsWith(q) ||
          w.includes(q) ||
          n.includes(q) ||
          sl.includes(q) ||
          id.includes(q) ||
          m.includes(q) ||
          tMatch
        );
      });
    }

    // Alphabetical mode letter navigation
    if (browseMode === 'alphabetical') {
      if (selectedLetter === '0-9') {
        result = result.filter((s) => /^[0-9]/.test(s.word));
      } else if (selectedLetter === 'SYMBOLS') {
        result = result.filter((s) => !/^[a-zA-Z0-9]/.test(s.word));
      } else if (selectedLetter !== 'ALL') {
        result = result.filter((s) => s.word.toUpperCase().startsWith(selectedLetter));
      }
    }

    // Topic mode filter
    if (browseMode === 'topic-wise') {
      if (selectedTopic !== 'all') {
        result = result.filter((s) =>
          s.topics.some((t) => t.toLowerCase() === selectedTopic.toLowerCase())
        );
      }
    }

    return result;
  }, [signs, browseMode, searchQuery, selectedLetter, selectedTopic]);

  // Group signs for Alphabetical Index view
  const groupedAlphabeticalSigns = useMemo(() => {
    if (browseMode !== 'alphabetical' || searchQuery.trim() || selectedLetter !== 'ALL') {
      return null;
    }

    const groups: { label: string; signs: Sign[] }[] = [];

    // Group letters A-Z
    alphabet.forEach((letter) => {
      const match = signs.filter((s) => s.word.toUpperCase().startsWith(letter));
      if (match.length > 0) {
        groups.push({
          label: letter,
          signs: match.sort((a, b) => a.word.localeCompare(b.word))
        });
      }
    });

    // Group Numbers
    const numSigns = signs.filter((s) => /^[0-9]/.test(s.word));
    if (numSigns.length > 0) {
      groups.push({
        label: 'Numbers (0-9)',
        signs: numSigns.sort((a, b) => a.word.localeCompare(b.word))
      });
    }

    // Group Special Characters
    const specSigns = signs.filter((s) => !/^[a-zA-Z0-9]/.test(s.word));
    if (specSigns.length > 0) {
      groups.push({
        label: 'Special Characters',
        signs: specSigns
      });
    }

    return groups;
  }, [browseMode, searchQuery, selectedLetter, signs]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLetter('ALL');
    setSelectedTopic('all');
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Header Banner */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] border border-[#FECDD3] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Searchable Language Repository</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
                Indian Sign Language Dictionary
              </h1>
              <p className="text-sm text-[#374151] max-w-2xl leading-relaxed">
                Comprehensive dictionary index containing letters (A-Z), numerals (0-9), special characters, and vocabulary signs with global Sign IDs, handshape breakdowns, and usage examples.
              </p>
            </div>

            {/* TWO BROWSING MODES SWITCHER */}
            <div className="flex items-center p-1 bg-[#F3F4F6] rounded-2xl border border-neutral-200 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  setBrowseMode('alphabetical');
                  setSelectedLetter('ALL');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  browseMode === 'alphabetical'
                    ? 'bg-white text-[#DC2626] shadow-xs'
                    : 'text-[#374151] hover:text-[#1A1A1A]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Alphabetical Mode</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setBrowseMode('topic-wise');
                  setSelectedTopic('all');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  browseMode === 'topic-wise'
                    ? 'bg-white text-[#DC2626] shadow-xs'
                    : 'text-[#374151] hover:text-[#1A1A1A]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Topic Wise Mode</span>
              </button>
            </div>
          </div>

          {/* LARGE SEARCH BAR WITH AUTOCOMPLETE */}
          <div className="relative max-w-3xl">
            <div className="relative flex items-center bg-white rounded-2xl border-2 border-neutral-300 shadow-xs focus-within:border-[#DC2626] transition-all">
              <Search className="w-5 h-5 absolute left-4 text-[#374151]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search words, signs, letters, numbers, or topics (e.g. app, Apple, 5, ?)..."
                className="w-full pl-12 pr-12 py-3.5 text-sm sm:text-base rounded-2xl bg-transparent text-[#1A1A1A] placeholder-neutral-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 p-1 rounded-md text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim() && suggestions.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-neutral-200 py-2 z-30"
                onMouseLeave={() => setShowSuggestions(false)}
              >
                <div className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                  Autocomplete Suggestions
                </div>
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-[#1A1A1A] hover:bg-[#FEE2E2] hover:text-[#DC2626] flex items-center justify-between transition-colors font-medium"
                  >
                    <span>{item}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* MODE 1 NAVIGATION: ALPHABETICAL (A-Z, 0-9, Symbols) */}
          {browseMode === 'alphabetical' && !searchQuery.trim() && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                Alphabetical Index Navigation:
              </span>
              <div className="flex flex-wrap gap-1.5 p-2 bg-[#F3F4F6] rounded-2xl border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setSelectedLetter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedLetter === 'ALL'
                      ? 'bg-[#DC2626] text-white shadow-xs'
                      : 'text-[#374151] hover:bg-[#FEE2E2] hover:text-[#DC2626]'
                  }`}
                >
                  ALL
                </button>
                {alphabet.map((letter) => {
                  const count = signs.filter((s) => s.word.toUpperCase().startsWith(letter)).length;
                  return (
                    <button
                      key={letter}
                      type="button"
                      disabled={count === 0}
                      onClick={() => setSelectedLetter(letter)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                        selectedLetter === letter
                          ? 'bg-[#DC2626] text-white shadow-xs'
                          : count > 0
                          ? 'text-[#1A1A1A] hover:bg-[#FEE2E2] hover:text-[#DC2626]'
                          : 'text-neutral-300 cursor-not-allowed'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
                <span className="w-px h-6 bg-neutral-300 self-center mx-1" />
                <button
                  type="button"
                  onClick={() => setSelectedLetter('0-9')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedLetter === '0-9'
                      ? 'bg-[#DC2626] text-white shadow-xs'
                      : 'text-[#374151] hover:bg-[#FEE2E2] hover:text-[#DC2626]'
                  }`}
                >
                  0-9
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLetter('SYMBOLS')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedLetter === 'SYMBOLS'
                      ? 'bg-[#DC2626] text-white shadow-xs'
                      : 'text-[#374151] hover:bg-[#FEE2E2] hover:text-[#DC2626]'
                  }`}
                >
                  Symbols (?!@)
                </button>
              </div>
            </div>
          )}

          {/* MODE 2 NAVIGATION: TOPIC WISE */}
          {browseMode === 'topic-wise' && !searchQuery.trim() && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                Select Existing Topic:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTopic('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedTopic === 'all'
                      ? 'bg-[#DC2626] text-white shadow-xs'
                      : 'bg-white border border-neutral-200 text-[#374151] hover:text-[#DC2626]'
                  }`}
                >
                  All Topics ({signs.length})
                </button>
                {topics.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => setSelectedTopic(t.title)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedTopic.toLowerCase() === t.title.toLowerCase()
                        ? 'bg-[#DC2626] text-white shadow-xs'
                        : 'bg-white border border-neutral-200 text-[#374151] hover:text-[#DC2626]'
                    }`}
                  >
                    <span>{t.title}</span>
                    <span className="ml-1.5 font-mono text-[10px] text-neutral-400">
                      ({t.signCount || 0})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Results Info & Filter Reset */}
        <div className="flex items-center justify-between text-xs text-[#374151] px-1">
          <div>
            Showing <strong className="text-[#1A1A1A]">{filteredSigns.length}</strong> signs in{' '}
            <span className="font-semibold text-[#DC2626]">
              {browseMode === 'alphabetical' ? 'Alphabetical Index' : `Topic: ${selectedTopic}`}
            </span>
          </div>
          {(searchQuery || selectedLetter !== 'ALL' || selectedTopic !== 'all') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[#DC2626] hover:text-[#EF4444] font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredSigns.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-[#1A1A1A]">No signs added yet.</h2>
            <p className="text-xs text-[#374151] max-w-md mx-auto">
              No signs match your active query. Check back once new signs are uploaded to the SignWithChikky database.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white font-bold text-xs shadow-xs"
            >
              Clear Filters
            </button>
          </div>
        ) : groupedAlphabeticalSigns ? (
          /* TRADITIONAL DICTIONARY ALPHABETICAL INDEX VIEW */
          <div className="space-y-10">
            {groupedAlphabeticalSigns.map((group) => (
              <section key={group.label} className="space-y-4">
                {/* Alphabet Index Anchor Header */}
                <div className="flex items-center gap-3 border-b-2 border-neutral-200 pb-2">
                  <span className="w-10 h-10 rounded-xl bg-[#1A1A1A] text-white font-mono font-black text-xl flex items-center justify-center shadow-xs">
                    {group.label.charAt(0)}
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-[#1A1A1A]">{group.label}</h2>
                    <span className="text-xs font-mono text-neutral-500">
                      {group.signs.length} entries
                    </span>
                  </div>
                </div>

                {/* Dictionary Entries Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group.signs.map((sign) => (
                    <div
                      key={sign.id}
                      onClick={() => onNavigateSign(sign.slug)}
                      className="group rounded-2xl bg-white border border-neutral-200 p-5 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        {/* Header: Global Sign ID + Topics */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-[#DC2626] font-bold text-[11px] bg-[#FEE2E2] px-2 py-0.5 rounded">
                            {sign.id}
                          </span>
                          <span className="text-neutral-400 font-mono text-[10px]">
                            {sign.handsUsed}
                          </span>
                        </div>

                        {/* Word + Name */}
                        <div className="flex items-baseline gap-2 pt-1">
                          <h3 className="text-2xl font-black text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors font-mono">
                            {sign.word}
                          </h3>
                          {sign.name !== sign.word && (
                            <span className="text-xs text-neutral-500 font-semibold truncate">
                              ({sign.name})
                            </span>
                          )}
                        </div>

                        {/* Topics Tags */}
                        <div className="flex flex-wrap gap-1">
                          {sign.topics.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-medium bg-[#F3F4F6] text-[#374151] px-2 py-0.5 rounded-md"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Meaning */}
                        <p className="text-xs text-[#374151] line-clamp-2 leading-relaxed">
                          {sign.meaning}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#DC2626]">
                        <span>Dictionary Entry</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* STANDARD GRID VIEW (Filtered by letter or topic or search) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSigns.map((sign) => (
              <div
                key={sign.id}
                onClick={() => onNavigateSign(sign.slug)}
                className="group rounded-2xl bg-white border border-neutral-200 p-5 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#DC2626] font-bold text-[11px] bg-[#FEE2E2] px-2 py-0.5 rounded">
                      {sign.id}
                    </span>
                    <span className="text-neutral-400 font-mono text-[10px]">
                      {sign.handsUsed}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <h3 className="text-2xl font-black text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors font-mono">
                      {sign.word}
                    </h3>
                    {sign.name !== sign.word && (
                      <span className="text-xs text-neutral-500 font-semibold truncate">
                        ({sign.name})
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {sign.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium bg-[#F3F4F6] text-[#374151] px-2 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-[#374151] line-clamp-2 leading-relaxed">
                    {sign.meaning}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#DC2626]">
                  <span>Dictionary Entry</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
