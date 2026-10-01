import React, { useState, useMemo } from 'react';
import {
  Instagram,
  ExternalLink,
  Video,
  CheckCircle2,
  Search,
  Heart,
  X
} from 'lucide-react';
import { INSTAGRAM_REELS } from '../data/mediaData';

export const InstagramPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const [searchQuery, setSearchQuery] = useState('');

  // When real content exists, filter & sort them
  const displayedPosts = useMemo(() => {
    if (INSTAGRAM_REELS.length === 0) return [];

    let list = [...INSTAGRAM_REELS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.caption.toLowerCase().includes(q)
      );
    }

    if (activeTab === 'latest') {
      list.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
    } else {
      list.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
    }

    return list;
  }, [searchQuery, activeTab]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* CLEAN SOCIAL PROFILE CARD */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Profile Logo */}
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#7F1D1D] to-[#EF4444] shadow-xs shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1A1A1A] flex items-center justify-center p-1 overflow-hidden">
                <div className="w-full h-full rounded-full bg-[#DC2626] flex items-center justify-center text-white">
                  <Instagram className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                      @signwithchikky
                    </h1>
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    Indian Sign Language Educator
                  </span>
                </div>

                <a
                  href="https://instagram.com/signwithchikky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold shadow-xs transition-all active:scale-95 inline-flex items-center justify-center gap-2 shrink-0 self-center sm:self-auto"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Visit Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                Follow SignWithChikky for Indian Sign Language content, vocabulary, quizzes, flashcards, and educational updates.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION: Only displays when real posts exist */}
        {INSTAGRAM_REELS.length === 0 ? (
          /* Exact required empty state */
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 space-y-3 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto shadow-inner">
              <Video className="w-7 h-7" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
              No Instagram content uploaded yet.
            </h2>
            <p className="text-xs sm:text-sm text-[#374151] max-w-md mx-auto leading-relaxed">
              Posts and reels will appear here once they are published on the SignWithChikky Instagram page.
            </p>
            <div className="pt-2">
              <a
                href="https://instagram.com/signwithchikky"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 hover:border-[#DC2626] text-[#1A1A1A] hover:text-[#DC2626] text-xs font-bold transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#DC2626]" />
                <span>Follow @signwithchikky on Instagram</span>
              </a>
            </div>
          </div>
        ) : (
          /* REAL CONTENT PRESENTATION: Search + Latest & Most Liked tabs */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-2 p-1 bg-[#F3F4F6] rounded-xl border border-neutral-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('latest')}
                  className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'latest'
                      ? 'bg-white text-[#DC2626] shadow-xs'
                      : 'text-[#374151] hover:text-[#1A1A1A]'
                  }`}
                >
                  Latest Posts
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('popular')}
                  className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'popular'
                      ? 'bg-white text-[#DC2626] shadow-xs'
                      : 'text-[#374151] hover:text-[#1A1A1A]'
                  }`}
                >
                  Most Liked Posts
                </button>
              </div>

              {/* Search published posts */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search uploaded posts..."
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white border border-neutral-300 text-[#1A1A1A] focus:outline-hidden focus:border-[#DC2626]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Posts Grid */}
            {displayedPosts.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-[#374151]">
                No posts match your search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-3xl bg-white border border-neutral-200 overflow-hidden p-5 space-y-3 hover:border-[#DC2626] hover:shadow-md transition-all"
                  >
                    {post.thumbnail && (
                      <div className="relative aspect-square bg-neutral-900 rounded-2xl overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-sm font-bold text-[#1A1A1A]">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#374151] line-clamp-3">
                      {post.caption}
                    </p>
                    {post.likesCount !== undefined && (
                      <div className="pt-2 border-t border-neutral-100 flex items-center gap-1.5 text-xs text-[#DC2626] font-semibold">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>{post.likesCount} likes</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
