'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import DownloadCard from '@/components/ui/DownloadCard';
import Spinner from '@/components/ui/Spinner';
import type { Download as DownloadType, Category } from '@/lib/types';

export default function DownloadsClient() {
  const searchParams = useSearchParams();
  const [downloads, setDownloads] = useState<DownloadType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get('featured') === 'true');

  const fetchCategories = useCallback(async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  }, []);

  const fetchDownloads = useCallback(async (pageNum = 0, append = false) => {
    setLoading(true);
    const params = new URLSearchParams({
      limit: '12',
      offset: String(pageNum * 12),
      sort,
    });
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (featuredOnly) params.set('featured', 'true');
    const res = await fetch(`/api/downloads?${params}`);
    const data = await res.json();
    setDownloads(append ? [...downloads, ...data.data] : data.data);
    setTotal(data.total);
    setLoading(false);
  }, [search, category, sort, featuredOnly, downloads]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { setPage(0); fetchDownloads(0); }, [search, category, sort, featuredOnly]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchDownloads(0);
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchDownloads(next, true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-panel border-b border-edge py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl mb-2">All Downloads</h1>
          <p className="text-muted">Browse our complete library of {total} downloads</p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-dark/95 backdrop-blur-md border-b border-edge py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-3">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search downloads..."
                className="w-full bg-panel border border-edge rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-neon"
              />
            </form>
            <div className="flex gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-panel border border-edge rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-neon"
              >
                <option value="">All Categories</option>
                {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-panel border border-edge rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-neon"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="name">A-Z</option>
              </select>
              <button
                onClick={() => setFeaturedOnly(!featuredOnly)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${featuredOnly ? 'bg-neon text-dark border-neon' : 'border-edge text-muted hover:text-white'}`}
              >
                ★ Featured
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && downloads.length === 0 ? (
          <Spinner size={32} />
        ) : downloads.length === 0 ? (
          <div className="text-center py-20">
            <SlidersHorizontal size={48} className="text-muted mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl mb-2">No downloads found</h3>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {downloads.map((d) => <DownloadCard key={d.id} download={d} />)}
            </div>
            {downloads.length < total && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-panel border border-edge text-white font-bold px-8 py-3 rounded-lg hover:border-neon transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
