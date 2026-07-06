import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import DownloadDetailClient from './DownloadDetailClient';
import type { Download as DownloadType, Review } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServerClient();
  const { data } = await supabase.from('komputeks_downloads').select('*').eq('slug', slug).single();
  if (!data) return { title: 'Download Not Found' };
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.image_url],
    },
  };
}

async function getDownload(slug: string) {
  const supabase = createServerClient();
  const { data } = await supabase.from('komputeks_downloads').select('*').eq('slug', slug).single();
  return data as DownloadType | null;
}

async function getReviews(downloadId: string) {
  const supabase = createServerClient();
  const { data } = await supabase.from('komputeks_reviews').select('*').eq('download_id', downloadId).order('created_at', { ascending: false });
  return (data || []) as Review[];
}

export default async function DownloadDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const download = await getDownload(slug);
  if (!download) notFound();
  const reviews = await getReviews(download.id);
  return <DownloadDetailClient download={download} initialReviews={reviews} />;
}
