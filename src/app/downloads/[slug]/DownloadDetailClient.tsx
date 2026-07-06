'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download as DownloadIcon, HardDrive, Star, Calendar, User, Tag, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { formatNumber, formatDate } from '@/lib/utils';
import type { Download as DownloadType, Review } from '@/lib/types';

export default function DownloadDetailClient({ download, initialReviews }: { download: DownloadType; initialReviews: Review[] }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const handleDownload = async () => {
    setDownloaded(true);
    await fetch(`/api/download?slug=${download.slug}`, { method: 'POST' });
    window.open(download.download_url, '_blank');
  };

  const handleFavorite = async () => {
    if (!user) { window.location.href = '/auth/login'; return; }
    setFavLoading(true);
    if (favorited) {
      await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, download_id: download.id }),
      });
      setFavorited(false);
    } else {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, download_id: download.id }),
      });
      setFavorited(true);
    }
    setFavLoading(false);
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { window.location.href = '/auth/login'; return; }
    if (!comment.trim()) return;
    setSubmitting(true);
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        download_id: download.id,
        user_id: user.id,
        user_email: user.email,
        rating,
        comment: comment.trim(),
      }),
    });
    if (res.ok) {
      const newReview = await res.json();
      setReviews([newReview, ...reviews]);
      setComment('');
      setRating(5);
    }
    setSubmitting(false);
  };

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-64 sm:h-96 overflow-hidden">
        <img src={download.image_url} alt={download.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="bg-panel border border-edge rounded-lg overflow-hidden mb-6">
              <div className="aspect-video">
                <img src={download.image_url} alt={download.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-flame/20 text-flame text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">{download.category_name}</span>
                  {download.featured && <span className="bg-neon/20 text-neon text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">★ Featured</span>}
                </div>
                <h1 className="font-display font-black text-3xl sm:text-4xl mb-4">{download.title}</h1>
                <p className="text-muted text-lg mb-6">{download.description}</p>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-line">{download.long_description}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-panel border border-edge rounded-lg p-6">
              <h2 className="font-display font-bold text-xl mb-4">Reviews ({reviews.length})</h2>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={20} className={s <= Math.round(avgRating) ? 'text-flame fill-flame' : 'text-edge'} />
                    ))}
                  </div>
                  <span className="text-muted text-sm">{avgRating.toFixed(1)} average</span>
                </div>
              )}
              <form onSubmit={submitReview} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-muted">Your rating:</span>
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => (
                      <button key={s} type="button" onClick={() => setRating(s)}>
                        <Star size={20} className={s <= rating ? 'text-flame fill-flame' : 'text-edge'} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review..."
                  rows={3}
                  className="w-full bg-dark border border-edge rounded-lg p-3 text-sm focus:outline-none focus:border-neon mb-3"
                />
                <button type="submit" disabled={submitting || !comment.trim()} className="bg-neon text-dark font-bold px-6 py-2 rounded-lg hover:bg-neon-dark transition-colors disabled:opacity-50">
                  {submitting ? 'Posting...' : 'Post Review'}
                </button>
              </form>
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-muted text-sm text-center py-4">No reviews yet. Be the first!</p>
                ) : reviews.map((r) => (
                  <div key={r.id} className="bg-dark border border-edge rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{r.user_email}</span>
                      <div className="flex">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={14} className={s <= r.rating ? 'text-flame fill-flame' : 'text-edge'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted text-sm">{r.comment}</p>
                    <p className="text-edge text-xs mt-2">{formatDate(r.created_at)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-panel border border-edge rounded-lg p-6 sticky top-20">
              <button
                onClick={handleDownload}
                disabled={downloaded}
                className="w-full bg-neon text-dark font-bold py-4 rounded-lg hover:bg-neon-dark transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] flex items-center justify-center gap-2 mb-3 disabled:opacity-70"
              >
                {downloaded ? <><CheckCircle size={20} /> Download Started</> : <><DownloadIcon size={20} /> Download Now</>}
              </button>
              <button
                onClick={handleFavorite}
                disabled={favLoading}
                className={`w-full border font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mb-6 ${favorited ? 'border-flame text-flame' : 'border-edge text-muted hover:text-white'}`}
              >
                <Heart size={18} className={favorited ? 'fill-flame' : ''} /> {favorited ? 'Favorited' : 'Add to Favorites'}
              </button>

              <div className="space-y-3 text-sm">
                <InfoRow icon={DownloadIcon} label="Downloads" value={formatNumber(download.download_count)} />
                <InfoRow icon={HardDrive} label="File Size" value={download.file_size} />
                <InfoRow icon={Star} label="Version" value={download.version} />
                <InfoRow icon={User} label="Developer" value={download.developer} />
                <InfoRow icon={Tag} label="Platform" value={download.platform} />
                <InfoRow icon={Calendar} label="Released" value={formatDate(download.created_at)} />
              </div>

              <div className="mt-6 pt-6 border-t border-edge">
                <div className="flex items-start gap-2 text-xs text-muted">
                  <AlertCircle size={16} className="text-neon shrink-0 mt-0.5" />
                  <span>All files are scanned and verified safe. Download with confidence.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof DownloadIcon; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted flex items-center gap-2"><Icon size={16} /> {label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
