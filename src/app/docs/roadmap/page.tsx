import Link from 'next/link';
import { ArrowLeft, Milestone } from 'lucide-react';

export const metadata = {
  title: 'Roadmap — Komputeks Downloads',
  description: 'Future roadmap and planned features for Komputeks Downloads.',
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-16">
      <Link href="/docs" className="inline-flex items-center gap-2 text-neon text-sm mb-6 hover:gap-3 transition-all">
        <ArrowLeft size={16} /> Back to Docs
      </Link>
      <h1 className="font-display font-black text-3xl sm:text-4xl mb-6 text-glow-neon text-neon">
        Roadmap
      </h1>

      <div className="space-y-8">
        <div className="bg-panel border border-edge rounded-lg p-6">
          <h2 className="font-display font-bold text-white text-xl mb-3 flex items-center gap-2">
            <Milestone className="text-neon" size={20} /> Phase 1: Community Forums
          </h2>
          <p className="text-muted text-sm">
            Introduce user forums where players can discuss game strategies, request mods, and share custom tools with other community members.
          </p>
        </div>

        <div className="bg-panel border border-edge rounded-lg p-6">
          <h2 className="font-display font-bold text-white text-xl mb-3 flex items-center gap-2">
            <Milestone className="text-neon" size={20} /> Phase 2: Cloudflare R2 Direct Downloads
          </h2>
          <p className="text-muted text-sm">
            Transition standard file downloads to high-speed Cloudflare R2 storage, ensuring lightning-fast download speeds globally with zero bandwidth limits.
          </p>
        </div>

        <div className="bg-panel border border-edge rounded-lg p-6">
          <h2 className="font-display font-bold text-white text-xl mb-3 flex items-center gap-2">
            <Milestone className="text-neon" size={20} /> Phase 3: Android App Release (TWA)
          </h2>
          <p className="text-muted text-sm">
            Publish our officially compiled Trusted Web Activity (TWA) Android application package (.apk) to the Google Play Store for seamless mobile access.
          </p>
        </div>
      </div>
    </div>
  );
}