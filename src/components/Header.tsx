import React, { useState } from 'react';
import { Phone, Menu, X, Github, HeartHandshake } from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';

interface HeaderProps {
  onOpenGitHubModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGitHubModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1] transition-all">
      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#2D5A43] text-[#F3EFE6] flex items-center justify-center shadow-sm group-hover:bg-[#234634] transition">
              <HeartHandshake className="w-6 h-6 text-[#A3C9A8]" />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-[#1F3D2E] tracking-tight flex items-center gap-2">
                Le Grenier de Mézos
              </div>
              <p className="text-xs text-[#6B5E51] font-medium tracking-wide">
                Recyclerie &amp; Ressourcerie Solidaire
              </p>
            </div>
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
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold bg-[#EAE2D5] text-[#2D5A43] hover:bg-[#DFD4C3] transition"
            >
              <Phone className="w-4 h-4 text-[#2D5A43]" />
              <span>{GRENIER_INFO.contact.phone}</span>
            </a>

            <button
              onClick={onOpenGitHubModal}
              className="inline-flex items-center gap-1.5 text-xs bg-[#2D5A43] hover:bg-[#204231] text-white px-3 py-2 rounded-lg font-medium transition"
              title="Exporter le code sur GitHub"
            >
              <Github className="w-4 h-4" />
              <span>Publier sur GitHub</span>
            </button>
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

          <div className="pt-3 border-t border-[#E8DFD1] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenGitHubModal();
              }}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#2D5A43] text-white font-medium text-sm"
            >
              <Github className="w-4 h-4" />
              <span>Publier ce site sur GitHub</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
