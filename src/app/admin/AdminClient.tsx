'use client';

import { useState } from 'react';
import { Download as DownloadIcon, FolderTree, Star, Users, TrendingUp, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { formatNumber, formatDate, slugify } from '@/lib/utils';
import type { Download, Category, Stats } from '@/lib/types';

export default function AdminClient({ downloads: initialDownloads, categories: initialCategories, stats }: { downloads: Download[]; categories: Category[]; stats: Stats }) {
  const [downloads, setDownloads] = useState(initialDownloads);
  const [categories, setCategories] = useState(initialCategories);
  const [tab, setTab] = useState<'overview' | 'downloads' | 'categories'>('overview');
  const [editing, setEditing] = useState<Download | null>(null);
  const [showForm, setShowForm] = useState(false);

  const deleteDownload = async (id: string) => {
    if (!confirm('Delete this download?')) return;
    await fetch('/api/download', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setDownloads(downloads.filter(d => d.id !== id));
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    await fetch('/api/categories', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className="bg-panel border-b border-edge py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl mb-2">Admin Panel</h1>
          <p className="text-muted">Manage downloads, categories, and view analytics</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['overview', 'downloads', 'categories'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-neon text-dark' : 'bg-panel border border-edge text-muted hover:text-white'}`}>{t}</button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatBox icon={DownloadIcon} label="Downloads" value={stats.total_downloads.toString()} color="neon" />
            <StatBox icon={TrendingUp} label="Downloads Served" value={formatNumber(stats.total_download_count)} color="flame" />
            <StatBox icon={FolderTree} label="Categories" value={stats.total_categories.toString()} color="neon" />
            <StatBox icon={Star} label="Reviews" value={stats.total_reviews.toString()} color="flame" />
            <StatBox icon={Users} label="Subscribers" value={stats.total_subscribers.toString()} color="neon" />
          </div>
        )}

        {tab === 'downloads' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display font-bold text-xl">Downloads ({downloads.length})</h2>
              <button onClick={() => { setEditing(null); setShowForm(true); }} className="bg-neon text-dark font-bold px-4 py-2 rounded-lg hover:bg-neon-dark transition-colors flex items-center gap-2"><Plus size={18} /> Add New</button>
            </div>
            <div className="bg-panel border border-edge rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-panel-light">
                    <tr className="text-left text-muted">
                      <th className="p-3">Title</th>
                      <th className="p-3 hidden sm:table-cell">Category</th>
                      <th className="p-3 hidden md:table-cell">Downloads</th>
                      <th className="p-3 hidden lg:table-cell">Date</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {downloads.map(d => (
                      <tr key={d.id} className="border-t border-edge">
                        <td className="p-3 font-medium">{d.title}</td>
                        <td className="p-3 hidden sm:table-cell text-muted">{d.category_name}</td>
                        <td className="p-3 hidden md:table-cell text-muted">{formatNumber(d.download_count)}</td>
                        <td className="p-3 hidden lg:table-cell text-muted">{formatDate(d.created_at)}</td>
                        <td className="p-3 text-right">
                          <button onClick={() => { setEditing(d); setShowForm(true); }} className="text-muted hover:text-neon p-1"><Edit2 size={16} /></button>
                          <button onClick={() => deleteDownload(d.id)} className="text-muted hover:text-flame p-1"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'categories' && (
          <div>
            <h2 className="font-display font-bold text-xl mb-4">Categories ({categories.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(c => (
                <div key={c.id} className="bg-panel border border-edge rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{c.icon}</span>
                    <div>
                      <div className="font-display font-bold">{c.name}</div>
                      <div className="text-muted text-xs">{c.slug}</div>
                    </div>
                  </div>
                  <button onClick={() => deleteCategory(c.id)} className="text-muted hover:text-flame p-1"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit/Create Form */}
      {showForm && (
        <DownloadForm
          download={editing}
          categories={categories}
          onClose={() => setShowForm(false)}
          onSave={async (data) => {
            if (editing) {
              const res = await fetch('/api/download', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...data }) });
              if (res.ok) {
                const updated = await res.json();
                setDownloads(downloads.map(d => d.id === editing.id ? updated : d));
              }
            } else {
              const res = await fetch('/api/downloads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
              if (res.ok) {
                const created = await res.json();
                setDownloads([created, ...downloads]);
              }
            }
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

function StatBox({ icon: Icon, label, value, color }: { icon: typeof DownloadIcon; label: string; value: string; color: 'neon' | 'flame' }) {
  return (
    <div className="bg-panel border border-edge rounded-lg p-4">
      <Icon size={20} className={color === 'neon' ? 'text-neon' : 'text-flame'} />
      <div className="font-display font-black text-2xl mt-2">{value}</div>
      <div className="text-muted text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}

function DownloadForm({ download, categories, onClose, onSave }: { download: Download | null; categories: Category[]; onClose: () => void; onSave: (data: Record<string, unknown>) => void }) {
  const [form, setForm] = useState({
    title: download?.title || '',
    slug: download?.slug || '',
    description: download?.description || '',
    long_description: download?.long_description || '',
    category_id: download?.category_id || categories[0]?.id || '',
    category_name: download?.category_name || categories[0]?.name || '',
    category_slug: download?.category_slug || categories[0]?.slug || '',
    download_url: download?.download_url || 'https://example.com/download',
    version: download?.version || '1.0.0',
    file_size: download?.file_size || '100 MB',
    image_url: download?.image_url || '/images/downloads/game1.jpg',
    developer: download?.developer || 'Komputeks',
    platform: download?.platform || 'Windows',
    featured: download?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === form.category_id);
    onSave({ ...form, category_name: cat?.name || form.category_name, category_slug: cat?.slug || form.category_slug, slug: form.slug || slugify(form.title) });
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-panel border border-edge rounded-lg p-6 w-full max-w-2xl my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display font-bold text-xl">{download ? 'Edit Download' : 'New Download'}</h2>
          <button onClick={onClose} className="text-muted hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon" required />
            <input placeholder="Slug (auto if empty)" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon" />
          </div>
          <textarea placeholder="Short description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="w-full bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon" required />
          <textarea placeholder="Long description" value={form.long_description} onChange={e => setForm({...form, long_description: e.target.value})} rows={4} className="w-full bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.category_id} onChange={e => { const c = categories.find(x => x.id === e.target.value); setForm({...form, category_id: e.target.value, category_name: c?.name || '', category_slug: c?.slug || ''}); }} className="bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon">
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input placeholder="Version" value={form.version} onChange={e => setForm({...form, version: e.target.value})} className="bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="File size" value={form.file_size} onChange={e => setForm({...form, file_size: e.target.value})} className="bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon" />
            <input placeholder="Platform" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})} className="bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon" />
          </div>
          <input placeholder="Image URL" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="w-full bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon" />
          <input placeholder="Download URL" value={form.download_url} onChange={e => setForm({...form, download_url: e.target.value})} className="w-full bg-dark border border-edge rounded px-3 py-2 text-sm focus:outline-none focus:border-neon" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} /> Featured</label>
          <button type="submit" className="w-full bg-neon text-dark font-bold py-3 rounded-lg hover:bg-neon-dark transition-colors flex items-center justify-center gap-2"><Save size={18} /> Save</button>
        </form>
      </div>
    </div>
  );
}
