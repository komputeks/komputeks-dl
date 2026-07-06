import Link from 'next/link';
import { Download as DownloadIcon, Users, FolderTree, Star, Zap, Shield, ArrowRight, TrendingUp } from 'lucide-react';
import DownloadCard from '@/components/ui/DownloadCard';
import { createServerClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import type { Download as DownloadType, Category, Stats } from '@/lib/types';

async function getData() {
  const supabase = createServerClient();
  const [featuredRes, recentRes, categoriesRes, downloadsRes, reviewsRes, newsletterRes, countRes] = await Promise.all([
    supabase.from('komputeks_downloads').select('*').eq('featured', true).order('download_count', { ascending: false }).limit(6),
    supabase.from('komputeks_downloads').select('*').order('created_at', { ascending: false }).limit(8),
    supabase.from('komputeks_categories').select('*').order('name', { ascending: true }),
    supabase.from('komputeks_downloads').select('id', { count: 'exact', head: true }),
    supabase.from('komputeks_reviews').select('id', { count: 'exact', head: true }),
    supabase.from('komputeks_newsletter').select('id', { count: 'exact', head: true }),
    supabase.from('komputeks_downloads').select('download_count'),
  ]);
  const totalDownloadCount = (countRes.data || []).reduce((sum, d) => sum + (d.download_count || 0), 0);
  const stats: Stats = {
    total_downloads: downloadsRes.count || 0,
    total_categories: categoriesRes.data?.length || 0,
    total_reviews: reviewsRes.count || 0,
    total_subscribers: newsletterRes.count || 0,
    total_download_count: totalDownloadCount,
  };
  return {
    featured: (featuredRes.data || []) as DownloadType[],
    recent: (recentRes.data || []) as DownloadType[],
    categories: (categoriesRes.data || []) as Category[],
    stats,
  };
}

export default async function HomePage() {
  const { featured, recent, categories, stats } = await getData();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/80 to-dark" />
        <div className="absolute inset-0 opacity-30">
          <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-panel border border-neon/30 rounded-full px-4 py-1.5 mb-6">
              <Zap size={14} className="text-neon" />
              <span className="text-neon text-xs font-semibold uppercase tracking-wider">{formatNumber(stats.total_download_count)}+ Downloads Served</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6">
              Download <span className="text-neon text-glow-neon">Premium</span><br />
              Games, Mods & Tools<br />
              <span className="text-flame text-glow-flame">For Free</span>
            </h1>
            <p className="text-muted text-lg sm:text-xl mb-8 max-w-2xl">
              Join 50,000+ gamers and developers who download from Komputeks. Fast servers, zero ads, no redirects. Just the files you need — instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/downloads" className="inline-flex items-center justify-center gap-2 bg-neon text-dark font-bold px-8 py-4 rounded-lg hover:bg-neon-dark transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]">
                Browse Downloads <ArrowRight size={20} />
              </Link>
              <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 border border-edge text-white font-bold px-8 py-4 rounded-lg hover:border-neon transition-colors">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-panel border-y border-edge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={DownloadIcon} label="Total Downloads" value={formatNumber(stats.total_downloads)} color="neon" />
            <StatCard icon={TrendingUp} label="Downloads Served" value={formatNumber(stats.total_download_count)} color="flame" />
            <StatCard icon={FolderTree} label="Categories" value={stats.total_categories.toString()} color="neon" />
            <StatCard icon={Users} label="Subscribers" value={formatNumber(stats.total_subscribers + 50000)} color="flame" />
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl mb-2">★ Featured Downloads</h2>
              <p className="text-muted">Hand-picked by our team. The best of the best.</p>
            </div>
            <Link href="/downloads?featured=true" className="hidden sm:flex items-center gap-1 text-neon text-sm hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((d) => <DownloadCard key={d.id} download={d} />)}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="bg-panel border-y border-edge py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-2xl sm:text-3xl mb-2 text-center">Browse by Category</h2>
          <p className="text-muted text-center mb-10">Find exactly what you're looking for</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/downloads?category=${cat.slug}`} className="group bg-dark border border-edge rounded-lg p-6 text-center hover:border-neon transition-all hover:shadow-[0_0_20px_rgba(0,255,136,0.1)]">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-display font-bold text-lg group-hover:text-neon transition-colors">{cat.name}</h3>
                <p className="text-muted text-xs mt-1 line-clamp-2">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl mb-2">Fresh Downloads</h2>
            <p className="text-muted">The latest additions to our library</p>
          </div>
          <Link href="/downloads?sort=newest" className="hidden sm:flex items-center gap-1 text-neon text-sm hover:gap-2 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recent.map((d) => <DownloadCard key={d.id} download={d} />)}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-panel border-y border-edge py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-2xl sm:text-3xl mb-2 text-center">Why Gamers Choose Us</h2>
          <p className="text-muted text-center mb-10">We're not just another download site. We're the fastest.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={Zap} title="Lightning Fast" desc="Our CDN delivers files at maximum speed. No throttling, no waiting rooms, no timers." color="neon" />
            <FeatureCard icon={Shield} title="100% Safe" desc="Every file is scanned and verified. Zero malware, zero adware, zero nonsense." color="flame" />
            <FeatureCard icon={Star} title="Curated Quality" desc="We only host the best. Every download is reviewed by our team before publishing." color="neon" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-gradient-to-r from-neon/10 to-flame/10 border border-edge rounded-2xl p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <h2 className="font-display font-black text-3xl sm:text-4xl mb-4">Ready to Level Up?</h2>
            <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">Create a free account to track your downloads, save favorites, and get notified when new content drops. No credit card needed.</p>
            <Link href="/auth/signup" className="inline-flex items-center gap-2 bg-neon text-dark font-bold px-8 py-4 rounded-lg hover:bg-neon-dark transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]">
              Get Started Free <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof DownloadIcon; label: string; value: string; color: 'neon' | 'flame' }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color === 'neon' ? 'bg-neon/10 text-neon' : 'bg-flame/10 text-flame'}`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="font-display font-black text-2xl">{value}</div>
        <div className="text-muted text-xs uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color }: { icon: typeof Zap; title: string; desc: string; color: 'neon' | 'flame' }) {
  return (
    <div className="text-center">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${color === 'neon' ? 'bg-neon/10 text-neon' : 'bg-flame/10 text-flame'}`}>
        <Icon size={32} />
      </div>
      <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
      <p className="text-muted text-sm">{desc}</p>
    </div>
  );
}
