import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

export const metadata = {
  title: 'Changelog — Komputeks Downloads',
  description: 'Development history, architectural decisions, and anti-patterns avoided.',
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-16">
      <Link href="/docs" className="inline-flex items-center gap-2 text-neon text-sm mb-6 hover:gap-3 transition-all">
        <ArrowLeft size={16} /> Back to Docs
      </Link>
      <h1 className="font-display font-black text-3xl sm:text-4xl mb-6 text-glow-neon text-neon">
        Changelog
      </h1>

      <div className="space-y-8">
        <div className="border-l-2 border-neon pl-6 relative">
          <div className="absolute w-3 h-3 bg-neon rounded-full -left-[7px] top-1.5" />
          <div className="flex items-center gap-2 text-sm text-muted mb-2">
            <Clock size={14} /> <span>July 2026 (Production Launch)</span>
          </div>
          <h2 className="font-display font-bold text-white text-xl mb-3">v1.0.0 — Initial Release</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted text-sm">
            <li><strong>Next.js 16 (App Router) Migration:</strong> Successfully migrated the entire platform from Vite to Next.js 16.2.10 to support Server-Side Rendering (SSR), static generation, and superior SEO.</li>
            <li><strong>Supabase Integration:</strong> Connected to Postgres database tables for categories, downloads, reviews, newsletter subscribers, and contact messages.</li>
            <li><strong>Authentication:</strong> Fully operational email/password and secure Google OAuth integration using custom AuthContext.</li>
            <li><strong>PWA Support:</strong> Created fully compliant Web Manifest, Service Worker caching static assets, and custom Offline fallback page.</li>
            <li><strong>Admin & User Dashboards:</strong> Built robust CRUD interfaces for administrators and private dashboards for users to manage their favorites.</li>
            <li><strong>Anti-patterns Avoided:</strong> Zero hardcoded mock arrays, no use of the `any` type, zero inline database queries in UI components (always routed through clean API routes or server clients).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}