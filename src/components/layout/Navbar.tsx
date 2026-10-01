import React, { useState } from 'react';
import { Menu, X, Search, ArrowRight } from 'lucide-react';
import { SignLogo } from '../common/SignLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dictionary', path: '/dictionary' },
    { label: 'Topics', path: '/topics' },
    { label: 'Flashcards', path: '/flashcards' },
    { label: 'Quizzes', path: '/quizzes' },
    { label: 'Tutorial', path: '/tutorial' },
    { label: 'YouTube', path: '/youtube' },
    { label: 'Instagram', path: '/instagram' },
    { label: 'About', path: '/about' }
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1A1A1A] text-white border-b border-neutral-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with White text and Red accent */}
          <div
            className="cursor-pointer group py-1"
            onClick={() => handleLinkClick('/')}
          >
            <SignLogo size="md" textColor="light" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'text-white bg-[#DC2626] font-bold shadow-xs'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Search + Login + Signup */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search signs"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs transition-colors border border-neutral-700"
            >
              <Search className="w-3.5 h-3.5 text-[#FB7185]" />
              <span className="hidden sm:inline">Search signs...</span>
              <kbd className="hidden md:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* Login & Signup Buttons */}
            <div className="hidden sm:flex items-center gap-2 pl-1 border-l border-neutral-700">
              <button
                type="button"
                onClick={() => handleLinkClick('/login')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  currentPath === '/login'
                    ? 'text-[#FB7185] bg-neutral-800'
                    : 'text-neutral-200 hover:text-white hover:bg-neutral-800'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('/signup')}
                className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#DC2626] hover:bg-[#EF4444] text-white shadow-xs transition-all active:scale-95"
              >
                Signup
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open mobile menu"
              className="xl:hidden p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-neutral-800 bg-[#1A1A1A] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-800">
            <button
              type="button"
              onClick={() => handleLinkClick('/login')}
              className="w-full py-2 px-3 text-center text-xs font-bold rounded-lg border border-neutral-700 text-white hover:bg-neutral-800"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('/signup')}
              className="w-full py-2 px-3 text-center text-xs font-bold rounded-lg bg-[#DC2626] hover:bg-[#EF4444] text-white shadow-xs"
            >
              Signup
            </button>
          </div>
          <div className="space-y-1 text-sm">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                    active
                      ? 'text-white font-bold bg-[#DC2626]'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
