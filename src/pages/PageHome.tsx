import React from 'react';
import { Hero } from '../components/Hero';
import { PracticalInfo } from '../components/PracticalInfo';
import { PhotoCarousel } from '../components/PhotoCarousel';
import { Package, HeartHandshake, HelpCircle, ArrowRight } from 'lucide-react';

interface PageHomeProps {
  onNavigate: (page: 'home' | 'dons' | 'mission' | 'faq' | 'mentions-legales') => void;
}

export const PageHome: React.FC<PageHomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      {/* Hero Section avec coordonnées vérifiées, contact direct & présentation */}
      <Hero />

      {/* Horaires d'ouverture détaillés & Carte interactive */}
      <PracticalInfo />

      {/* Galerie photos du bric-à-brac */}
      <PhotoCarousel />

      {/* Raccourcis vers les autres pages */}
      <section className="py-14 sm:py-18 bg-[#FAF7F2] border-b border-[#E8DEC7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3024]">
              Accéder aux différentes rubriques
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#685A4C]">
              Retrouvez toutes les informations détaillées pour donner, comprendre notre engagement solidaire ou trouver réponse à vos questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Dons */}
            <div className="bg-white rounded-2xl border border-[#DECDBB] p-7 flex flex-col justify-between shadow-xs hover:border-[#2D5A43] hover:shadow-md transition group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#E8EFEA] text-[#2D5A43] flex items-center justify-center group-hover:bg-[#2D5A43] group-hover:text-white transition">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F3D2E]">
                  Page Dons
                </h3>
                <p className="text-sm text-[#5C5044] leading-relaxed">
                  Découvrez les 3 façons simples de donner vos objets : sur place au Grenier, enlèvement d'encombrants à domicile, ou dans nos 3 containers en déchetterie.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#F0E6D8]">
                <button
                  onClick={() => onNavigate('dons')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D5A43] group-hover:text-[#1B3829]"
                >
                  <span>Voir les 3 options de dons</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 2: Mission */}
            <div className="bg-white rounded-2xl border border-[#DECDBB] p-7 flex flex-col justify-between shadow-xs hover:border-[#2D5A43] hover:shadow-md transition group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#E8EFEA] text-[#2D5A43] flex items-center justify-center group-hover:bg-[#2D5A43] group-hover:text-white transition">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F3D2E]">
                  Notre Mission &amp; Impact
                </h3>
                <p className="text-sm text-[#5C5044] leading-relaxed">
                  Une recyclerie autonome sans subvention publique, des emplois en CDI, des prix accessibles à tous et des centaines de tonnes réemployées chaque année dans les Landes.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#F0E6D8]">
                <button
                  onClick={() => onNavigate('mission')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D5A43] group-hover:text-[#1B3829]"
                >
                  <span>Découvrir notre démarche</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 3: FAQ */}
            <div className="bg-white rounded-2xl border border-[#DECDBB] p-7 flex flex-col justify-between shadow-xs hover:border-[#2D5A43] hover:shadow-md transition group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#E8EFEA] text-[#2D5A43] flex items-center justify-center group-hover:bg-[#2D5A43] group-hover:text-white transition">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F3D2E]">
                  Questions Fréquentes
                </h3>
                <p className="text-sm text-[#5C5044] leading-relaxed">
                  Comment donner ? Faut-il trier avant de venir ? Quels sont les moyens de paiement acceptés en boutique ? Toutes les réponses en un clic.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#F0E6D8]">
                <button
                  onClick={() => onNavigate('faq')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D5A43] group-hover:text-[#1B3829]"
                >
                  <span>Consulter la FAQ</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
