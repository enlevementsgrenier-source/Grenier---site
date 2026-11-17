import React, { useState } from 'react';
import { ArrowRight, Users } from 'lucide-react';
import volunteersPhoto from '../assets/images/benevoles_recyclerie_1794934664760.jpg';

interface VolunteerCalloutProps {
  onNavigateToVolunteer: () => void;
}

export const VolunteerCallout: React.FC<VolunteerCalloutProps> = ({ onNavigateToVolunteer }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="devenir-benevole"
      aria-labelledby="volunteer-callout-heading"
      className="py-12 sm:py-16 bg-white border-b border-[#E8DEC7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#214130] text-white border border-[#183124] shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Colonne texte concise */}
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A3C9A8]">
                Bénévolat
              </p>

              <h2
                id="volunteer-callout-heading"
                className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2] tracking-tight text-balance"
              >
                Rejoignez les bénévoles du Grenier !
              </h2>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
                Quelques heures feront toute la différence. Nous avons besoin d&apos;aide sur tout type de tâche, n&apos;hésitez pas à nous contacter.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateToVolunteer}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FAF7F2] text-[#172E22] font-semibold text-sm sm:text-base hover:bg-[#EAE2D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3C9A8] transition cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>C&apos;est par ici</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Colonne photo bénévoles */}
            <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full bg-[#183325]">
              {!imageError ? (
                <img
                  src={volunteersPhoto}
                  alt="Bénévoles dans une recyclerie triant livres, vaisselle et objets de brocante"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full lg:absolute lg:inset-0 object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#214130] to-[#172E22] text-[#A3C9A8] gap-3">
                  <Users className="w-10 h-10" />
                  <span className="text-sm font-medium text-[#FAF7F2]">
                    Les bénévoles du Grenier de Mézos
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
