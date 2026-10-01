import React from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { Sign, Topic } from '../types/sign';
import { TUTORIAL_ROADMAP } from '../data/tutorialData';

interface TutorialPageProps {
  signs: Sign[];
  topics: Topic[];
  onNavigate: (path: string) => void;
  onNavigateSign: (slug: string) => void;
}

export const TutorialPage: React.FC<TutorialPageProps> = ({
  signs,
  topics,
  onNavigate
}) => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEE2E2] border border-[#FECDD3] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Curriculum Roadmap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            Indian Sign Language Roadmap
          </h1>
          <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
            A structured visual guide from foundational two-handed fingerspelling to daily conversations. Follow the learning flow: <strong>Learn → Flashcards → Quiz</strong> for every section.
          </p>
        </div>

        {/* Roadmap List - Visual Roadmap with simple numbers (NO "Step" word) */}
        <div className="relative space-y-6 before:absolute before:inset-0 before:left-7 sm:before:left-8 before:w-0.5 before:bg-neutral-300 before:pointer-events-none">
          {TUTORIAL_ROADMAP.map((item) => {
            const matchingSigns = signs.filter((s) =>
              s.topics.some(
                (t) =>
                  t.toLowerCase() === item.title.toLowerCase() ||
                  t.toLowerCase() === item.topicSlug.toLowerCase()
              )
            );

            const matchingTopic = topics.find((t) => t.slug === item.topicSlug);

            const handleLearn = () => {
              if (matchingTopic) {
                onNavigate(`/topics/${matchingTopic.slug}`);
              } else {
                onNavigate(`/dictionary?topic=${encodeURIComponent(item.title)}`);
              }
            };

            return (
              <div
                key={item.number}
                className="relative flex items-start gap-4 sm:gap-6 group"
              >
                {/* Number Circle Marker - ONLY the number */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#DC2626] text-white font-black text-xl sm:text-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform font-mono">
                  {item.number}
                </div>

                {/* Section Content Card: White */}
                <div className="flex-1 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-7 shadow-xs space-y-4 hover:border-[#DC2626] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-neutral-100 pb-3">
                    <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">
                      {item.number}. {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#374151]">
                      <span>{matchingSigns.length} uploaded signs</span>
                      {item.estimatedTime && (
                        <>
                          <span>•</span>
                          <span>{item.estimatedTime}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Flow: Learn -> Flashcards -> Quiz */}
                  <div className="pt-2 flex flex-wrap items-center gap-2.5">
                    {/* Learn Button */}
                    <button
                      type="button"
                      onClick={handleLearn}
                      className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold shadow-xs transition-all active:scale-95 inline-flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Learn</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>

                    {/* Flashcards Button */}
                    <button
                      type="button"
                      onClick={() => onNavigate(`/flashcards?topic=${item.topicSlug}`)}
                      className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:border-[#DC2626] text-xs font-bold text-[#1A1A1A] transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>Flashcards</span>
                    </button>

                    {/* Quiz Button */}
                    <button
                      type="button"
                      onClick={() => onNavigate(`/quizzes?topic=${item.topicSlug}`)}
                      className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:border-[#DC2626] text-xs font-bold text-[#1A1A1A] transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
