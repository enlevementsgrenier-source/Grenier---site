import React from 'react';
import { Bell, AlertTriangle, Info, Sparkles } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export const NoticeBanner: React.FC = () => {
  const { content } = useSiteContent();
  const { banner } = content;

  if (!banner || !banner.enabled || !banner.message?.trim()) {
    return null;
  }

  const isWarning = banner.type === 'warning';
  const isAlert = banner.type === 'alert';

  return (
    <div
      className={`py-2 px-4 text-xs font-semibold text-center border-b flex items-center justify-center gap-2 transition-all ${
        isAlert
          ? 'bg-rose-600 text-white border-rose-700'
          : isWarning
          ? 'bg-amber-400 text-amber-950 border-amber-500'
          : 'bg-[#234634] text-[#E7F3EB] border-[#1A3628]'
      }`}
    >
      {isAlert ? (
        <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
      ) : isWarning ? (
        <Bell className="w-4 h-4 shrink-0" />
      ) : (
        <Sparkles className="w-4 h-4 shrink-0 text-[#A3C9A8]" />
      )}
      <span>{banner.message}</span>
    </div>
  );
};
