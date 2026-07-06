import { Suspense } from 'react';
import DownloadsClient from './DownloadsClient';

export const metadata = {
  title: 'All Downloads — Games, Mods, Apps & Tools',
  description: 'Browse our complete library of premium game, mod, app, and tool downloads. Search, filter, and download instantly.',
};

export default function DownloadsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <DownloadsClient />
    </Suspense>
  );
}
