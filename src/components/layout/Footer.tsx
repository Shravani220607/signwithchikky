import React from 'react';
import { Youtube, Instagram, ShieldCheck } from 'lucide-react';
import { SignLogo } from '../common/SignLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-neutral-200 bg-white text-[#374151]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div
              className="cursor-pointer group inline-block"
              onClick={() => onNavigate('/')}
            >
              <SignLogo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              Learn Indian Sign Language, One Sign at a Time. Free searchable public knowledge platform created by SignWithChikky.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('/youtube')}
                aria-label="Visit YouTube Channel"
                className="p-2.5 rounded-xl bg-[#DC2626] text-white hover:bg-[#EF4444] transition-colors shadow-2xs"
              >
                <Youtube className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/instagram')}
                aria-label="Visit Instagram Profile"
                className="p-2.5 rounded-xl bg-[#1A1A1A] text-white hover:bg-neutral-800 transition-colors shadow-2xs"
              >
                <Instagram className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Learning Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#1A1A1A]">
              Learning Modules
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/dictionary')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  Dictionary Index
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/topics')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  Topics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/flashcards')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  3D Flashcards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/quizzes')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  Practice Quizzes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/tutorial')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  Tutorial Roadmap
                </button>
              </li>
            </ul>
          </div>

          {/* Dictionary Modes */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#1A1A1A]">
              Dictionary Browsing
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/dictionary')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  Alphabetical Mode (A-Z, 0-9, Symbols)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/dictionary')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  Topic Wise Mode
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  About the Platform
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/login')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  Student Login
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/signup')}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  Free Signup
                </button>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#1A1A1A]">
              Official Channels
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/youtube')}
                  className="hover:text-[#DC2626] transition-colors flex items-center gap-1.5"
                >
                  <span>YouTube (@signwithchikky)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/instagram')}
                  className="hover:text-[#DC2626] transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram (@signwithchikky)</span>
                </button>
              </li>
              <li className="pt-2 flex items-center gap-1.5 text-xs text-[#DC2626] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Free Public Education</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} SignWithChikky. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[#7F1D1D] font-semibold">
            <span>Learn Indian Sign Language, One Sign at a Time.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
