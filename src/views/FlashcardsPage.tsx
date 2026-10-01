import React from 'react';
import { Sparkles, Keyboard } from 'lucide-react';
import { Sign, Topic } from '../types/sign';
import { FlashcardDeck } from '../components/flashcards/FlashcardDeck';

interface FlashcardsPageProps {
  signs: Sign[];
  topics?: Topic[];
  initialTopic?: string;
  onNavigateSign: (slug: string) => void;
}

export const FlashcardsPage: React.FC<FlashcardsPageProps> = ({
  signs,
  topics = [],
  initialTopic = 'all',
  onNavigateSign
}) => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEE2E2] border border-[#FECDD3] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Interactive 3D Visual Memory Trainer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
            Indian Sign Language Flashcards
          </h1>
          <p className="text-sm text-[#374151] leading-relaxed">
            Strengthen visual recall. Test yourself on the front character, then flip the 3D card to inspect the authentic ISL sign breakdown, hand shape, and definition.
          </p>
          {signs.length > 0 && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-xl text-xs text-[#374151] font-mono border border-neutral-200 shadow-2xs">
              <Keyboard className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Tip: Press Space to Flip • Left / Right arrows to navigate</span>
            </div>
          )}
        </div>

        {/* Main Flashcard Deck */}
        <FlashcardDeck
          signs={signs}
          topics={topics}
          initialDeckTopic={initialTopic}
          onNavigateSign={onNavigateSign}
        />
      </div>
    </div>
  );
};
