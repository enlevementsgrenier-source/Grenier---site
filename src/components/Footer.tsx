import React from 'react';
import { Phone, MapPin, Mail, ArrowUp, Heart } from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#172E22] text-[#E7E2D8] border-t border-[#294B39]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          
          {/* Brand & mission */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="inline-block py-1">
              <Logo className="h-16 sm:h-20 w-auto" variant="light" />
            </a>

            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              Association loi 1901 engagée pour le réemploi citoyen, la réduction des déchets et la solidarité au cœur du Pays de Born et des Landes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider text-xs">
              Navigation rapide
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#infos-pratiques" className="hover:text-white transition">
                  Horaires d'ouverture
                </a>
              </li>
              <li>
                <a href="#infos-pratiques" className="hover:text-white transition">
                  Accès &amp; Google Maps
                </a>
              </li>
              <li>
                <a href="#donner" className="hover:text-white transition">
                  Déposer un don
                </a>
              </li>
              <li>
                <a href="#enlevements" className="hover:text-white transition">
                  Demande d'enlèvement
                </a>
              </li>
              <li>
                <a href="#valeurs" className="hover:text-white transition">
                  Notre Mission &amp; Impact
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  Questions fréquentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Verified */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider text-xs">
              Coordonnées
            </h4>

            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A3C9A8] shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white">Le Grenier de Mézos</div>
                  <div>{GRENIER_INFO.address.street}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#A3C9A8] shrink-0" />
                <a
                  href={`tel:${GRENIER_INFO.contact.phoneRaw}`}
                  className="font-bold text-white hover:text-[#A3C9A8] transition"
                >
                  {GRENIER_INFO.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#A3C9A8] shrink-0" />
                <a
                  href={`mailto:${GRENIER_INFO.contact.emailContact}`}
                  className="text-xs hover:text-white transition underline font-medium"
                >
                  @: {GRENIER_INFO.contact.emailContact}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#A3C9A8] shrink-0" />
                <a
                  href={`mailto:${GRENIER_INFO.contact.emailEnlevements}`}
                  className="text-xs hover:text-white transition underline"
                >
                  Enlèvements : {GRENIER_INFO.contact.emailEnlevements}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={GRENIER_INFO.maps.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#A3C9A8] hover:text-white underline inline-flex items-center gap-1"
              >
                <span>Fiche Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Le Grenier de Mézos. Tous droits réservés.
          </div>

          <div className="flex items-center gap-1">
            <span>Créé pour le réemploi &amp; la solidarité dans les Landes</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
