export const SITE_NAME = 'Komputeks Downloads';
export const SITE_DESCRIPTION = 'Download premium games, mods, apps, and tools. Fast, secure, and always free.';
export const SITE_URL = 'https://komputeks-dl.vercel.app';
export const ADMIN_EMAILS = ['admin@komputeks.com', 'xpatworld2021@gmail.com'];

export function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
