export const metadata = { title: 'Privacy Policy', description: 'How Komputeks Downloads handles your data and privacy.' };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-panel border-b border-edge py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl">Privacy Policy</h1>
          <p className="text-muted mt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
        <h2 className="font-display font-bold text-xl mb-3">1. Information We Collect</h2>
        <p className="text-muted mb-4">We collect minimal information necessary to provide our services: your email address (if you create an account), download preferences, and basic analytics data (page views, click patterns). We do not collect personal data like your name, phone number, or physical address.</p>
        <h2 className="font-display font-bold text-xl mb-3">2. How We Use Your Data</h2>
        <p className="text-muted mb-4">Your data is used solely to: provide and improve our services, send optional newsletter updates, prevent abuse, and analyze traffic patterns. We never sell your data to third parties.</p>
        <h2 className="font-display font-bold text-xl mb-3">3. Data Storage</h2>
        <p className="text-muted mb-4">Your data is stored securely using Supabase (PostgreSQL) with Row Level Security enabled. Passwords are hashed using industry-standard bcrypt. We use HTTPS encryption for all data transfers.</p>
        <h2 className="font-display font-bold text-xl mb-3">4. Cookies</h2>
        <p className="text-muted mb-4">We use essential cookies for authentication and session management. We do not use tracking cookies, advertising cookies, or third-party analytics cookies.</p>
        <h2 className="font-display font-bold text-xl mb-3">5. Your Rights</h2>
        <p className="text-muted mb-4">You have the right to: access your data, delete your account and all associated data, export your data, and opt out of communications at any time. Contact us to exercise these rights.</p>
        <h2 className="font-display font-bold text-xl mb-3">6. Third-Party Services</h2>
        <p className="text-muted mb-4">We use Supabase for database and authentication, Vercel for hosting, and GitHub for source control. These services have their own privacy policies that govern data stored on their platforms.</p>
        <h2 className="font-display font-bold text-xl mb-3">7. Contact</h2>
        <p className="text-muted">For privacy questions, contact us at support@komputeks.com.</p>
      </div>
    </div>
  );
}
