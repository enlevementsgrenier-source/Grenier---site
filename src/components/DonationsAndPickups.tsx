import React from 'react';
import { Package, Truck, CheckCircle2, Phone, Mail } from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';

export const DonationsAndPickups: React.FC = () => {
  return (
    <section id="donner" className="py-14 sm:py-20 bg-white border-b border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#244F39] text-xs font-semibold uppercase tracking-wider mb-3">
            <Package className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>Donner ses objets</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3024] tracking-tight">
            Deux façons simples de donner
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5A5045]">
            Vos dons permettent de faire vivre la ressourcerie, d'alimenter la boutique solidaire et de financer l'emploi solidaire local.
          </p>
        </div>

        {/* 2 Ways: Dépôt sur place vs Enlèvement à domicile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Method 1: Dépôt au Grenier */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#DECDBB] p-7 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center">
                <Package className="w-6 h-6 text-[#A3C9A8]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#796C5F]">Option 1</span>
              <h3 className="font-serif text-2xl font-bold text-[#1F3D2E]">
                Dépôt direct sur place
              </h3>
              <p className="text-sm text-[#5C5044] leading-relaxed">
                Apportez directement vos objets réutilisables au Grenier de Mézos pendant les heures d'ouverture.
              </p>

              <ul className="space-y-2.5 pt-2 text-sm text-[#443A30]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                  <span><strong>Accès facile en voiture</strong> avec zone de déchargement.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                  <span><strong>Aide au déchargement</strong> par notre équipe de valoristes bienveillants.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                  <span><strong>Sans rendez-vous</strong> selon nos horaires d'ouverture.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EADECE]">
              <a
                href="#infos-pratiques"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D5A43] hover:text-[#1B3829]"
              >
                <span>Consulter les horaires d'ouverture</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Method 2: Enlèvement à domicile */}
          <div id="enlevements" className="bg-[#F2F7F4] rounded-2xl border border-[#BCD9C7] p-7 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#244E38] text-white flex items-center justify-center">
                <Truck className="w-6 h-6 text-[#A3C9A8]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#35674C]">Option 2</span>
              <h3 className="font-serif text-2xl font-bold text-[#173826]">
                Enlèvement d'encombrants à domicile
              </h3>
              <p className="text-sm text-[#35483D] leading-relaxed">
                Vous manquez de véhicule adapté ou avez des meubles lourds ? Notre équipe se déplace chez vous sur rendez-vous dans le Pays de Born.
              </p>

              <ul className="space-y-2.5 pt-2 text-sm text-[#2D4537]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                  <span>Idéal pour les successions, déménagements ou meubles volumineux.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                  <span>Prise de rendez-vous rapide par téléphone ou email dédié.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                  <span>Zone d'intervention : Mézos, Mimizan, Lit-et-Mixe, Castets et alentours.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C7DFD0] flex flex-wrap items-center gap-3">
              <a
                href={`tel:${GRENIER_INFO.contact.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2D5A43] text-white font-semibold text-xs hover:bg-[#204231] transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Appeler le {GRENIER_INFO.contact.phone}</span>
              </a>

              <a
                href={`mailto:${GRENIER_INFO.contact.emailEnlevements}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white text-[#244E38] border border-[#B0D1BC] font-semibold text-xs hover:bg-[#E9F3EC] transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{GRENIER_INFO.contact.emailEnlevements}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
