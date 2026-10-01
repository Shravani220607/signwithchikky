import React, { useState } from 'react';
import { Video, Layers, ShieldCheck, Sparkles, Hand } from 'lucide-react';
import { Sign } from '../../types/sign';

interface SignDemonstrationPlayerProps {
  sign: Sign;
  className?: string;
}

export const SignDemonstrationPlayer: React.FC<SignDemonstrationPlayerProps> = ({
  sign,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'video' | 'breakdown'>('video');

  return (
    <div className={`bg-[#1A1A1A] text-white rounded-3xl overflow-hidden shadow-lg border border-neutral-800 ${className}`}>
      {/* Top Bar with Sign ID, Category & Mode Switch */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#FB7185]">
            SignWithChikky Demonstration
          </span>
          <span className="text-neutral-500 text-xs">•</span>
          <span className="text-xs text-neutral-300 font-mono font-bold">{sign.id}</span>
        </div>

        <div className="flex items-center gap-1 bg-neutral-900 rounded-lg p-0.5 border border-neutral-800">
          <button
            type="button"
            onClick={() => setViewMode('video')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'video'
                ? 'bg-[#DC2626] text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Video
          </button>
          <button
            type="button"
            onClick={() => setViewMode('breakdown')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'breakdown'
                ? 'bg-[#DC2626] text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Hand Breakdown
          </button>
        </div>
      </div>

      {/* Main Stage */}
      <div className="relative aspect-video w-full bg-[#141414] flex flex-col items-center justify-center p-6 overflow-hidden">
        {sign.videoUrl ? (
          <iframe
            src={sign.videoUrl}
            title={sign.name}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : viewMode === 'video' ? (
          /* Clean Professional Empty Video State */
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#DC2626] shadow-inner">
              <Video className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-md">
              <span className="text-xs font-mono uppercase text-[#FB7185] font-bold">
                {sign.topics.join(', ')} • {sign.id}
              </span>
              <h3 className="text-xl font-bold text-white">
                {sign.name} ({sign.word})
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                No video demonstration uploaded yet for this sign.
                <br />
                Official video demonstration will appear once uploaded by SignWithChikky.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium">
              <Hand className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>{sign.handsUsed} Gesture</span>
            </div>
          </div>
        ) : (
          /* Hand Breakdown Mode */
          <div className="relative z-10 w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-left space-y-3">
            <h4 className="text-sm font-bold text-[#FB7185] flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Sign Breakdown & Hand Anatomy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Dominant Hand</span>
                <p className="text-neutral-200 font-semibold mt-0.5">{sign.howToSign.dominantHand}</p>
              </div>
              {sign.howToSign.nonDominantHand ? (
                <div className="bg-[#1A1A1A] p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Base / Non-Dominant</span>
                  <p className="text-neutral-200 font-semibold mt-0.5">{sign.howToSign.nonDominantHand}</p>
                </div>
              ) : (
                <div className="bg-[#1A1A1A] p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Base Hand</span>
                  <p className="text-neutral-200 font-semibold mt-0.5">Neutral / One-handed gesture</p>
                </div>
              )}
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-neutral-800 sm:col-span-2">
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Movement Trajectory</span>
                <p className="text-neutral-200 font-semibold mt-0.5">{sign.howToSign.movement}</p>
              </div>
            </div>
            <div className="text-[11px] text-neutral-300 bg-neutral-800 p-2.5 rounded-xl flex items-center gap-2 border border-neutral-700">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#DC2626]" />
              <span>Standard Indian Sign Language (ISL) gesture certified by SignWithChikky.</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#1A1A1A] border-t border-neutral-800 text-xs">
        <div className="flex items-center gap-2 text-neutral-300">
          <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
          <span className="font-medium truncate max-w-sm sm:max-w-md">{sign.howToSign.summary}</span>
        </div>
        <span className="text-neutral-400 font-mono text-[11px]">{sign.handsUsed}</span>
      </div>
    </div>
  );
};
