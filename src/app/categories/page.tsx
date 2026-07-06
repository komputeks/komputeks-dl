import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import type { Category } from '@/lib/types';

export const metadata = {
  title: 'Categories',
  description: 'Browse downloads by category — games, mods, apps, tools, and more.',
};

async function getCategories() {
  const supabase = createServerClient();
  const { data } = await supabase.from('komputeks_categories').select('*').order('name', { ascending: true });
  return (data || []) as Category[];
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="min-h-screen">
      <div className="bg-panel border-b border-edge py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl mb-2">Categories</h1>
          <p className="text-muted">Browse our downloads by category</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/downloads?category=${cat.slug}`} className="group bg-panel border border-edge rounded-lg p-8 hover:border-neon transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]">
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h2 className="font-display font-bold text-2xl mb-2 group-hover:text-neon transition-colors">{cat.name}</h2>
              <p className="text-muted">{cat.description}</p>
              <div className="mt-4 text-neon text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Browse →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
