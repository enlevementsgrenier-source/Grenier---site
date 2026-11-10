import React from 'react';
import { ShieldCheck, ArrowLeft, Building2, User, Server, FileText, Lock, Eye, Mail, Phone, MapPin } from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';

interface MentionsLegalesProps {
  onNavigateHome?: () => void;
}

export const MentionsLegales: React.FC<MentionsLegalesProps> = ({ onNavigateHome }) => {
  return (
    <div className="py-12 sm:py-16 bg-[#FAF7F2] min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation retour */}
        {onNavigateHome && (
          <div className="mb-8">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D5A43] hover:text-[#1B3829] transition group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Retour à l'accueil</span>
            </button>
          </div>
        )}

        {/* En-tête */}
        <div className="bg-white rounded-3xl border border-[#DECDBB] p-8 sm:p-12 shadow-xs mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#244F39] text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
            <span>Informations Juridiques &amp; Réglementaires</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F3D2E] tracking-tight">
            Mentions Légales
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#685A4C]">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN) et au Règlement Général sur la Protection des Données (RGPD).
          </p>
        </div>

        {/* Sections légales détaillées */}
        <div className="space-y-8">
          
          {/* 1. Éditeur du site */}
          <section className="bg-white rounded-2xl border border-[#DECDBB] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0E6D8] mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#A3C9A8]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F3D2E]">
                  1. Éditeur du site
                </h2>
                <p className="text-xs text-[#7A6C5E]">Identité de l'association gestionnaire</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#4E4236] leading-relaxed">
              <p>
                Le présent site internet est édité par l'<strong>Association Le Grenier</strong> (désignée sous le nom d'usage <em>Le Grenier de Mézos</em>).
              </p>
              <ul className="space-y-2 pt-2">
                <li className="flex items-start gap-2">
                  <span className="font-semibold w-40 text-[#1F3D2E] shrink-0">Forme juridique :</span>
                  <span>Association déclarée régie par la loi du 1er juillet 1901 à but non lucratif</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold w-40 text-[#1F3D2E] shrink-0">Dénomination :</span>
                  <span>{GRENIER_INFO.legalName} ({GRENIER_INFO.name})</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold w-40 text-[#1F3D2E] shrink-0">Numéro SIRET :</span>
                  <span className="font-mono text-[#1F3D2E] font-medium tracking-wide">443 118 195 00041</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold w-40 text-[#1F3D2E] shrink-0">Siège social :</span>
                  <span>{GRENIER_INFO.address.street}, {GRENIER_INFO.address.postalCode} {GRENIER_INFO.address.city} ({GRENIER_INFO.address.department})</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold w-40 text-[#1F3D2E] shrink-0">Téléphone :</span>
                  <a href={`tel:${GRENIER_INFO.contact.phoneRaw}`} className="text-[#2D5A43] hover:underline font-semibold">
                    {GRENIER_INFO.contact.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold w-40 text-[#1F3D2E] shrink-0">Courriel général :</span>
                  <a href={`mailto:${GRENIER_INFO.contact.emailContact}`} className="text-[#2D5A43] hover:underline">
                    {GRENIER_INFO.contact.emailContact}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold w-40 text-[#1F3D2E] shrink-0">Courriel enlèvements :</span>
                  <a href={`mailto:${GRENIER_INFO.contact.emailEnlevements}`} className="text-[#2D5A43] hover:underline">
                    {GRENIER_INFO.contact.emailEnlevements}
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* 2. Direction de la publication & Modèle d'activité */}
          <section className="bg-white rounded-2xl border border-[#DECDBB] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0E6D8] mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-[#A3C9A8]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F3D2E]">
                  2. Direction de la publication &amp; Objet associatif
                </h2>
                <p className="text-xs text-[#7A6C5E]">Gouvernance et autonomie</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#4E4236] leading-relaxed">
              <p>
                <strong>Directeur de la publication :</strong> Le Président / Représentant légal de l'Association Le Grenier.
              </p>
              <p>
                <strong>Objet associatif :</strong> Recyclerie et ressourcerie solidaire citoyenne engagée pour le réemploi des objets du quotidien, la réduction de l'enfouissement des déchets dans les Landes et l'accès à un pouvoir d'achat solidaire ouvert à tous.
              </p>
              <div className="p-4 bg-[#F5EFE6] rounded-xl border border-[#E5DAC8] text-xs sm:text-sm text-[#3E3429]">
                <strong>Précision sur le fonctionnement autonome :</strong> Le Grenier ne reçoit aucune subvention de quelque agence que ce soit pour son fonctionnement. C'est un choix délibéré qui garantit son indépendance et sa pérennité. L'association n'a pas le statut de Chantier d'insertion pour cette raison. Tous les salariés sont en CDI, sauf les quelques renforts saisonniers durant la période estivale.
              </div>
            </div>
          </section>

          {/* 3. Hébergement du site */}
          <section className="bg-white rounded-2xl border border-[#DECDBB] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0E6D8] mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center shrink-0">
                <Server className="w-5 h-5 text-[#A3C9A8]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F3D2E]">
                  3. Hébergement
                </h2>
                <p className="text-xs text-[#7A6C5E]">Infrastructures serveurs</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-[#4E4236] leading-relaxed">
              <p>
                Le site est hébergé sur les infrastructures sécurisées de <strong>GitHub Inc.</strong>
              </p>
              <p className="text-xs text-[#7A6C5E]">
                Adresse : GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis &bull; Site web : https://github.com
              </p>
            </div>
          </section>

          {/* 4. Propriété intellectuelle */}
          <section className="bg-white rounded-2xl border border-[#DECDBB] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0E6D8] mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#A3C9A8]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F3D2E]">
                  4. Propriété intellectuelle
                </h2>
                <p className="text-xs text-[#7A6C5E]">Droits d'auteur et contenus</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#4E4236] leading-relaxed">
              <p>
                L'ensemble des contenus présents sur ce site (textes, visuels, logos, éléments graphiques) est protégé par le droit d'auteur et reste la propriété exclusive du Grenier de Mézos. Toute reproduction, représentation ou diffusion, en tout ou partie, sans accord écrit préalable est interdite.
              </p>
            </div>
          </section>

          {/* 5. Données personnelles (RGPD) */}
          <section className="bg-white rounded-2xl border border-[#DECDBB] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0E6D8] mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-[#A3C9A8]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F3D2E]">
                  5. Protection des données personnelles (RGPD)
                </h2>
                <p className="text-xs text-[#7A6C5E]">Respect de votre vie privée</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#4E4236] leading-relaxed">
              <p>
                L'Association Le Grenier s'engage à ce que la collecte et le traitement de vos données soient conformes à la loi n° 78-17 du 6 janvier 1978 modifiée (« Informatique et Libertés ») et au Règlement Général sur la Protection des Données (RGPD 2016/679).
              </p>
              <p>
                <strong>Finalités des données collectées :</strong> Les coordonnées (numéro de téléphone, adresse postale, adresse email) collectées par téléphone ou email lors d'une demande de don ou d'enlèvement d'encombrants à domicile sont uniquement utilisées pour l'organisation logistique et le contact opérationnel de nos chauffeurs et bénévoles.
              </p>
              <p>
                <strong>Non-cession des données :</strong> Vos données ne sont en aucun cas vendues, cédées, louées ou communiquées à des tiers à des fins publicitaires ou commerciales.
              </p>
              <p>
                <strong>Exercice de vos droits :</strong> Vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression des données qui vous concernent. Pour exercer ce droit, adressez un message à :{' '}
                <a href={`mailto:${GRENIER_INFO.contact.emailEnlevements}`} className="text-[#2D5A43] font-semibold underline">
                  {GRENIER_INFO.contact.emailEnlevements}
                </a>{' '}
                ou par courrier postal à l'adresse du siège social à Mézos.
              </p>
            </div>
          </section>

          {/* 6. Cookies et Mesure d'audience */}
          <section className="bg-white rounded-2xl border border-[#DECDBB] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0E6D8] mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-[#A3C9A8]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F3D2E]">
                  6. Mesure d'audience &amp; Cookies
                </h2>
                <p className="text-xs text-[#7A6C5E]">Statistiques de fréquentation</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#4E4236] leading-relaxed">
              <p>
                Ce site utilise la balise Google Tag Manager / Google Analytics (<code>GTM-MQTM49B4</code>) afin de recueillir des données statistiques anonymisées de fréquentation (nombre de visiteurs, pages les plus consultées, horaires de forte consultation).
              </p>
              <p>
                Ces informations ont pour seul but d'adapter le site aux besoins des usagers et de faciliter l'accès aux informations pratiques (horaires, dépôt de dons, carte d'accès). Vous pouvez configurer votre navigateur pour refuser ou désactiver ces traceurs à tout moment.
              </p>
            </div>
          </section>

          {/* Bouton retour bas de page */}
          {onNavigateHome && (
            <div className="text-center pt-6 pb-4">
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D5A43] text-white font-semibold text-sm hover:bg-[#204231] transition shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retourner à l'accueil du site</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
