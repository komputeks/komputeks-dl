import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const { slug } = req.query;

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('komputeks_downloads')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { data: current } = await supabase
        .from('komputeks_downloads')
        .select('download_count')
        .eq('slug', slug)
        .single();
      const newCount = (current?.download_count || 0) + 1;
      const { data, error } = await supabase
        .from('komputeks_downloads')
        .update({ download_count: newCount })
        .eq('slug', slug)
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const { data, error } = await supabase
        .from('komputeks_downloads')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase
        .from('komputeks_downloads')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error [download]:', err);
    res.status(500).json({ error: err.message });
  }
}
