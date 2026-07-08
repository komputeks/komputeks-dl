import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'User Manual — Komputeks Downloads',
  description: 'Complete user guide for browsing, downloading, and managing accounts on Komputeks Downloads.',
};

export default function UserManualPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-16">
      <Link href="/docs" className="inline-flex items-center gap-2 text-neon text-sm mb-6 hover:gap-3 transition-all">
        <ArrowLeft size={16} /> Back to Docs
      </Link>
      <h1 className="font-display font-black text-3xl sm:text-4xl mb-6 text-glow-neon text-neon">
        User Manual
      </h1>

      <div className="space-y-8 text-muted">
        <section className="bg-panel border border-edge rounded-lg p-6">
          <h2 className="font-display font-bold text-white text-xl mb-3 flex items-center gap-2">
            <CheckCircle2 className="text-neon" size={20} /> 1. Creating an Account
          </h2>
          <p>
            To sign up, click on <strong>Create Free Account</strong> or head directly to <Link href="/auth/signup" className="underline text-white">/auth/signup</Link>. You can register with email and password or use the secure <strong>Google Sign-In</strong> option.
          </p>
        </section>

        <section className="bg-panel border border-edge rounded-lg p-6">
          <h2 className="font-display font-bold text-white text-xl mb-3 flex items-center gap-2">
            <CheckCircle2 className="text-neon" size={20} /> 2. Browsing and Searching Downloads
          </h2>
          <p>
            You can search and filter the entire catalog at <Link href="/downloads" className="underline text-white">/downloads</Link>. Use the search bar for keyword search, filter by category, or sort by Newest, Popular, or A-Z.
          </p>
        </section>

        <section className="bg-panel border border-edge rounded-lg p-6">
          <h2 className="font-display font-bold text-white text-xl mb-3 flex items-center gap-2">
            <CheckCircle2 className="text-neon" size={20} /> 3. Downloading Files
          </h2>
          <p>
            On any download detail page, click the <strong>Download Now</strong> button. This will increment the download count in our database and securely redirect you to the direct high-speed download link.
          </p>
        </section>

        <section className="bg-panel border border-edge rounded-lg p-6">
          <h2 className="font-display font-bold text-white text-xl mb-3 flex items-center gap-2">
            <CheckCircle2 className="text-neon" size={20} /> 4. Reviews & Favorites
          </h2>
          <p>
            Registered users can leave ratings and text reviews on any download detail page. You can also click the <strong>Favorite</strong> star button to save items to your personal list, accessible from your <Link href="/dashboard" className="underline text-white">Dashboard</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}