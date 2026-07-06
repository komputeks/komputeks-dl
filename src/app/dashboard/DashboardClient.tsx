'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Download as DownloadIcon, Mail, LogOut, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DownloadCard from '@/components/ui/DownloadCard';
import type { Download } from '@/lib/types';
import type { User } from '@supabase/supabase-js';

export default function DashboardClient({ user, favorites }: { user: User; favorites: Download[] }) {
  const { signOut } = useAuth();
  const router = useRouter();
  const [favList, setFavList] = useState(favorites);

  const removeFavorite = async (downloadId: string) => {
    await fetch('/api/favorites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, download_id: downloadId }),
    });
    setFavList(favList.filter(f => f.id !== downloadId));
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen">
      <div className="bg-panel border-b border-edge py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl mb-2">Dashboard</h1>
          <p className="text-muted">Welcome back, {user.email}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-panel border border-edge rounded-lg p-6">
            <Mail className="text-neon mb-2" size={24} />
            <div className="text-muted text-xs uppercase tracking-wider mb-1">Email</div>
            <div className="font-medium text-sm truncate">{user.email}</div>
          </div>
          <div className="bg-panel border border-edge rounded-lg p-6">
            <Heart className="text-flame mb-2" size={24} />
            <div className="text-muted text-xs uppercase tracking-wider mb-1">Favorites</div>
            <div className="font-display font-black text-2xl">{favList.length}</div>
          </div>
          <button onClick={handleSignOut} className="bg-panel border border-edge rounded-lg p-6 text-left hover:border-flame transition-colors">
            <LogOut className="text-flame mb-2" size={24} />
            <div className="text-muted text-xs uppercase tracking-wider mb-1">Account</div>
            <div className="font-medium text-sm">Sign Out</div>
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl">Your Favorites</h2>
            <Link href="/downloads" className="text-neon text-sm hover:underline">Browse more →</Link>
          </div>
          {favList.length === 0 ? (
            <div className="bg-panel border border-edge rounded-lg p-12 text-center">
              <Heart size={48} className="text-muted mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl mb-2">No favorites yet</h3>
              <p className="text-muted mb-4">Click the heart icon on any download to save it here.</p>
              <Link href="/downloads" className="inline-flex items-center gap-2 bg-neon text-dark font-bold px-6 py-3 rounded-lg hover:bg-neon-dark transition-colors">
                <DownloadIcon size={18} /> Browse Downloads
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favList.map((d) => (
                <div key={d.id} className="relative group">
                  <DownloadCard download={d} />
                  <button
                    onClick={() => removeFavorite(d.id)}
                    className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-flame/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
