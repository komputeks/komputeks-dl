export const metadata = { title: 'Terms of Service', description: 'Terms and conditions for using Komputeks Downloads.' };

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-panel border-b border-edge py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl">Terms of Service</h1>
          <p className="text-muted mt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
        <h2 className="font-display font-bold text-xl mb-3">1. Acceptance of Terms</h2>
        <p className="text-muted mb-4">By accessing and using Komputeks Downloads, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
        <h2 className="font-display font-bold text-xl mb-3">2. Use of Service</h2>
        <p className="text-muted mb-4">You agree to use the service only for lawful purposes. You may not: distribute malware, attempt to hack or disrupt the service, scrape content without permission, or use automated tools to mass-download content.</p>
        <h2 className="font-display font-bold text-xl mb-3">3. Downloads</h2>
        <p className="text-muted mb-4">All downloads are provided as-is. While we scan and verify all files, we cannot guarantee 100% compatibility with your system. You are responsible for checking system requirements before downloading.</p>
        <h2 className="font-display font-bold text-xl mb-3">4. Intellectual Property</h2>
        <p className="text-muted mb-4">The Komputeks Downloads platform, including its design, code, and branding, is the property of Komputeks. Downloadable files remain the property of their respective creators.</p>
        <h2 className="font-display font-bold text-xl mb-3">5. Accounts</h2>
        <p className="text-muted mb-4">You are responsible for maintaining the security of your account. We reserve the right to suspend accounts that violate these terms.</p>
        <h2 className="font-display font-bold text-xl mb-3">6. Limitation of Liability</h2>
        <p className="text-muted mb-4">Komputeks is not liable for any damages arising from the use of downloaded files. Use at your own risk.</p>
        <h2 className="font-display font-bold text-xl mb-3">7. Changes</h2>
        <p className="text-muted">We may update these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>
      </div>
    </div>
  );
}
