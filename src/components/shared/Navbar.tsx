'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/lib/constants';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/categories', label: 'Categories' },
  { href: '/docs', label: 'Docs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/downloads?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  const admin = isAdmin(user?.email);

  return (
    <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-md border-b border-edge">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-neon rounded flex items-center justify-center">
              <span className="font-display font-black text-dark text-sm">K</span>
            </div>
            <span className="font-display font-bold text-lg hidden sm:block">KOMPUTEKS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-neon'
                    : 'text-muted hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search downloads..."
                className="w-full bg-panel border border-edge rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-neon transition-colors"
              />
            </div>
          </form>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-1 px-3 py-1.5 rounded text-sm text-muted hover:text-white transition-colors">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                {admin && (
                  <Link href="/admin" className="flex items-center gap-1 px-3 py-1.5 rounded text-sm text-flame hover:text-flame-dark transition-colors">
                    <Shield size={16} /> Admin
                  </Link>
                )}
                <button onClick={signOut} className="flex items-center gap-1 px-3 py-1.5 rounded text-sm text-muted hover:text-white transition-colors">
                  <LogOut size={16} /> Exit
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-3 py-1.5 rounded text-sm text-muted hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="px-4 py-1.5 rounded text-sm font-semibold bg-neon text-dark hover:bg-neon-dark transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search downloads..."
                className="w-full bg-panel border border-edge rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-neon"
              />
            </form>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn('block px-3 py-2 rounded text-sm font-medium', pathname === link.href ? 'text-neon' : 'text-muted')}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-edge space-y-2">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded text-sm text-muted">Dashboard</Link>
                  {admin && <Link href="/admin" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded text-sm text-flame">Admin</Link>}
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 rounded text-sm text-muted">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded text-sm text-muted">Sign In</Link>
                  <Link href="/auth/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded text-sm font-semibold bg-neon text-dark text-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
