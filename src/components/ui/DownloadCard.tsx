'use client';

import Link from 'next/link';
import { Download, Star, HardDrive } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import type { Download as DownloadType } from '@/lib/types';

export default function DownloadCard({ download }: { download: DownloadType }) {
  return (
    <Link href={`/downloads/${download.slug}`} className="group block">
      <div className="bg-panel border border-edge rounded-lg overflow-hidden hover:border-neon transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]">
        <div className="aspect-video relative overflow-hidden bg-dark">
          <img
            src={download.image_url}
            alt={download.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute top-2 right-2 bg-flame/90 text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
            {download.category_name}
          </span>
          {download.featured && (
            <span className="absolute top-2 left-2 bg-neon/90 text-dark text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
              ★ Featured
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-base mb-1 group-hover:text-neon transition-colors line-clamp-1">
            {download.title}
          </h3>
          <p className="text-muted text-sm mb-3 line-clamp-2">{download.description}</p>
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1">
              <Download size={14} /> {formatNumber(download.download_count)}
            </span>
            <span className="flex items-center gap-1">
              <HardDrive size={14} /> {download.file_size}
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-flame" /> v{download.version}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
