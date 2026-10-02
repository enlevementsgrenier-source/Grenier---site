/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PracticalInfo } from './components/PracticalInfo';
import { PhotoCarousel } from './components/PhotoCarousel';
import { DonationsAndPickups } from './components/DonationsAndPickups';
import { ImpactValues } from './components/ImpactValues';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2724]">
      {/* Header with navigation */}
      <Header />

      {/* Main one-pager content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Practical info: Address, Detailed Hours & Map */}
        <PracticalInfo />

        {/* Photo Carousel: Horizontal scrolling banner with arrows */}
        <PhotoCarousel />

        {/* How to donate & Home Pickups */}
        <DonationsAndPickups />

        {/* Impact & circular economy in Landes */}
        <ImpactValues />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
