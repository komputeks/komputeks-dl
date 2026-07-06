import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { search, category, sort, limit = '12', offset = '0', featured } = req.query;
      let query = supabase
        .from('komputeks_downloads')
        .select('*', { count: 'exact' });

      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }
      if (category) {
        query = query.eq('category_slug', category);
      }
      if (featured === 'true') {
        query = query.eq('featured', true);
      }

      if (sort === 'popular') {
        query = query.order('download_count', { ascending: false });
      } else if (sort === 'name') {
        query = query.order('title', { ascending: true });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const off = parseInt(offset) || 0;
      const lim = parseInt(limit) || 12;
      query = query.range(off, off + lim - 1);

      const { data, error, count } = await query;
      if (error) throw error;
      return res.status(200).json({ data: data || [], total: count || 0 });
    }

    if (req.method === 'POST') {
      const body = req.body;
      const { data, error } = await supabase
        .from('komputeks_downloads')
        .insert(body)
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error [downloads]:', err);
    res.status(500).json({ error: err.message });
  }
}
