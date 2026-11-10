import React, { useState } from 'react';
import { Phone, Menu, X, Home, Package, HeartHandshake, HelpCircle } from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';
import { Logo } from './Logo';

export type PageId = 'home' | 'dons' | 'mission' | 'faq' | 'mentions-legales';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Accueil & Horaires', icon: Home },
    { id: 'dons', label: 'Dons (3 options)', icon: Package },
    { id: 'mission', label: 'Notre Mission', icon: HeartHandshake },
    { id: 'faq', label: 'FAQ', icon: HelpCircle }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1] transition-all">
      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center py-1 group text-left cursor-pointer"
            title="Le Grenier de Mézos - Retour à l'accueil"
          >
            <Logo className="h-14 sm:h-16 w-auto drop-shadow-xs group-hover:scale-105 transition-transform duration-200" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#2D5A43] text-white shadow-xs'
                      : 'text-[#4A3E31] hover:bg-[#EAE2D5] hover:text-[#1F3D2E]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#A3C9A8]' : 'text-[#7A6C5E]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${GRENIER_INFO.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#2D5A43] text-white hover:bg-[#204231] shadow-xs transition"
              title="Appeler la recyclerie"
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
              className="p-2 rounded-lg text-[#4A3E31] hover:bg-[#EAE2D5] focus:outline-none cursor-pointer"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD1] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-2">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl text-left font-medium transition ${
                    isActive
                      ? 'bg-[#2D5A43] text-white'
                      : 'text-[#4A3E31] hover:bg-[#EAE2D5]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#A3C9A8]' : 'text-[#7A6C5E]'}`} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
