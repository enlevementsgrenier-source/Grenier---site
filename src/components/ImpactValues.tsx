import React from 'react';
import { TreePine, Recycle, Users, HeartHandshake, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export const ImpactValues: React.FC = () => {
  return (
    <div>
      {/* 1. Les 3 piliers d'impact (Design identique à la section des 3 options de dons) */}
      <section id="valeurs" className="py-14 sm:py-20 bg-white border-b border-[#E8DEC7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#244F39] text-xs font-semibold uppercase tracking-wider mb-3">
              <TreePine className="w-3.5 h-3.5 text-[#2D5A43]" />
              <span>Économie Circulaire &amp; Sociale</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3024] tracking-tight">
              L'impact du Grenier de Mézos dans les Landes
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#5A5045]">
              Une démarche citoyenne et territoriale engagée pour préserver l'environnement naturel de notre région et tisser du lien humain au quotidien.
            </p>
          </div>

          {/* 3 Piliers (Même disposition en 3 cartes que les 3 options de dons) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Pilier 1: Réemploi & Écologie */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#DECDBB] p-7 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-[#A3C9A8]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#796C5F]">Pilier 1</span>
                <h3 className="font-serif text-2xl font-bold text-[#1F3D2E]">
                  Réemploi &amp; Écologie
                </h3>
                <p className="text-sm text-[#5C5044] leading-relaxed">
                  En prolongeant la durée de vie des meubles, appareils et vêtements, nous évitons l'enfouissement de centaines de tonnes de déchets et réduisons l'empreinte carbone du Pays de Born.
                </p>

                <ul className="space-y-2.5 pt-2 text-sm text-[#443A30]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span><strong>Préservation de l'environnement :</strong> Évitement de l'enfouissement de centaines de tonnes de matière chaque année.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span><strong>Tri minutieux &amp; valorisation :</strong> Chaque objet reçu est contrôlé, nettoyé et remis en état de marche.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span><strong>Économie circulaire :</strong> Rien ne se perd, tout ce qui peut être réutilisé retrouve un foyer.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EADECE]">
                <span className="text-xs font-semibold text-[#2D5A43] uppercase tracking-wide">
                  🌱 Écologie citoyenne dans les Landes
                </span>
              </div>
            </div>

            {/* Pilier 2: Solidarité & Pouvoir d'Achat */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#DECDBB] p-7 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#A3C9A8]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#796C5F]">Pilier 2</span>
                <h3 className="font-serif text-2xl font-bold text-[#1F3D2E]">
                  Solidarité &amp; Pouvoir d'Achat
                </h3>
                <p className="text-sm text-[#5C5044] leading-relaxed">
                  Permettre à chacun — familles, jeunes, saisonniers, retraités — de s'équiper dignement à des prix justes et symboliques, loin des logiques spéculatives, ouvert à tous.
                </p>

                <ul className="space-y-2.5 pt-2 text-sm text-[#443A30]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span><strong>Ouvert à tous sans exception :</strong> Aucun justificatif ni condition de ressource pour venir acheter.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span><strong>Tarifs très doux :</strong> Équipement de la maison, vaisselle, mobilier et vêtements à prix symboliques.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span><strong>Lieu de vie &amp; rencontre :</strong> Un espace chaleureux qui favorise la convivialité et la mixité sociale.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EADECE]">
                <span className="text-xs font-semibold text-[#2D5A43] uppercase tracking-wide">
                  🤝 Pour tous les foyers &bull; Ouvert à tous
                </span>
              </div>
            </div>

            {/* Pilier 3: Emploi & Dynamique Locale */}
            <div className="bg-[#F2F7F4] rounded-2xl border border-[#BCD9C7] p-7 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#244E38] text-white flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-[#A3C9A8]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#35674C]">Pilier 3</span>
                <h3 className="font-serif text-2xl font-bold text-[#173826]">
                  Emploi &amp; Dynamique Locale
                </h3>
                <p className="text-sm text-[#35483D] leading-relaxed">
                  Un ancrage local fort à Mézos qui valorise le savoir-faire manuel (tri, logistique).
                </p>

                <div className="p-3.5 bg-white rounded-xl border border-[#C7DFD0] text-xs text-[#2D4537] leading-relaxed space-y-2">
                  <div className="font-semibold text-[#1F3D2E] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
                    <span>Modèle 100% Autonome &amp; Pérenne</span>
                  </div>
                  <p>
                    Le Grenier ne reçoit aucune subvention de quelque agence que ce soit pour son fonctionnement. C'est un choix délibéré qui garantit son indépendance et sa pérennité. L'association n'a pas le statut de Chantier d'insertion (cela nous est souvent demandé) pour cette raison. Tous les salariés sont en CDI, sauf les quelques uns qui nous rejoignent pour un renfort l'été.
                  </p>
                </div>

                <ul className="space-y-2.5 pt-1 text-sm text-[#2D4537]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span><strong>Emplois locaux en CDI :</strong> Sécurité professionnelle et contrats durables.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span><strong>0 € de subvention :</strong> Autofinancement complet grâce aux ventes des dons.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#C7DFD0]">
                <span className="text-xs font-semibold text-[#244E38] uppercase tracking-wide">
                  🏛️ Indépendance garantie &bull; 100% CDI
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Chiffres clés de l'impact (Même design lumineux avec bordures douces) */}
      <section className="py-14 sm:py-18 bg-[#FAF7F2] border-b border-[#E8DEC7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3D2E]">
              Le Grenier de Mézos en quelques chiffres
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#685A4C]">
              La preuve concrète d'une économie solidaire qui fonctionne au cœur des Landes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl border border-[#DECDBB] p-6 text-center shadow-xs">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2D5A43]">
                100%
              </div>
              <div className="text-xs uppercase font-bold text-[#685A4C] mt-2">
                Associatif &amp; Indépendant
              </div>
              <p className="text-[11px] text-[#7C6E61] mt-1">
                Aucune subvention publique d'exploitation
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#DECDBB] p-6 text-center shadow-xs">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2D5A43]">
                250 T
              </div>
              <div className="text-xs uppercase font-bold text-[#685A4C] mt-2">
                Tonnes réemployées / an
              </div>
              <p className="text-[11px] text-[#7C6E61] mt-1">
                Détournées de l'enfouissement dans le Born
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#DECDBB] p-6 text-center shadow-xs">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2D5A43]">
                100%
              </div>
              <div className="text-xs uppercase font-bold text-[#685A4C] mt-2">
                Salariés en CDI
              </div>
              <p className="text-[11px] text-[#7C6E61] mt-1">
                Hors renforts saisonniers estivaux
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#DECDBB] p-6 text-center shadow-xs">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2D5A43]">
                + de 5 000
              </div>
              <div className="text-xs uppercase font-bold text-[#685A4C] mt-2">
                Adhérents actifs
              </div>
              <p className="text-[11px] text-[#7C6E61] mt-1">
                Une communauté engagée et solidaire
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
