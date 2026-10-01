import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Share2,
  Check,
  Sparkles,
  HelpCircle,
  Layers,
  ChevronRight,
  Play,
  RotateCw,
  Hand,
  Tag,
  Volume2
} from 'lucide-react';
import { Sign, Topic } from '../types/sign';
import { SignDemonstrationPlayer } from '../components/common/SignDemonstrationPlayer';

interface SignDetailPageProps {
  sign: Sign;
  allSigns: Sign[];
  topics: Topic[];
  onNavigate: (path: string) => void;
  onPracticeQuiz: (topicSlug?: string) => void;
}

export const SignDetailPage: React.FC<SignDetailPageProps> = ({
  sign,
  allSigns,
  topics,
  onNavigate,
  onPracticeQuiz
}) => {
  const [copied, setCopied] = useState(false);
  const [miniCardFlipped, setMiniCardFlipped] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedSignObjects = allSigns
    .filter((s) => {
      if (s.id === sign.id) return false;
      return (
        sign.relatedSigns.includes(s.word) ||
        sign.relatedSigns.includes(s.slug) ||
        (s.topics.some((t) => sign.topics.includes(t)) && s.id !== sign.id)
      );
    })
    .slice(0, 4);

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <button
            type="button"
            onClick={() => onNavigate('/dictionary')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] hover:text-[#DC2626] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dictionary Index</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white border border-neutral-200 text-[#374151] hover:border-[#DC2626] hover:text-[#DC2626] transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#DC2626]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Entry'}</span>
            </button>
            <button
              type="button"
              onClick={() => onPracticeQuiz(sign.topics[0]?.toLowerCase())}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white shadow-xs transition-all active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Practice in Quiz</span>
            </button>
          </div>
        </div>

        {/* DICTIONARY ENTRY HERO: Oxford/Cambridge Inspired Layout */}
        <article className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-sm space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4 border-b border-neutral-100 pb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-sm font-black text-[#DC2626] bg-[#FEE2E2] px-3 py-1 rounded-lg border border-[#FECDD3]">
                {sign.id}
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-xs font-mono font-semibold text-[#374151] bg-[#F3F4F6] px-2.5 py-1 rounded-lg">
                {sign.handsUsed}
              </span>
              <span className="text-neutral-400">•</span>
              <div className="flex flex-wrap gap-1">
                {sign.topics.map((topicName) => (
                  <button
                    key={topicName}
                    type="button"
                    onClick={() => onNavigate(`/topics/${topicName.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="text-xs font-bold text-[#DC2626] bg-[#FEE2E2]/60 hover:bg-[#FEE2E2] px-2.5 py-0.5 rounded-md transition-colors"
                  >
                    {topicName}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight font-sans">
                  {sign.word}
                </h1>
                {sign.name !== sign.word && (
                  <p className="text-sm font-semibold text-neutral-500 mt-1">
                    Entry: {sign.name} • Indian Sign Language Dictionary
                  </p>
                )}
              </div>
              <div className="text-xs font-mono text-neutral-400 self-start sm:self-auto">
                URL: /dictionary/{sign.slug}
              </div>
            </div>
          </div>

          {/* Meaning / Definition */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#DC2626]" />
              <span>Definition & Meaning</span>
            </h2>
            <p className="text-base sm:text-lg text-[#1A1A1A] leading-relaxed">
              {sign.meaning}
            </p>
          </div>

          {/* Video Demonstration Stage */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-2">
              <Play className="w-4 h-4 text-[#DC2626]" />
              <span>Video Demonstration</span>
            </h2>
            <SignDemonstrationPlayer sign={sign} />
          </div>

          {/* Two-Column Details: How to Sign & Usage Example */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
            {/* How to Sign */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-neutral-200 space-y-4">
              <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
                <Hand className="w-4 h-4 text-[#DC2626]" />
                <span>How to Sign: Anatomical Guide</span>
              </h3>
              <p className="text-xs text-[#374151] leading-relaxed bg-white p-3 rounded-xl border border-neutral-200 font-medium">
                {sign.howToSign.summary}
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-neutral-200">
                  <span className="font-mono uppercase text-[10px] text-neutral-400 font-bold block">
                    Dominant Hand
                  </span>
                  <p className="text-[#1A1A1A] font-semibold mt-0.5">
                    {sign.howToSign.dominantHand}
                  </p>
                </div>
                {sign.howToSign.nonDominantHand && (
                  <div className="p-3 rounded-xl bg-white border border-neutral-200">
                    <span className="font-mono uppercase text-[10px] text-neutral-400 font-bold block">
                      Non-Dominant Base Hand
                    </span>
                    <p className="text-[#1A1A1A] font-semibold mt-0.5">
                      {sign.howToSign.nonDominantHand}
                    </p>
                  </div>
                )}
                <div className="p-3 rounded-xl bg-white border border-neutral-200">
                  <span className="font-mono uppercase text-[10px] text-neutral-400 font-bold block">
                    Movement & Location
                  </span>
                  <p className="text-[#1A1A1A] font-semibold mt-0.5">
                    {sign.howToSign.movement} ({sign.howToSign.location || 'Chest level'})
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Example & Flashcard Preview */}
            <div className="space-y-6">
              {sign.usageExample && (
                <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-neutral-200 space-y-3">
                  <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#DC2626]" />
                    <span>Sentence Usage & ISL Gloss</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-3.5 bg-white rounded-xl border border-neutral-200">
                      <span className="block text-[10px] font-mono uppercase text-neutral-400 font-bold">
                        English Context:
                      </span>
                      <p className="text-sm font-medium text-[#1A1A1A] mt-0.5">
                        &quot;{sign.usageExample.english}&quot;
                      </p>
                    </div>
                    <div className="p-3.5 bg-[#FEE2E2] rounded-xl border border-[#FECDD3]">
                      <span className="block text-[10px] font-mono uppercase text-[#7F1D1D] font-bold">
                        ISL Gloss Word Order:
                      </span>
                      <p className="text-sm font-mono font-black text-[#7F1D1D] mt-0.5">
                        {sign.usageExample.islGloss}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Flashcard Preview */}
              <div className="bg-[#FAFAFA] rounded-2xl p-5 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Flashcard Preview</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/flashcards?topic=${sign.topics[0]?.toLowerCase()}`)}
                    className="text-xs font-bold text-[#DC2626] hover:text-[#EF4444]"
                  >
                    Open Deck →
                  </button>
                </div>

                <div
                  onClick={() => setMiniCardFlipped(!miniCardFlipped)}
                  className="perspective-1000 w-full h-36 cursor-pointer select-none"
                >
                  <div
                    className={`relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-preserve-3d shadow-xs ${
                      miniCardFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-white border-2 border-neutral-200 p-4 flex flex-col justify-between items-center text-center backface-hidden">
                      <span className="text-[10px] font-mono text-neutral-400">{sign.id}</span>
                      <span className="text-2xl font-black font-mono text-[#1A1A1A]">
                        {sign.word}
                      </span>
                      <span className="text-[11px] font-bold text-[#DC2626] flex items-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        Tap to Reveal Sign
                      </span>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#1A1A1A] text-white p-4 flex flex-col justify-between rotate-y-180 backface-hidden text-left">
                      <div>
                        <span className="text-[10px] font-mono text-[#FB7185] uppercase font-bold">
                          {sign.name}
                        </span>
                        <p className="text-xs text-neutral-300 line-clamp-2 mt-1">
                          {sign.howToSign.summary}
                        </p>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Tap anywhere to flip back
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Quiz CTA Link */}
          <div className="p-5 rounded-2xl bg-[#FEE2E2] border border-[#FECDD3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-[#7F1D1D] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#DC2626]" />
                <span>Test your recognition of &quot;{sign.word}&quot; in a practice quiz</span>
              </h3>
              <p className="text-xs text-[#374151] mt-0.5">
                Generate topic-specific questions for {sign.topics.join(', ')}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onPracticeQuiz(sign.topics[0]?.toLowerCase())}
              className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold shadow-xs shrink-0 transition-transform active:scale-95"
            >
              Start Practice Quiz
            </button>
          </div>
        </article>

        {/* RELATED TOPICS & SIGNS */}
        <section className="space-y-6 pt-4">
          {/* Related Topics */}
          {sign.relatedTopics.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#DC2626]" />
                <span>Related Topics</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {sign.relatedTopics.map((top) => (
                  <button
                    key={top}
                    type="button"
                    onClick={() => onNavigate(`/topics/${top.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="px-4 py-2 rounded-xl bg-white border border-neutral-200 hover:border-[#DC2626] text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>{top}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Signs */}
          {relatedSignObjects.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#DC2626]" />
                  <span>Related Signs</span>
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate('/dictionary')}
                  className="text-xs font-bold text-[#DC2626] hover:text-[#EF4444]"
                >
                  Browse All Signs →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {relatedSignObjects.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onNavigate(`/dictionary/${rel.slug}`)}
                    className="group p-5 rounded-2xl bg-white border border-neutral-200 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#DC2626] font-bold bg-[#FEE2E2] px-1.5 py-0.5 rounded">
                          {rel.id}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {rel.handsUsed}
                        </span>
                      </div>
                      <h4 className="text-xl font-black text-[#1A1A1A] group-hover:text-[#DC2626] font-mono">
                        {rel.word}
                      </h4>
                      <p className="text-xs text-[#374151] line-clamp-2">
                        {rel.meaning}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#DC2626]">
                      <span>View Sign</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
