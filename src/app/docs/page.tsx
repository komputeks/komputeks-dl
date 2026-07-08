import Link from 'next/link';
import { BookOpen, Key, ShieldAlert, GitBranch, Compass } from 'lucide-react';

export const metadata = {
  title: 'Documentation — Komputeks Downloads',
  description: 'Learn how to use, deploy, and build upon Komputeks Downloads.',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-display font-black text-4xl sm:text-5xl mb-4 text-glow-neon text-neon">
        Documentation
      </h1>
      <p className="text-muted text-lg mb-12">
        Welcome to the Komputeks Downloads documentation. Here you can find instructions on how to use the app, deploy it, view the development changelog, and check our future roadmap.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/docs/user-manual" className="group bg-panel border border-edge rounded-lg p-6 hover:border-neon transition-all">
          <BookOpen className="text-neon mb-4" size={32} />
          <h2 className="font-display font-bold text-xl mb-2 group-hover:text-neon transition-colors">User Manual</h2>
          <p className="text-muted text-sm">How to browse, download, review, and manage your favorites on Komputeks Downloads.</p>
        </Link>

        <Link href="/docs/changelog" className="group bg-panel border border-edge rounded-lg p-6 hover:border-neon transition-all">
          <GitBranch className="text-neon mb-4" size={32} />
          <h2 className="font-display font-bold text-xl mb-2 group-hover:text-neon transition-colors">Changelog</h2>
          <p className="text-muted text-sm">A history of architectural decisions, features shipped, and anti-patterns avoided.</p>
        </Link>

        <Link href="/docs/roadmap" className="group bg-panel border border-edge rounded-lg p-6 hover:border-neon transition-all">
          <Compass className="text-neon mb-4" size={32} />
          <h2 className="font-display font-bold text-xl mb-2 group-hover:text-neon transition-colors">Roadmap</h2>
          <p className="text-muted text-sm">Our future feature roadmap and growth experiments for the gaming community.</p>
        </Link>
      </div>
    </div>
  );
}