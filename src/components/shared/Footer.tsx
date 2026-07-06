'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Github, Twitter, Youtube, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-panel border-t border-edge mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-neon rounded flex items-center justify-center">
                <span className="font-display font-black text-dark text-sm">K</span>
              </div>
              <span className="font-display font-bold text-lg">KOMPUTEKS</span>
            </div>
            <p className="text-muted text-sm max-w-md mb-4">
              The ultimate destination for premium game, mod, app, and tool downloads. Fast, secure, and always free. Join 50,000+ gamers worldwide.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/komputeks" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-panel-light flex items-center justify-center text-muted hover:text-neon transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded bg-panel-light flex items-center justify-center text-muted hover:text-neon transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded bg-panel-light flex items-center justify-center text-muted hover:text-neon transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/downloads" className="text-muted hover:text-neon transition-colors">All Downloads</Link></li>
              <li><Link href="/categories" className="text-muted hover:text-neon transition-colors">Categories</Link></li>
              <li><Link href="/about" className="text-muted hover:text-neon transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="text-muted hover:text-neon transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-neon transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4">Stay Updated</h3>
            <p className="text-muted text-sm mb-3">Get notified about new downloads and exclusive content.</p>
            <form onSubmit={subscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon"
              />
              <button type="submit" disabled={status === 'loading'} className="bg-neon text-dark rounded px-3 py-2 hover:bg-neon-dark transition-colors disabled:opacity-50">
                <Send size={16} />
              </button>
            </form>
            {status === 'success' && <p className="text-neon text-xs mt-2">Subscribed! Check your inbox.</p>}
            {status === 'error' && <p className="text-flame text-xs mt-2">Something went wrong. Try again.</p>}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-edge flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs">© {new Date().getFullYear()} Komputeks Downloads. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/privacy" className="text-muted hover:text-neon">Privacy Policy</Link>
            <Link href="/terms" className="text-muted hover:text-neon">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
