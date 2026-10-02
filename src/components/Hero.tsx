import React, { useState } from 'react';
import { Phone, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2, Copy, Check, Truck, Package } from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';
import { getCurrentScheduleStatus } from '../utils/schedule';

export const Hero: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const status = getCurrentScheduleStatus();

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(GRENIER_INFO.contact.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(GRENIER_INFO.address.full);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2200);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8DFD1]">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#E5ECE7] filter blur-3xl opacity-70 -z-10" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#F3E8D8] filter blur-3xl opacity-70 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline and presentation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8EFEA] border border-[#C5D8CC] text-[#234634] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#2D5A43]" />
              <span>Ressourcerie &amp; Recyclerie solidaire • Pays de Born</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3024] tracking-tight leading-[1.12]">
              Donnez une seconde vie à vos objets au{' '}
              <span className="text-[#2D5A43] underline decoration-[#A3C9A8] decoration-wavy decoration-2">
                Grenier de Mézos
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#5A4F44] leading-relaxed max-w-2xl font-normal">
              Association de réemploi solidaire à Mézos dans les Landes. Nous collectons vos dons, proposons un service d'enlèvement d'encombrants et redonnons une valeur utile à des milliers d’objets dans notre boutique accessible à tous.
            </p>

            {/* Quick highlight points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-[#3E342B] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
                <span>Dépôts gratuits &amp; tri solidaire</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#3E342B] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
                <span>Enlèvements à domicile</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#3E342B] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0" />
                <span>Boutique solidaire ouverte à tous</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#infos-pratiques"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2D5A43] text-white font-semibold text-base shadow-sm hover:bg-[#214332] active:scale-[0.98] transition"
              >
                <span>Voir les horaires &amp; l'accès</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#enlevements"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#D5C9B8] text-[#30271E] font-semibold text-base shadow-xs hover:bg-[#F5EFE6] active:scale-[0.98] transition"
              >
                <Truck className="w-4 h-4 text-[#2D5A43]" />
                <span>Demander un enlèvement</span>
              </a>

              <a
                href={`tel:${GRENIER_INFO.contact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#F0E8DC] text-[#2D5A43] font-semibold text-base hover:bg-[#E4DACB] active:scale-[0.98] transition sm:hidden"
              >
                <Phone className="w-4 h-4" />
                <span>Appeler : {GRENIER_INFO.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Info Card with Phone, Address, Status */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#DECDBB] shadow-md p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="border-b border-[#EFE7DC] pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#796D5E]">
                    Coordonnées officielles
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E7F3EB] text-[#23603A]">
                    <span className="w-2 h-2 rounded-full bg-[#3BB167] animate-pulse" />
                    <span>Vérifié Google Maps</span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1E3024] mt-1">
                  Le Grenier de Mézos
                </h3>
              </div>

              {/* Verified Phone */}
              <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#E8DEC7] flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2D5A43] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#A3C9A8]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-[#736657]">
                      Numéro de téléphone
                    </div>
                    <a
                      href={`tel:${GRENIER_INFO.contact.phoneRaw}`}
                      className="text-xl sm:text-2xl font-bold text-[#1F3D2E] hover:text-[#2D5A43] transition tracking-wide block"
                    >
                      {GRENIER_INFO.contact.phone}
                    </a>
                    <p className="text-xs text-[#7A6E60] mt-0.5">
                      Accueil téléphonique pendant les horaires d'ouverture
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg text-[#554A3D] hover:bg-[#EAE2D3] active:bg-[#DFD5C4] transition shrink-0"
                  title="Copier le numéro de téléphone"
                  aria-label="Copier le numéro"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Verified Address */}
              <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#E8DEC7] flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2D5A43] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#A3C9A8]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-[#736657]">
                      Adresse postale &amp; Dépôt
                    </div>
                    <div className="font-semibold text-base text-[#1F3D2E] leading-snug">
                      {GRENIER_INFO.address.street}
                    </div>
                    <div className="text-sm font-medium text-[#463D33]">
                      {GRENIER_INFO.address.postalCode} {GRENIER_INFO.address.city} ({GRENIER_INFO.address.department})
                    </div>
                    <p className="text-xs text-[#7A6E60] mt-1">
                      {GRENIER_INFO.address.accessDetails}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="p-2 rounded-lg text-[#554A3D] hover:bg-[#EAE2D3] active:bg-[#DFD5C4] transition shrink-0"
                  title="Copier l'adresse"
                  aria-label="Copier l'adresse"
                >
                  {copiedAddress ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Live Hours Status */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7DFD4] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#2D5A43]" />
                  <div>
                    <div className="text-xs text-[#786C5E] font-medium">
                      Statut aujourd'hui ({status.currentDayName})
                    </div>
                    <div className="text-sm font-bold text-[#1F3D2E]">
                      {status.statusLabel} • <span className="font-normal text-[#5A4F44]">{status.detailLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* External Navigation Links */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href={GRENIER_INFO.maps.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#204231] transition text-center"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={GRENIER_INFO.maps.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-[#D1C3B2] text-[#342D25] hover:bg-[#F3EFE9] text-xs font-semibold transition text-center"
                >
                  <span>Ouvrir sur Waze</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
