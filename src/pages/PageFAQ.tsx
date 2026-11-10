import React from 'react';
import { HelpCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { FAQ } from '../components/FAQ';
import { GRENIER_INFO } from '../data/grenierData';

interface PageFAQProps {
  onNavigateHome?: () => void;
}

export const PageFAQ: React.FC<PageFAQProps> = ({ onNavigateHome }) => {
  return (
    <div>
      {/* Header Banner Page FAQ */}
      <section className="bg-[#244634] text-white py-12 sm:py-16 border-b border-[#1C3627]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A3C9A8] text-xs font-semibold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Centre d'Aide &amp; Réponses</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2]">
              Foire Aux Questions (FAQ)
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              Retrouvez ici toutes les réponses pratiques sur le fonctionnement de la recyclerie, les dépôts de dons, les enlèvements à domicile, la boutique solidaire et les modes de règlement.
            </p>
          </div>
        </div>
      </section>

      {/* Accordéon FAQ complet */}
      <FAQ />

      {/* Bloc contact d'aide complémentaire */}
      <section className="py-12 bg-white border-b border-[#E8DEC7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#1F3D2E]">
            Vous ne trouvez pas la réponse à votre question ?
          </h3>
          <p className="text-sm text-[#5C5044] max-w-lg mx-auto">
            Notre équipe se tient à votre entière disposition par téléphone pendant nos créneaux d'ouverture ou par courrier électronique.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${GRENIER_INFO.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2D5A43] text-white text-sm font-semibold hover:bg-[#204231] transition shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#A3C9A8]" />
              <span>Appeler le {GRENIER_INFO.contact.phone}</span>
            </a>

            <a
              href={`mailto:${GRENIER_INFO.contact.emailContact}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F2] border border-[#DECDBB] text-[#2D5A43] text-sm font-semibold hover:bg-[#F0EAE0] transition"
            >
              <Mail className="w-4 h-4" />
              <span>Écrire à {GRENIER_INFO.contact.emailContact}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
