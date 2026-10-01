import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Layers,
  Sparkles,
  HelpCircle,
  Compass,
  ArrowRight,
  ChevronRight,
  FolderOpen,
  ShieldCheck,
  Heart,
  Youtube,
  Instagram
} from 'lucide-react';
import { Sign, Topic } from '../types/sign';
import { getAutocompleteSuggestions } from '../utils/search';
import { SignLogo } from '../components/common/SignLogo';
import { TUTORIAL_ROADMAP } from '../data/tutorialData';

interface HomePageProps {
  signs: Sign[];
  topics: Topic[];
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  signs,
  topics,
  onNavigate
}) => {
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [heroSuggestionsVisible, setHeroSuggestionsVisible] = useState(false);

  const suggestions = getAutocompleteSuggestions(heroSearchInput, 6, signs, topics);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      onNavigate(`/dictionary?q=${encodeURIComponent(heroSearchInput.trim())}`);
    } else {
      onNavigate('/dictionary');
    }
  };

  const handleSuggestionClick = (item: string) => {
    setHeroSearchInput(item);
    onNavigate(`/dictionary?q=${encodeURIComponent(item)}`);
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION: Dark Maroon Background (#7F1D1D) */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 bg-[#7F1D1D] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#991B1B]/40 via-transparent to-black/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          {/* Subtle Educational Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FECDD3] text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <SignLogo variant="icon" size={16} />
            <span>Public Indian Sign Language Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Learn Indian Sign Language
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-[#FECDD3] max-w-2xl mx-auto leading-relaxed font-medium">
            Dictionary, Topics, Flashcards, Quizzes and Tutorials.
          </p>

          {/* Buttons: Search Signs & Start Learning */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/dictionary')}
              className="px-7 py-3.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Search Signs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/tutorial')}
              className="px-7 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-[#1A1A1A] font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>Start Learning</span>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </button>
          </div>

          {/* Large Centered Search Bar */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center shadow-xl rounded-2xl bg-white text-[#1A1A1A] border-2 border-white/30 focus-within:border-[#EF4444] transition-colors"
              >
                <Search className="w-5 h-5 absolute left-4 text-[#374151]" />
                <input
                  type="text"
                  value={heroSearchInput}
                  onChange={(e) => {
                    setHeroSearchInput(e.target.value);
                    setHeroSuggestionsVisible(true);
                  }}
                  onFocus={() => setHeroSuggestionsVisible(true)}
                  placeholder="Search across dictionary (e.g., Apple, A, 5, ?)..."
                  className="w-full pl-12 pr-28 py-4 text-sm sm:text-base rounded-2xl bg-transparent text-[#1A1A1A] placeholder-neutral-400 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 bg-[#DC2626] hover:bg-[#EF4444] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Autocomplete Dropdown */}
              {heroSuggestionsVisible && suggestions.length > 0 && (
                <div
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-200 py-2 z-30 text-left"
                  onMouseLeave={() => setHeroSuggestionsVisible(false)}
                >
                  <div className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                    Suggested Entries
                  </div>
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#FEE2E2] hover:text-[#DC2626] flex items-center justify-between transition-colors font-medium"
                    >
                      <span>{item}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACCESS SECTION (Background: White) */}
      <section className="bg-white py-14 sm:py-18 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#DC2626] font-bold">
              Quick Navigation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              Quick Access Modules
            </h2>
            <p className="text-[#374151] text-xs sm:text-sm">
              Explore essential tools organized for structured self-study and reference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Dictionary */}
            <div
              onClick={() => onNavigate('/dictionary')}
              className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">Dictionary</h3>
                <p className="text-xs text-[#374151] leading-relaxed">
                  Searchable index with Alphabetical (A-Z, 0-9, Symbols) and Topic Wise browsing.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#DC2626]">
                <span>Browse Dictionary</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Topics */}
            <div
              onClick={() => onNavigate('/topics')}
              className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">Topics</h3>
                <p className="text-xs text-[#374151] leading-relaxed">
                  Signs organized into real thematic categories like Alphabet, Numbers, and Technology.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#DC2626]">
                <span>View Topics</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Flashcards */}
            <div
              onClick={() => onNavigate('/flashcards')}
              className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">Flashcards</h3>
                <p className="text-xs text-[#374151] leading-relaxed">
                  Smooth 3D animated flip cards with Alphabetical and Topic Wise sorting.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#DC2626]">
                <span>Practice Flashcards</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Quizzes */}
            <div
              onClick={() => onNavigate('/quizzes')}
              className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">Quizzes</h3>
                <p className="text-xs text-[#374151] leading-relaxed">
                  Interactive Topic Quizzes and Mixed Quizzes with instant scoring and explanations.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#DC2626]">
                <span>Take a Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR TOPICS SECTION (Background: Light Gray #F3F4F6) */}
      <section className="bg-[#F3F4F6] py-14 sm:py-18 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#DC2626] font-bold">
                Categorized Collections
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mt-1">
                Popular Topics
              </h2>
            </div>
            {topics.length > 0 && (
              <button
                type="button"
                onClick={() => onNavigate('/topics')}
                className="text-xs font-bold text-[#DC2626] hover:text-[#EF4444] flex items-center gap-1"
              >
                <span>View All Topics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {topics.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200 space-y-2">
              <Layers className="w-8 h-8 text-neutral-400 mx-auto" />
              <p className="text-base font-bold text-[#1A1A1A]">No topics available yet.</p>
              <p className="text-xs text-[#374151]">
                Topics published by SignWithChikky will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.slice(0, 6).map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-6 hover:border-[#DC2626] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#DC2626] font-bold text-[10px] bg-[#FEE2E2] px-2 py-0.5 rounded">
                        Topic
                      </span>
                      <span className="font-mono text-xs font-bold text-[#374151]">
                        {topic.signCount || 0} Signs
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A]">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-[#374151] line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/topics/${topic.slug}`)}
                    className="w-full py-2 px-3 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>View Topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. TUTORIAL ROADMAP SECTION (Background: White) */}
      <section className="bg-white py-14 sm:py-18 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#DC2626] font-bold">
                Recommended Learning Order
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mt-1">
                Tutorial Roadmap
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/tutorial')}
              className="text-xs font-bold text-[#DC2626] hover:text-[#EF4444] flex items-center gap-1"
            >
              <span>Explore Complete Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TUTORIAL_ROADMAP.slice(0, 6).map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 hover:border-[#DC2626] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#DC2626] text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                      {item.number}
                    </span>
                    <h3 className="text-lg font-bold text-[#1A1A1A]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#374151] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/dictionary?topic=${encodeURIComponent(item.title)}`)}
                    className="flex-1 py-1.5 rounded-lg bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold text-center"
                  >
                    Learn
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/flashcards?topic=${item.topicSlug}`)}
                    className="flex-1 py-1.5 rounded-lg bg-white border border-neutral-300 hover:border-[#DC2626] text-[#1A1A1A] text-xs font-bold text-center"
                  >
                    Flashcards
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/quizzes?topic=${item.topicSlug}`)}
                    className="flex-1 py-1.5 rounded-lg bg-white border border-neutral-300 hover:border-[#DC2626] text-[#1A1A1A] text-xs font-bold text-center"
                  >
                    Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LATEST CONTENT SECTION (Background: Light Gray #F3F4F6) */}
      <section className="bg-[#F3F4F6] py-14 sm:py-18 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#DC2626] font-bold">
                Dictionary Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mt-1">
                Latest Content
              </h2>
            </div>
            {signs.length > 0 && (
              <button
                type="button"
                onClick={() => onNavigate('/dictionary')}
                className="text-xs font-bold text-[#DC2626] hover:text-[#EF4444] flex items-center gap-1"
              >
                <span>View Full Dictionary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {signs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200 space-y-2">
              <FolderOpen className="w-8 h-8 text-neutral-400 mx-auto" />
              <p className="text-base font-bold text-[#1A1A1A]">No content uploaded yet.</p>
              <p className="text-xs text-[#374151]">
                Signs published by SignWithChikky will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {signs.slice(0, 8).map((sign) => (
                <div
                  key={sign.id}
                  onClick={() => onNavigate(`/dictionary/${sign.slug}`)}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#DC2626] font-bold text-[10px] bg-[#FEE2E2] px-1.5 py-0.5 rounded">
                        {sign.id}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {sign.handsUsed}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 pt-1">
                      <h4 className="text-2xl font-black text-[#1A1A1A] font-mono">
                        {sign.word}
                      </h4>
                      {sign.name !== sign.word && (
                        <span className="text-xs text-neutral-500 font-semibold truncate">
                          ({sign.name})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#374151] line-clamp-2">
                      {sign.meaning}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#DC2626]">
                    <span>View Sign</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. ABOUT SIGNWITHCHIKKY SECTION (Background: White) */}
      <section className="bg-white py-14 sm:py-20 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Public Educational Platform</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">
              About SignWithChikky
            </h2>
            <p className="text-sm text-[#374151] leading-relaxed">
              SignWithChikky is a free public educational initiative dedicated to standardizing and organizing Indian Sign Language (ISL) learning. Inspired by the clarity and usability of platforms like CodeWithHarry, MDN, and GeeksforGeeks, we provide an open, searchable repository of signs, interactive 3D flashcards, topic quizzes, and tutorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A1A]">100% Free & Open</h3>
              <p className="text-xs text-[#374151] leading-relaxed">
                Accessible to all deaf and hearing students, parents, teachers, and curious language enthusiasts across India.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A1A]">Authentic ISL System</h3>
              <p className="text-xs text-[#374151] leading-relaxed">
                Features authentic two-handed fingerspelling, Indian cultural salutations (Namaste), and native grammar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A1A]">Structured Flow</h3>
              <p className="text-xs text-[#374151] leading-relaxed">
                Follow our clear progression: <strong>Learn → Flashcards → Quiz</strong> across every single learning module.
              </p>
            </div>
          </div>

          {/* Social Links Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/youtube')}
              className="px-5 py-2.5 rounded-xl bg-white border border-neutral-200 hover:border-[#DC2626] text-xs font-bold text-[#1A1A1A] flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Youtube className="w-4 h-4 text-[#DC2626]" />
              <span>YouTube Channel (@signwithchikky)</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/instagram')}
              className="px-5 py-2.5 rounded-xl bg-white border border-neutral-200 hover:border-[#DC2626] text-xs font-bold text-[#1A1A1A] flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Instagram className="w-4 h-4 text-[#DC2626]" />
              <span>Instagram Profile (@signwithchikky)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
