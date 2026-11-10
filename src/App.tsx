/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, PageId } from './components/Header';
import { Footer } from './components/Footer';
import { NoticeBanner } from './components/NoticeBanner';
import { SiteContentProvider } from './context/SiteContentContext';
import { PageHome } from './pages/PageHome';
import { PageDons } from './pages/PageDons';
import { PageMission } from './pages/PageMission';
import { PageFAQ } from './pages/PageFAQ';
import { MentionsLegales } from './components/MentionsLegales';

function parseHashToPage(hash: string): PageId {
  const clean = hash.replace(/^#\/?/, '').toLowerCase();
  if (clean === 'dons' || clean === 'donner' || clean === 'don') return 'dons';
  if (clean === 'mission' || clean === 'valeurs' || clean === 'impact') return 'mission';
  if (clean === 'faq' || clean === 'questions') return 'faq';
  if (clean === 'mentions-legales' || clean === 'mentions' || clean === 'legal') return 'mentions-legales';
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    return parseHashToPage(window.location.hash);
  });

  // Synchronisation avec les événements de l'historique du navigateur
  useEffect(() => {
    const handleHashChange = () => {
      const page = parseHashToPage(window.location.hash);
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    const newHash = page === 'home' ? '' : `#/${page}`;
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash || window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SiteContentProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2724]">
        {/* Bandeau d'actualités si activé */}
        <NoticeBanner />

        {/* En-tête avec navigation multi-pages */}
        <Header currentPage={currentPage} onNavigate={navigateTo} />

        {/* Contenu principal selon la page active */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <PageHome onNavigate={navigateTo} />
          )}

          {currentPage === 'dons' && (
            <PageDons onNavigateHome={() => navigateTo('home')} />
          )}

          {currentPage === 'mission' && (
            <PageMission onNavigate={navigateTo} />
          )}

          {currentPage === 'faq' && (
            <PageFAQ onNavigateHome={() => navigateTo('home')} />
          )}

          {currentPage === 'mentions-legales' && (
            <MentionsLegales onNavigateHome={() => navigateTo('home')} />
          )}
        </main>

        {/* Pied de page avec liens de navigation et mentions légales */}
        <Footer onNavigate={navigateTo} />
      </div>
    </SiteContentProvider>
  );
}
