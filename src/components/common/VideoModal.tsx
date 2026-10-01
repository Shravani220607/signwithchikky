import React, { useEffect } from 'react';
import { X, Youtube, ExternalLink, ShieldCheck } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedId: string;
  title: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  embedId,
  title
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#0F0F0F] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-[#0F0F0F] border-b border-neutral-800 text-white">
          <div className="flex items-center gap-2 truncate pr-4">
            <Youtube className="w-5 h-5 text-[#DC2626] shrink-0" />
            <h3 className="text-sm font-bold truncate">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        <div className="px-5 py-3.5 bg-[#0F0F0F] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
            <span>SignWithChikky Official Indian Sign Language Video</span>
          </div>
          <a
            href={`https://youtube.com/watch?v=${embedId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#DC2626] hover:underline flex items-center gap-1 font-bold"
          >
            <span>Watch directly on YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
