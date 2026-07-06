import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import DashboardClient from './DashboardClient';
import type { Download } from '@/lib/types';

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

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const supabase = createServerClient();
  const { data: favData } = await supabase
    .from('komputeks_favorites')
    .select('*, komputeks_downloads(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const favDownloads = (favData || [])
    .map((f: Record<string, unknown>) => f.komputeks_downloads as Download)
    .filter(Boolean) as Download[];

  return <DashboardClient user={user} favorites={favDownloads} />;
}
