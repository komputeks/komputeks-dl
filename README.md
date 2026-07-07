# Komputeks Downloads

> Download premium games, mods, apps, and tools. Fast, secure, and always free.

![Komputeks Downloads](public/images/hero-bg.jpg)

## 🎮 About

Komputeks Downloads is a gaming-themed digital downloads portal built with Next.js, Supabase, and Tailwind CSS. It features a dark, neon-accented military/clan aesthetic inspired by the Clan War Gaming template.

## ✨ Features

- **Next.js 16 App Router** with TypeScript strict mode
- **Supabase** backend (Postgres, Auth, Storage)
- **Email/password + Google OAuth** authentication
- **Admin panel** with full CRUD for downloads and categories
- **User dashboard** with favorites tracking
- **PWA support** (manifest, service worker, offline page)
- **SEO optimized** (sitemap, robots, OG metadata, JSON-LD)
- **Dark gaming theme** with neon green and flame orange accents
- **Responsive** from 320px to 4K
- **8 seeded downloads** across 6 categories

## 🛠️ Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5.x (strict)
- Tailwind CSS v4
- Supabase (Postgres, Auth)
- Vercel (deployment)
- lucide-react (icons)
- framer-motion (animations)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/komputeks/komputeks-dl.git
cd komputeks-dl

# Install dependencies
npm install

# Copy env file and add your Supabase credentials
cp .env.example .env

# Run development server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_AUTH_PROXY=your_google_auth_proxy
```

## 📦 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/komputeks/komputeks-dl)

## 🗄️ Database Schema

| Table | Description |
|-------|-------------|
| `komputeks_categories` | Download categories (games, mods, apps, tools, etc.) |
| `komputeks_downloads` | Download items with metadata |
| `komputeks_reviews` | User reviews and ratings |
| `komputeks_favorites` | User favorite downloads |
| `komputeks_newsletter` | Newsletter subscribers |
| `komputeks_messages` | Contact form messages |

## 🔐 Demo Credentials

- **Admin:** admin@komputeks.com / komputeks123

## 📄 License

MIT

## 🔗 Links

- **Live Site:** https://komputeks-dl.vercel.app
- **GitHub:** https://github.com/komputeks/komputeks-dl
- **Supabase:** https://supabase.com

---

Built with ❤️ by [Komputeks](https://github.com/komputeks)
