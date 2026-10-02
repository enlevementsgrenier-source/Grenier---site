import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1] transition-all">
      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center py-1 group" title="Le Grenier de Mézos - Accueil">
            <Logo className="h-14 sm:h-16 w-auto drop-shadow-xs group-hover:scale-105 transition-transform duration-200" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4A3E31]">
            <a href="#infos-pratiques" className="hover:text-[#2D5A43] transition">
              Horaires &amp; Accès
            </a>
            <a href="#donner" className="hover:text-[#2D5A43] transition">
              Comment donner ?
            </a>
            <a href="#valeurs" className="hover:text-[#2D5A43] transition">
              Notre Mission
            </a>
            <a href="#faq" className="hover:text-[#2D5A43] transition">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${GRENIER_INFO.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#2D5A43] text-white hover:bg-[#204231] shadow-xs transition"
            >
              <Phone className="w-4 h-4 text-[#A5D8B3]" />
              <span>{GRENIER_INFO.contact.phone}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${GRENIER_INFO.contact.phoneRaw}`}
              className="p-2 rounded-lg bg-[#EAE2D5] text-[#2D5A43]"
              aria-label="Appeler Le Grenier"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#4A3E31] hover:bg-[#EAE2D5] focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD1] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-[#4A3E31]">
            <a
              href="#infos-pratiques"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-[#EAE2D5] transition"
            >
              Horaires &amp; Accès
            </a>
            <a
              href="#donner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-[#EAE2D5] transition"
            >
              Comment donner vos objets ?
            </a>
            <a
              href="#valeurs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-[#EAE2D5] transition"
            >
              Notre Mission &amp; Impact
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-[#EAE2D5] transition"
            >
              Foire Aux Questions
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
