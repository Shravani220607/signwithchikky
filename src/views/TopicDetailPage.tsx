import React from 'react';
import {
  ArrowLeft,
  Layers,
  Sparkles,
  HelpCircle,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Topic, Sign } from '../types/sign';

interface TopicDetailPageProps {
  topic: Topic;
  allTopics: Topic[];
  signsInTopic: Sign[];
  onNavigate: (path: string) => void;
  onNavigateSign: (slug: string) => void;
  onPracticeFlashcards: (topicSlug: string) => void;
  onPracticeQuiz: (topicSlug: string) => void;
}

export const TopicDetailPage: React.FC<TopicDetailPageProps> = ({
  topic,
  signsInTopic,
  onNavigate,
  onNavigateSign,
  onPracticeFlashcards,
  onPracticeQuiz
}) => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <button
            type="button"
            onClick={() => onNavigate('/topics')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] hover:text-[#DC2626] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Topics</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onPracticeFlashcards(topic.slug)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-bold text-[#1A1A1A] hover:border-[#DC2626] hover:text-[#DC2626] transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Practice Flashcards</span>
            </button>
            <button
              type="button"
              onClick={() => onPracticeQuiz(topic.slug)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold shadow-xs transition-transform active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quiz This Topic</span>
            </button>
          </div>
        </div>

        {/* Header Banner */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#DC2626] font-bold">
            <Layers className="w-4 h-4" />
            <span>SignWithChikky Curriculum Module</span>
            <span className="text-neutral-400">•</span>
            <span>{signsInTopic.length} Signs Included</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            {topic.title}
          </h1>
          <p className="text-sm sm:text-base text-[#374151] max-w-3xl leading-relaxed">
            {topic.description}
          </p>
        </div>

        {/* List of Signs in this Topic */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#1A1A1A] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#DC2626]" />
              <span>Signs in this Topic ({signsInTopic.length})</span>
            </h2>
          </div>

          {signsInTopic.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200 text-neutral-500">
              <p className="text-base font-bold text-[#1A1A1A]">No signs added yet in this topic.</p>
              <p className="text-xs text-[#374151] mt-1">Signs will appear once published by SignWithChikky.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {signsInTopic.map((sign) => (
                <div
                  key={sign.id}
                  onClick={() => onNavigateSign(sign.slug)}
                  className="group rounded-2xl bg-white border border-neutral-200 p-5 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#DC2626] font-bold text-[10px] bg-[#FEE2E2] px-2 py-0.5 rounded">
                        {sign.id}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400">
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

                    <p className="text-xs text-[#374151] line-clamp-2">
                      {sign.meaning}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#DC2626]">
                    <span>View Sign</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
