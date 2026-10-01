import React from 'react';
import { Trophy } from 'lucide-react';
import { Sign, Topic } from '../types/sign';
import { QuizEngine } from '../components/quizzes/QuizEngine';

interface QuizzesPageProps {
  signs: Sign[];
  topics: Topic[];
  initialTopicSlug?: string;
  onNavigateSign: (slug: string) => void;
}

export const QuizzesPage: React.FC<QuizzesPageProps> = ({
  signs,
  topics,
  initialTopicSlug,
  onNavigateSign
}) => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEE2E2] border border-[#FECDD3] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Interactive Skill Verification</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
            Indian Sign Language Quizzes
          </h1>
          <p className="text-sm text-[#374151] leading-relaxed">
            Test and reinforce your comprehension with quizzes generated directly from authentic Indian Sign Language signs. Choose Topic Quiz or Mixed Quiz mode.
          </p>
        </div>

        {/* Main Quiz Engine */}
        <QuizEngine
          signs={signs}
          topics={topics}
          initialTopicSlug={initialTopicSlug}
          onNavigateSign={onNavigateSign}
        />
      </div>
    </div>
  );
};
