'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email';
    if (!subject.trim()) e.subject = 'Subject is required';
    if (!message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setSubject(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-panel border-b border-edge py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl mb-2">Contact Us</h1>
          <p className="text-muted">We respond within 24 hours. No bots, just humans.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-panel border border-edge rounded-lg p-6">
              <Mail className="text-neon mb-3" size={28} />
              <h3 className="font-display font-bold mb-1">Email</h3>
              <p className="text-muted text-sm">support@komputeks.com</p>
            </div>
            <div className="bg-panel border border-edge rounded-lg p-6">
              <MessageSquare className="text-flame mb-3" size={28} />
              <h3 className="font-display font-bold mb-1">Response Time</h3>
              <p className="text-muted text-sm">Within 24 hours, 7 days a week</p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-panel border border-edge rounded-lg p-6">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="text-neon mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-muted">We will get back to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 text-neon text-sm hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-dark border border-edge rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-neon" />
                      {errors.name && <p className="text-flame text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-dark border border-edge rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-neon" />
                      {errors.email && <p className="text-flame text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-dark border border-edge rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-neon" />
                    {errors.subject && <p className="text-flame text-xs mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full bg-dark border border-edge rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-neon" />
                    {errors.message && <p className="text-flame text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={status === 'loading'} className="bg-neon text-dark font-bold px-8 py-3 rounded-lg hover:bg-neon-dark transition-colors disabled:opacity-50 flex items-center gap-2">
                    {status === 'loading' ? 'Sending...' : <>Send Message <Send size={18} /></>}
                  </button>
                  {status === 'error' && <p className="text-flame text-sm">Something went wrong. Please try again.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
