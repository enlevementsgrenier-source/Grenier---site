import React from 'react';
import { TreePine, Package, Calendar, ArrowRight, HeartHandshake } from 'lucide-react';
import { ImpactValues } from '../components/ImpactValues';
import { ShopShowcase } from '../components/ShopShowcase';

interface PageMissionProps {
  onNavigate?: (page: 'home' | 'dons' | 'mission' | 'faq' | 'mentions-legales') => void;
}

export const PageMission: React.FC<PageMissionProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Header Banner Page Mission (Identique au header de la page Dons) */}
      <section className="bg-[#214130] text-white py-12 sm:py-16 border-b border-[#183124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A3C9A8] text-xs font-semibold uppercase tracking-wider mb-4">
              <TreePine className="w-3.5 h-3.5" />
              <span>Engagement Associatif &amp; Citoyen</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2]">
              Notre Mission &amp; Notre Impact
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              Le Grenier de Mézos est une recyclerie solidaire et indépendante qui œuvre pour un territoire plus durable dans les Landes, la réduction des déchets, le lien social et l'accès d'équipements pour tous à prix modiques.
            </p>
          </div>
        </div>
      </section>

      {/* Les 3 Piliers d'Impact & Chiffres clés (Design en 3 cartes identiques aux 3 options de dons) */}
      <ImpactValues />

      {/* La Boutique Solidaire & Rayons */}
      <ShopShowcase />

      {/* Bandeau d'action en bas de page (Même design que le bandeau d'assistance de la page Dons) */}
      <section className="py-12 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EBF2EE] border border-[#BCD9C7] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-serif text-xl font-bold text-[#1F3D2E]">
                Envie de soutenir notre démarche solidaire ?
              </h3>
              <p className="text-sm text-[#4E4338]">
                Vous pouvez agir concrètement en donnant vos objets réutilisables ou en venant chiner au magasin à Mézos.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              {onNavigate && (
                <>
                  <button
                    onClick={() => onNavigate('dons')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D5A43] text-white text-xs sm:text-sm font-semibold hover:bg-[#204231] transition shadow-xs cursor-pointer"
                  >
                    <Package className="w-4 h-4" />
                    <span>Faire un don (3 options)</span>
                  </button>

                  <button
                    onClick={() => onNavigate('home')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#244E38] border border-[#B0D1BC] text-xs sm:text-sm font-semibold hover:bg-[#FAF7F2] transition cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Consulter les horaires</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
