'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-panel border border-edge rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-panel-light transition-colors">
        <span className="font-display font-bold text-base pr-4">{question}</span>
        <ChevronDown size={20} className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5 text-muted text-sm">{answer}</div>}
    </div>
  );
}
