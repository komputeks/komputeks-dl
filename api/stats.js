import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const [downloadsRes, categoriesRes, reviewsRes, newsletterRes, countRes] = await Promise.all([
        supabase.from('komputeks_downloads').select('id', { count: 'exact', head: true }),
        supabase.from('komputeks_categories').select('id', { count: 'exact', head: true }),
        supabase.from('komputeks_reviews').select('id', { count: 'exact', head: true }),
        supabase.from('komputeks_newsletter').select('id', { count: 'exact', head: true }),
        supabase.from('komputeks_downloads').select('download_count'),
      ]);

      const totalDownloadCount = (countRes.data || []).reduce((sum, d) => sum + (d.download_count || 0), 0);

      return res.status(200).json({
        total_downloads: downloadsRes.count || 0,
        total_categories: categoriesRes.count || 0,
        total_reviews: reviewsRes.count || 0,
        total_subscribers: newsletterRes.count || 0,
        total_download_count: totalDownloadCount,
      });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error [stats]:', err);
    res.status(500).json({ error: err.message });
  }
}
