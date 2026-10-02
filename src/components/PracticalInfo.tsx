import React, { useState } from 'react';
import { MapPin, Calendar, Check, Copy, Car, ExternalLink } from 'lucide-react';
import { GRENIER_INFO, OPENING_HOURS } from '../data/grenierData';
import { getCurrentScheduleStatus } from '../utils/schedule';

export const PracticalInfo: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const status = getCurrentScheduleStatus();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(GRENIER_INFO.address.full);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="infos-pratiques" className="py-12 sm:py-16 bg-[#F4EFE6]/60 border-b border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Columns grid: Left = Hours Table / Right = Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours Table */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-[#DECDBB] shadow-xs p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 border-b border-[#EDE3D6]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#2D5A43] text-white flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#A3C9A8]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1F3D2E]">
                      Horaires d'ouverture
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    status.isOpenNow ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${status.isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    <span>{status.statusLabel}</span>
                  </span>
                </div>
              </div>

              {/* Schedule list */}
              <div className="divide-y divide-[#F1E8DC] mt-2">
                {OPENING_HOURS.map((slot) => {
                  const isToday = slot.dayIndex === status.currentDayIndex;
                  return (
                    <div
                      key={slot.day}
                      className={`py-3 px-2.5 rounded-lg flex items-center justify-between text-sm transition ${
                        isToday
                          ? 'bg-[#F2F7F4] border border-[#CDE3D4] font-medium'
                          : 'hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-24 ${isToday ? 'font-bold text-[#1F3D2E]' : 'text-[#443B32]'}`}>
                          {slot.day}
                        </span>
                        {isToday && (
                          <span className="text-[11px] font-semibold text-[#2D5A43] bg-[#E1EEE5] px-2 py-0.5 rounded">
                            Aujourd'hui
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        {slot.isOpen ? (
                          <div className="space-y-0.5">
                            <span className="text-[#1F3D2E] font-medium">
                              {slot.morning ? `${slot.morning} & ` : ''}{slot.afternoon}
                            </span>
                            {slot.notes && (
                              <p className="text-[11px] text-[#786C5E] hidden sm:block">
                                {slot.notes}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-[#887B6E] italic text-xs">
                            Fermé au public (tri &amp; ateliers)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps & Practical Access */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-[#DECDBB] shadow-xs overflow-hidden">
              <div className="p-5 border-b border-[#EDE3D6] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1F3D2E]">
                    Carte &amp; Accès
                  </h3>
                  <p className="text-xs text-[#6B5F52]">
                    {GRENIER_INFO.address.full}
                  </p>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border border-[#DCD0C0] hover:bg-[#F5EFE6] text-[#4A3F33] transition"
                  title="Copier l'adresse complète"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? 'Copié !' : 'Copier l\'adresse'}</span>
                </button>
              </div>

              {/* Map embed Container */}
              <div className="relative w-full h-[320px] bg-[#E5ECE7]">
                <iframe
                  title="Carte Le Grenier de Mézos"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-1.1850%2C44.0680%2C-1.1500%2C44.0850&amp;layer=mapnik&amp;marker=44.0765%2C-1.1685"
                  className="w-full h-full border-0 filter saturate-90"
                />

                {/* Floating Map Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-[#D5C7B4] shadow-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2D5A43] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#A3C9A8]" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1F3D2E]">
                        Le Grenier de Mézos
                      </div>
                      <div className="text-[11px] text-[#5C5144]">
                        {GRENIER_INFO.address.full}
                      </div>
                    </div>
                  </div>

                  <a
                    href={GRENIER_INFO.maps.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#204030] transition shrink-0"
                  >
                    <span>Voir sur Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Navigation footer */}
              <div className="p-4 bg-[#FAF7F2] border-t border-[#EFE5D8] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#5D5144]">
                  <Car className="w-4 h-4 text-[#2D5A43]" />
                  <span>Parking disponible sur place</span>
                </div>

                <a
                  href={GRENIER_INFO.maps.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D5C9B8] text-xs font-semibold text-[#2D5A43] hover:bg-[#F2EDE4] transition"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Google Maps</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
