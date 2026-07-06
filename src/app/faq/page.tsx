import { ChevronDown } from 'lucide-react';
import FAQItem from './FAQItem';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Komputeks Downloads.',
};

const FAQS = [
  { q: 'Are all downloads really free?', a: 'Yes. Every download on Komputeks is 100% free. No hidden fees, no premium tiers, no credit card required. We believe great software should be accessible to everyone.' },
  { q: 'Are the downloads safe?', a: 'Absolutely. Every file is scanned with multiple antivirus engines and manually verified by our team before publishing. We have a zero-tolerance policy for malware and adware.' },
  { q: 'How fast are the downloads?', a: 'Our global CDN delivers files at your maximum connection speed. No throttling, no waiting rooms, no timers. Click download and get your file instantly.' },
  { q: 'Do I need an account to download?', a: 'No. You can browse and download without an account. However, creating a free account lets you track downloads, save favorites, and get notified about new content.' },
  { q: 'Can I upload my own files?', a: 'We are working on a creator portal. For now, if you have a game, mod, or tool you want to share, contact us through the Contact page and we will review it.' },
  { q: 'How often is new content added?', a: 'We add new downloads every week. Subscribe to our newsletter to get notified whenever new content drops.' },
  { q: 'What platforms do you support?', a: 'We host downloads for Windows, macOS, Linux, Android, and iOS. Each download page lists the supported platforms.' },
  { q: 'How do I report a broken link?', a: 'If a download link is not working, please contact us through the Contact page with the download name. We fix broken links within 24 hours.' },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-panel border-b border-edge py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl mb-2">Frequently Asked Questions</h1>
          <p className="text-muted">Everything you need to know about Komputeks Downloads</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-3">
          {FAQS.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
        </div>
      </div>
    </div>
  );
}
