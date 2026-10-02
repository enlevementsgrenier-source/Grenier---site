import React from 'react';
import { Leaf, Users, HeartHandshake, Recycle, ShieldCheck, TreePine } from 'lucide-react';

export const ImpactValues: React.FC = () => {
  return (
    <section id="valeurs" className="py-16 sm:py-24 bg-[#234634] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A3C9A8] text-xs font-semibold uppercase tracking-wider mb-3">
            <TreePine className="w-3.5 h-3.5" />
            <span>Économie Circulaire &amp; Sociale</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F2]">
            L'impact du Grenier de Mézos dans les Landes
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/80">
            Une démarche citoyenne et territoriale engagée pour préserver l'environnement naturel de notre région et tisser du lien humain.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-4 hover:bg-white/10 transition">
            <div className="w-12 h-12 rounded-xl bg-[#A3C9A8]/20 text-[#A3C9A8] flex items-center justify-center">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Réemploi &amp; Écologie
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              En prolongeant la durée de vie des meubles, appareils et vêtements, nous évitons l'enfouissement de centaines de tonnes de déchets et réduisons l'empreinte carbone du Pays de Born.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-4 hover:bg-white/10 transition">
            <div className="w-12 h-12 rounded-xl bg-[#A3C9A8]/20 text-[#A3C9A8] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Solidarité &amp; Pouvoir d'Achat
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Permettre à chacun — familles, jeunes, saisonniers, retraités — de s'équiper dignement à des prix justes et symboliques, loin des logiques spéculatives.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-4 hover:bg-white/10 transition">
            <div className="w-12 h-12 rounded-xl bg-[#A3C9A8]/20 text-[#A3C9A8] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Emploi &amp; Dynamique Locale
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Un ancrage local fort à Mézos qui valorise le savoir-faire manuel (tri, petite réparation, logistique) et favorise l'insertion socioprofessionnelle dans notre territoire.
            </p>
          </div>
        </div>

        {/* Stats banner */}
        <div className="bg-[#1A3427] border border-white/10 rounded-2xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#A3C9A8]">100%</div>
            <div className="text-xs uppercase font-medium text-white/70 mt-1">Associatif &amp; Solidaire</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#A3C9A8]">250 T</div>
            <div className="text-xs uppercase font-medium text-white/70 mt-1">Tonnes triées / an</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#A3C9A8]">6 j / 7</div>
            <div className="text-xs uppercase font-medium text-white/70 mt-1">Activité au quotidien</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#A3C9A8]">+ de 5000</div>
            <div className="text-xs uppercase font-medium text-white/70 mt-1">Adhérents actifs</div>
          </div>
        </div>

      </div>
    </section>
  );
};
