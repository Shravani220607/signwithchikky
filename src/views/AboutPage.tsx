import React from 'react';
import {
  BookOpen,
  Layers,
  Sparkles,
  HelpCircle,
  Compass,
  Video,
  ArrowRight,
  Target,
  Users,
  GraduationCap,
  School,
  HeartHandshake,
  Briefcase,
  Globe2,
  TrendingUp,
  Cpu,
  Database,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { SignLogo } from '../components/common/SignLogo';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const featureCards = [
    {
      title: 'ISL Dictionary',
      description: 'A searchable dictionary containing signs, meanings, explanations, and videos.',
      icon: BookOpen,
      path: '/dictionary'
    },
    {
      title: 'Topic-Based Learning',
      description: 'Learn signs through organized vocabulary topics.',
      icon: Layers,
      path: '/topics'
    },
    {
      title: 'Flashcards',
      description: 'Interactive flashcards for revision and practice.',
      icon: Sparkles,
      path: '/flashcards'
    },
    {
      title: 'Quizzes',
      description: 'Test your knowledge through topic-wise and mixed quizzes.',
      icon: HelpCircle,
      path: '/quizzes'
    },
    {
      title: 'Learning Roadmap',
      description: 'Follow a structured tutorial path for learning ISL.',
      icon: Compass,
      path: '/tutorial'
    },
    {
      title: 'Educational Content',
      description: 'Videos and learning resources created by SignWithChikky.',
      icon: Video,
      path: '/youtube'
    }
  ];

  const visionItems = [
    { text: 'A comprehensive ISL dictionary', icon: BookOpen },
    { text: 'Topic-based learning resources', icon: Layers },
    { text: 'Interactive flashcards and quizzes', icon: Sparkles },
    { text: 'Educational videos', icon: Video },
    { text: 'Sign language datasets', icon: Database },
    { text: 'Sign recognition technology projects', icon: Cpu },
    { text: 'Accessible learning applications', icon: Smartphone }
  ];

  const audienceGroups = [
    { label: 'Students', desc: 'School and college students learning fingerspelling and conversational signs.', icon: GraduationCap },
    { label: 'Teachers', desc: 'Special educators and mainstream teachers building inclusive classroom communication.', icon: School },
    { label: 'Parents', desc: 'Families communicating with Deaf children, relatives, and loved ones.', icon: Users },
    { label: 'Volunteers', desc: 'Community advocates supporting accessibility and Deaf community initiatives.', icon: HeartHandshake },
    { label: 'Professionals', desc: 'Workplace peers, healthcare workers, and public service personnel.', icon: Briefcase },
    { label: 'Anyone interested in ISL', desc: 'Curious learners passionate about Indian Sign Language and cultural inclusion.', icon: Globe2 }
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen space-y-0">
      {/* 1. HERO SECTION: Dark Maroon Palette */}
      <section className="bg-[#7F1D1D] text-white py-16 sm:py-24 border-b border-[#991B1B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#991B1B]/40 via-transparent to-black/25 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FECDD3] text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <SignLogo variant="icon" size={16} />
            <span>About SignWithChikky</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Making Indian Sign Language Learning More Accessible
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#FECDD3] max-w-3xl mx-auto leading-relaxed font-normal">
            SignWithChikky is an educational platform dedicated to helping people learn Indian Sign Language through organized, beginner-friendly, and accessible learning resources.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/dictionary')}
              className="px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Explore the Dictionary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/tutorial')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-100 text-[#1A1A1A] font-bold text-xs shadow-md transition-all active:scale-95"
            >
              View Learning Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* 2. WHY SIGNWITHCHIKKY EXISTS (Background: White) */}
      <section className="bg-white py-14 sm:py-20 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>The Challenge & Purpose</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
            Why SignWithChikky Exists
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#374151] leading-relaxed">
            <p>
              Learning Indian Sign Language can often feel difficult because resources are scattered across different websites, videos, and platforms.
            </p>
            <p>
              Many learners struggle to find a single place where they can learn signs, explore vocabulary, practice through flashcards, test themselves with quizzes, and follow a structured learning path.
            </p>
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 font-medium text-[#1A1A1A] border-l-4 border-l-[#DC2626]">
              SignWithChikky was created to bring these learning resources together into one organized and easy-to-use platform.
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR MISSION (Background: Light Gray #F3F4F6) */}
      <section className="bg-[#F3F4F6] py-14 sm:py-20 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Core Commitment</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
            Our Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-7 rounded-3xl bg-white border border-neutral-200 shadow-2xs space-y-3">
              <span className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-lg font-bold text-[#1A1A1A]">
                Accessible & Organized Learning
              </h3>
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                Our mission is to make Indian Sign Language learning more accessible, approachable, and organized for everyone.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-neutral-200 shadow-2xs space-y-3">
              <span className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-lg font-bold text-[#1A1A1A]">
                Bridge Communities
              </h3>
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                We aim to encourage greater awareness of Indian Sign Language and support better communication between hearing and Deaf communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU WILL FIND HERE (Background: White) */}
      <section className="bg-white py-14 sm:py-20 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Platform Overview</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              What You Will Find Here
            </h2>
            <p className="text-xs sm:text-sm text-[#374151]">
              A complete, modular suite of learning tools built specifically for Indian Sign Language learners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {featureCards.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  onClick={() => onNavigate(feat.path)}
                  className="p-6 sm:p-7 rounded-3xl bg-[#FAFAFA] border border-neutral-200 hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#374151] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#DC2626]">
                    <span>Explore module</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUR VISION (Background: Light Gray #F3F4F6) */}
      <section className="bg-[#F3F4F6] py-14 sm:py-20 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Looking Forward</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              Our Vision
            </h2>
            <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
              SignWithChikky is being built as more than just a website.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-4 shadow-2xs">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#1A1A1A]">
              The long-term vision includes:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {visionItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-neutral-200 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="pt-2 text-xs sm:text-sm text-[#374151] font-medium leading-relaxed">
              The goal is to create a growing ecosystem that supports Indian Sign Language learning and accessibility.
            </p>
          </div>
        </div>
      </section>

      {/* 6. A PLATFORM THAT GROWS OVER TIME (Background: White) */}
      <section className="bg-white py-14 sm:py-20 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Continuous Improvement</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
            A Platform That Grows Over Time
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#374151] leading-relaxed">
            <p>
              SignWithChikky is continuously evolving.
            </p>
            <p>
              New signs, topics, flashcards, quizzes, and educational content will be added over time.
            </p>
            <p className="p-5 rounded-2xl bg-[#FEE2E2]/50 border border-[#FECDD3] text-[#7F1D1D] font-medium text-xs sm:text-sm">
              Every piece of content on the platform is intended to help learners build their knowledge of Indian Sign Language in a structured and accessible way.
            </p>
          </div>
        </div>
      </section>

      {/* 7. WHO THIS PLATFORM IS FOR (Background: Light Gray #F3F4F6) */}
      <section className="bg-[#F3F4F6] py-14 sm:py-20 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#7F1D1D] text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Learner Community</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              Who This Platform Is For
            </h2>
            <p className="text-xs sm:text-sm text-[#374151]">
              SignWithChikky is designed to serve a diverse, inclusive community of learners across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {audienceGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.label}
                  className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-2xs space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">{group.label}</h3>
                  <p className="text-xs text-[#374151] leading-relaxed">{group.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CLOSING MESSAGE (Background: White) */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto shadow-inner text-3xl">
            🤟
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
            Whether you are starting your first ISL lesson or expanding your existing knowledge, SignWithChikky welcomes you.
          </h2>

          <p className="text-sm sm:text-base text-[#374151] leading-relaxed max-w-xl mx-auto">
            Thank you for supporting accessible communication and inclusive learning.
          </p>

          <div className="pt-4 border-t border-neutral-200 max-w-md mx-auto space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="text-2xl">🤟</span>
              <span className="text-xl font-black text-[#1A1A1A]">
                SignWith<span className="text-[#DC2626]">Chikky</span>
              </span>
            </div>
            <p className="text-xs font-bold text-[#DC2626] tracking-wide uppercase">
              Learn Indian Sign Language, One Sign at a Time.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/dictionary')}
              className="px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold shadow-xs transition-transform active:scale-95"
            >
              Start with Dictionary
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/tutorial')}
              className="px-6 py-2.5 rounded-xl border border-neutral-300 hover:border-[#DC2626] text-[#1A1A1A] text-xs font-bold transition-colors"
            >
              View Learning Roadmap
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
