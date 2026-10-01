import React, { useState, useMemo } from 'react';
import { Search, Layers, ChevronRight, X, ArrowRight } from 'lucide-react';
import { Topic, Sign } from '../types/sign';

interface TopicsPageProps {
  topics: Topic[];
  signs: Sign[];
  onNavigateTopic: (slug: string) => void;
}

export const TopicsPage: React.FC<TopicsPageProps> = ({
  topics,
  signs,
  onNavigateTopic
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    const q = searchQuery.toLowerCase().trim();
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [topics, searchQuery]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] border border-[#FECDD3] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Curriculum Categories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
            Indian Sign Language Topics
          </h1>
          <p className="text-sm sm:text-base text-[#374151] max-w-2xl leading-relaxed">
            Thematic modules published by SignWithChikky. Master related signs together with structured vocabulary sets, 3D flashcards, and dedicated quizzes.
          </p>
        </div>

        {/* Empty State if no topics exist */}
        {topics.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto shadow-inner">
              <Layers className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              No topics available yet.
            </h2>
            <p className="text-sm text-[#374151] max-w-md mx-auto leading-relaxed">
              Topics published by SignWithChikky will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Search Topics Bar */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center bg-white rounded-2xl border-2 border-neutral-300 shadow-xs focus-within:border-[#DC2626] transition-colors">
                <Search className="w-5 h-5 absolute left-4 text-[#374151]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics by title or keyword..."
                  className="w-full pl-12 pr-12 py-3.5 text-sm rounded-2xl bg-transparent text-[#1A1A1A] placeholder-neutral-400 focus:outline-hidden"
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
            </div>

            {/* Topic Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic) => {
                const count = signs.filter((s) => s.topics.includes(topic.title)).length;
                return (
                  <div
                    key={topic.id}
                    className="group rounded-3xl bg-white border border-neutral-200 overflow-hidden hover:border-[#DC2626] hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div className="p-6 sm:p-7 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[#DC2626] uppercase font-bold text-[11px] bg-[#FEE2E2] px-2.5 py-0.5 rounded-md">
                          Topic
                        </span>
                        <span className="font-mono font-bold text-[#374151] text-xs">
                          {count} Signs
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">
                        {topic.title}
                      </h3>

                      <p className="text-xs text-[#374151] line-clamp-3 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        type="button"
                        onClick={() => onNavigateTopic(topic.slug)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <span>View Topic</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
