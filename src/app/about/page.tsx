import { Zap, Shield, Star, Users, Target, Award } from 'lucide-react';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Komputeks Downloads — our mission, our team, and why we are the best place for premium downloads.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-panel border-b border-edge py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">About Komputeks</h1>
          <p className="text-muted text-lg sm:text-xl">We are on a mission to make premium downloads accessible to everyone — fast, safe, and always free.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none mb-16">
          <h2 className="font-display font-bold text-2xl mb-4">Our Story</h2>
          <p className="text-muted mb-4">
            Komputeks Downloads was born from a simple frustration: every download site on the internet is slow, ad-riddled, and full of redirects. We knew there was a better way.
          </p>
          <p className="text-muted mb-4">
            So we built it. A platform where gamers and developers can find the files they need without wading through pop-ups, waiting rooms, or fake download buttons. Just clean, fast, verified downloads.
          </p>
          <p className="text-muted">
            Today, we serve over 50,000 active users with a library of premium games, mods, apps, and tools — and we are just getting started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <ValueCard icon={Zap} title="Speed First" desc="Our CDN delivers files at maximum speed. No throttling, ever." />
          <ValueCard icon={Shield} title="Safety Always" desc="Every file is scanned and verified before publishing." />
          <ValueCard icon={Star} title="Quality Curated" desc="We only host the best. No filler, no junk." />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatCard icon={Users} value="50K+" label="Active Users" />
          <StatCard icon={Award} value="500+" label="Downloads" />
          <StatCard icon={Target} value="99.9%" label="Uptime" />
          <StatCard icon={Zap} value="<2s" label="Load Time" />
        </div>

        <div className="bg-panel border border-edge rounded-lg p-8 text-center">
          <h2 className="font-display font-bold text-2xl mb-4">Want to Contribute?</h2>
          <p className="text-muted mb-6">Have a game, mod, or tool you want to share with the community? We would love to hear from you.</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-neon text-dark font-bold px-8 py-3 rounded-lg hover:bg-neon-dark transition-colors">Get in Touch</a>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon: Icon, title, desc }: { icon: typeof Zap; title: string; desc: string }) {
  return (
    <div className="bg-panel border border-edge rounded-lg p-6 text-center">
      <div className="w-12 h-12 rounded-lg bg-neon/10 text-neon flex items-center justify-center mx-auto mb-4">
        <Icon size={24} />
      </div>
      <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted text-sm">{desc}</p>
    </div>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <div className="text-center">
      <Icon size={24} className="text-flame mx-auto mb-2" />
      <div className="font-display font-black text-3xl">{value}</div>
      <div className="text-muted text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}
