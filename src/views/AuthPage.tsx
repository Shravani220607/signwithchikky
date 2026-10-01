import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SignLogo } from '../components/common/SignLogo';

interface AuthPageProps {
  initialMode: 'login' | 'signup';
  onNavigate: (path: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode,
  onNavigate
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F3F4F6] py-12 sm:py-20 px-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div
            onClick={() => onNavigate('/')}
            className="inline-flex items-center justify-center cursor-pointer group"
          >
            <SignLogo size="lg" />
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1A]">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create Free Student Account'}
          </h1>
          <p className="text-xs text-[#374151]">
            {mode === 'login'
              ? 'Access saved signs, study progress, and practice quizzes.'
              : 'Join thousands of learners mastering Indian Sign Language online.'}
          </p>
        </div>

        {/* Auth Card: White */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#F3F4F6] rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setSubmitted(false);
              }}
              className={`py-2.5 rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-[#DC2626] shadow-xs'
                  : 'text-[#374151] hover:text-[#1A1A1A]'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setSubmitted(false);
              }}
              className={`py-2.5 rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white text-[#DC2626] shadow-xs'
                  : 'text-[#374151] hover:text-[#1A1A1A]'
              }`}
            >
              Signup
            </button>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#FEE2E2] border border-[#FECDD3] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#DC2626] mx-auto" />
              <h3 className="text-base font-bold text-[#1A1A1A]">
                {mode === 'login' ? 'Welcome Back!' : 'Account Created Successfully!'}
              </h3>
              <p className="text-xs text-[#374151] leading-relaxed">
                You are ready to explore the Indian Sign Language dictionary, 3D flashcards, and quizzes.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/dictionary')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Go to Dictionary
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-[#FAFAFA] border border-neutral-300 text-[#1A1A1A] focus:outline-hidden focus:border-[#DC2626] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-[#FAFAFA] border border-neutral-300 text-[#1A1A1A] focus:outline-hidden focus:border-[#DC2626] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-[#FAFAFA] border border-neutral-300 text-[#1A1A1A] focus:outline-hidden focus:border-[#DC2626] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl bg-[#FAFAFA] border border-neutral-300 text-[#1A1A1A] focus:outline-hidden focus:border-[#DC2626] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{mode === 'login' ? 'Sign In to Account' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-neutral-200 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#374151]">
              <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
              <span>Free Public Indian Sign Language Education</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
