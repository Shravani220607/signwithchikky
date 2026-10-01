import React, { useState, useMemo } from 'react';
import {
  Youtube,
  ExternalLink,
  Video,
  Search,
  CheckCircle2,
  Clock,
  Eye,
  X
} from 'lucide-react';
import { YOUTUBE_VIDEOS } from '../data/mediaData';

interface YouTubePageProps {
  onSelectVideo?: (embedId: string, title: string) => void;
}

export const YouTubePage: React.FC<YouTubePageProps> = ({ onSelectVideo }) => {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const [searchQuery, setSearchQuery] = useState('');

  // When real videos exist, filter & sort them
  const displayedVideos = useMemo(() => {
    if (YOUTUBE_VIDEOS.length === 0) return [];

    let list = [...YOUTUBE_VIDEOS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      );
    }

    if (activeTab === 'latest') {
      list.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
    } else {
      list.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    }

    return list;
  }, [searchQuery, activeTab]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* CLEAN SOCIAL PROFILE CARD */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Channel Logo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center font-black text-3xl shadow-sm shrink-0">
              <Youtube className="w-12 h-12" />
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                      SignWithChikky
                    </h1>
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    @signwithchikky • Official YouTube Channel
                  </span>
                </div>

                <a
                  href="https://youtube.com/@signwithchikky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold shadow-xs transition-all active:scale-95 inline-flex items-center justify-center gap-2 shrink-0 self-center sm:self-auto"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Visit YouTube Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                Learn Indian Sign Language through tutorials, vocabulary topics, flashcards, quizzes, and educational content.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION: Only displays when real videos exist */}
        {YOUTUBE_VIDEOS.length === 0 ? (
          /* Exact required empty state */
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 space-y-3 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto shadow-inner">
              <Video className="w-7 h-7" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
              No videos uploaded yet.
            </h2>
            <p className="text-xs sm:text-sm text-[#374151] max-w-md mx-auto leading-relaxed">
              Videos will appear here once they are published on the SignWithChikky YouTube channel.
            </p>
            <div className="pt-2">
              <a
                href="https://youtube.com/@signwithchikky"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 hover:border-[#DC2626] text-[#1A1A1A] hover:text-[#DC2626] text-xs font-bold transition-colors"
              >
                <Youtube className="w-4 h-4 text-[#DC2626]" />
                <span>Follow @signwithchikky on YouTube</span>
              </a>
            </div>
          </div>
        ) : (
          /* REAL CONTENT PRESENTATION: Search + Latest & Most Viewed tabs */
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
                  Latest Videos
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
                  Most Viewed Videos
                </button>
              </div>

              {/* Search published videos */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search uploaded videos..."
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

            {/* Video Cards Grid */}
            {displayedVideos.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-[#374151]">
                No videos match your search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedVideos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => video.embedId && onSelectVideo?.(video.embedId, video.title)}
                    className="group rounded-3xl bg-white border border-neutral-200 overflow-hidden hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    {video.thumbnail && (
                      <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {video.duration && (
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                            {video.duration}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-5 space-y-2">
                      <h3 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-[#374151] line-clamp-2">
                        {video.description}
                      </p>
                      {video.views && (
                        <div className="pt-2 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{video.views}</span>
                        </div>
                      )}
                    </div>
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
