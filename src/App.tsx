/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PracticalInfo } from './components/PracticalInfo';
import { DonationsAndPickups } from './components/DonationsAndPickups';
import { ImpactValues } from './components/ImpactValues';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { GitHubModal } from './components/GitHubModal';

export default function App() {
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2724]">
      {/* Header with navigation & GitHub modal trigger */}
      <Header onOpenGitHubModal={() => setIsGitHubModalOpen(true)} />

      {/* Main one-pager content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Practical info: Address, Detailed Hours & Map */}
        <PracticalInfo />

        {/* How to donate & Home Pickups */}
        <DonationsAndPickups />

        {/* Impact & circular economy in Landes */}
        <ImpactValues />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer with recap & GitHub trigger */}
      <Footer onOpenGitHubModal={() => setIsGitHubModalOpen(true)} />

      {/* GitHub Export / Publication Modal */}
      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
}
