import React from 'react';
import { Package, Truck, Archive, Heart, CheckCircle2, Phone, Mail } from 'lucide-react';
import { DonationsAndPickups } from '../components/DonationsAndPickups';
import { AcceptedItemsGuide } from '../components/AcceptedItemsGuide';
import { GRENIER_INFO } from '../data/grenierData';

interface PageDonsProps {
  onNavigateHome?: () => void;
}

export const PageDons: React.FC<PageDonsProps> = ({ onNavigateHome }) => {
  return (
    <div>
      {/* Header Banner Page Dons */}
      <section className="bg-[#214130] text-white py-12 sm:py-16 border-b border-[#183124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A3C9A8] text-xs font-semibold uppercase tracking-wider mb-4">
              <Package className="w-3.5 h-3.5" />
              <span>Espace Donateurs</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2]">
              Faire un don au Grenier de Mézos
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              Donner vos meubles, vêtements, vaisselle ou objets du quotidien permet d'éviter leur enfouissement, de soutenir des emplois pérennes en CDI et de proposer des équipements à prix solidaires pour tous.
            </p>
          </div>
        </div>
      </section>

      {/* Les 3 options simples pour donner */}
      <DonationsAndPickups />

      {/* Guide des objets acceptés et refusés avec recherche interactive */}
      <AcceptedItemsGuide />

      {/* Bandeau d'assistance donateurs */}
      <section className="py-12 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EBF2EE] border border-[#BCD9C7] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-serif text-xl font-bold text-[#1F3D2E]">
                Vous hésitez sur la reprise d'un objet ou un volume important ?
              </h3>
              <p className="text-sm text-[#4E4338]">
                Notre équipe est à votre écoute par téléphone ou par email pour évaluer votre don et programmer un enlèvement si nécessaire.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={`tel:${GRENIER_INFO.contact.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D5A43] text-white text-xs sm:text-sm font-semibold hover:bg-[#204231] transition shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>{GRENIER_INFO.contact.phone}</span>
              </a>

              <a
                href={`mailto:${GRENIER_INFO.contact.emailEnlevements}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#244E38] border border-[#B0D1BC] text-xs sm:text-sm font-semibold hover:bg-[#FAF7F2] transition"
              >
                <Mail className="w-4 h-4" />
                <span>{GRENIER_INFO.contact.emailEnlevements}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
