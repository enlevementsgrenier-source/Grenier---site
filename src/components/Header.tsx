import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Menu, X, Github, HeartHandshake, Compass } from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';
import { getCurrentScheduleStatus, ScheduleStatus } from '../utils/schedule';

interface HeaderProps {
  onOpenGitHubModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGitHubModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState<ScheduleStatus>(getCurrentScheduleStatus());

  useEffect(() => {
    // Update schedule every minute
    const interval = setInterval(() => {
      setScheduleStatus(getCurrentScheduleStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1] transition-all">
      {/* Top micro-bar */}
      <div className="bg-[#2D5A43] text-[#F3EFE6] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#A3C9A8]" />
              {GRENIER_INFO.address.full}
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-white/90">
              Pays de Born, Landes (40)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${
                scheduleStatus.isOpenNow ? 'bg-[#52D273] animate-pulse' : 'bg-amber-300'
              }`} />
              <span className="font-medium text-white/95">
                {scheduleStatus.statusLabel} ({scheduleStatus.detailLabel})
              </span>
            </div>

            <button
              onClick={onOpenGitHubModal}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-0.5 rounded transition"
              title="Exporter le code sur GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Publier sur GitHub</span>
            </button>
          </div>
        </div>
      </div>

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
            <a href="#enlevements" className="hover:text-[#2D5A43] transition">
              Enlèvements
            </a>
            <a href="#boutique" className="hover:text-[#2D5A43] transition">
              La Boutique
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

            <a
              href={GRENIER_INFO.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#2D5A43] text-white hover:bg-[#234634] shadow-sm transition"
            >
              <Compass className="w-4 h-4 text-[#A3C9A8]" />
              <span>Itinéraire GPS</span>
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
              Horaires &amp; Accès Google Maps
            </a>
            <a
              href="#donner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-[#EAE2D5] transition"
            >
              Comment donner vos objets ?
            </a>
            <a
              href="#enlevements"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-[#EAE2D5] transition"
            >
              Demande d'enlèvement à domicile
            </a>
            <a
              href="#boutique"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-[#EAE2D5] transition"
            >
              La Boutique solidaire
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
            <a
              href={GRENIER_INFO.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#2D5A43] text-white font-medium text-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Ouvrir l'itinéraire Google Maps</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenGitHubModal();
              }}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-[#302B27]/20 text-[#302B27] font-medium text-sm"
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
