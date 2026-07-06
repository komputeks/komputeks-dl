import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import AdminClient from './AdminClient';
import type { Download, Category, Stats } from '@/lib/types';

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sb-access-token')?.value;
  if (!token) return null;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

async function getData() {
  const supabase = createServerClient();
  const [downloadsRes, categoriesRes, reviewsRes, newsletterRes, countRes] = await Promise.all([
    supabase.from('komputeks_downloads').select('*').order('created_at', { ascending: false }),
    supabase.from('komputeks_categories').select('*').order('name', { ascending: true }),
    supabase.from('komputeks_reviews').select('id', { count: 'exact', head: true }),
    supabase.from('komputeks_newsletter').select('id', { count: 'exact', head: true }),
    supabase.from('komputeks_downloads').select('download_count'),
  ]);
  const totalDownloadCount = (countRes.data || []).reduce((sum, d) => sum + (d.download_count || 0), 0);
  const stats: Stats = {
    total_downloads: downloadsRes.data?.length || 0,
    total_categories: categoriesRes.data?.length || 0,
    total_reviews: reviewsRes.count || 0,
    total_subscribers: newsletterRes.count || 0,
    total_download_count: totalDownloadCount,
  };
  return {
    downloads: (downloadsRes.data || []) as Download[],
    categories: (categoriesRes.data || []) as Category[],
    stats,
  };
}

export default async function AdminPage() {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  const { isAdmin } = await import('@/lib/constants');
  if (!isAdmin(user.email)) redirect('/dashboard');
  const { downloads, categories, stats } = await getData();
  return <AdminClient downloads={downloads} categories={categories} stats={stats} />;
}
