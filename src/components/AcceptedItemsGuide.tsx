import React, { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, Search, Sparkles } from 'lucide-react';
import { ACCEPTANCE_GUIDE } from '../data/grenierData';

export const AcceptedItemsGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const filteredCategories = ACCEPTANCE_GUIDE.filter(cat => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const inCategory = cat.category.toLowerCase().includes(term);
    const inAccepted = cat.accepted.some(i => i.toLowerCase().includes(term));
    const inRefused = cat.refused.some(i => i.toLowerCase().includes(term));
    return inCategory || inAccepted || inRefused;
  });

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#244F39] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>Guide du réemploi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3024] tracking-tight">
            Que pouvez-vous apporter au Grenier ?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5B5045]">
            Pour que vos objets puissent faire le bonheur d'un nouveau propriétaire, ils doivent être réemployables, propres et en bon état général.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="w-4 h-4 text-[#8C7D6F] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Rechercher un objet (ex : table, vélo, lave-linge, livre...)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A43]"
          />
        </div>

        {/* Categories Tab Selector (if not searching) */}
        {!searchTerm && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {ACCEPTANCE_GUIDE.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  selectedCategoryIndex === idx
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-white text-[#4A3E31] border border-[#DECDBB] hover:bg-[#F0E8DC]'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        )}

        {/* Categories cards display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(searchTerm ? filteredCategories : [ACCEPTANCE_GUIDE[selectedCategoryIndex]]).map((cat) => (
            <React.Fragment key={cat.category}>
              {/* Accepted Card */}
              <div className="bg-white rounded-2xl border border-emerald-200/80 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1F3D2E]">
                      {cat.category} : Ce qui est accepté
                    </h4>
                    <p className="text-xs text-emerald-800 font-medium">
                      Prêt pour une seconde vie
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-[#3E342A]">
                  {cat.accepted.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 mt-4 border-t border-emerald-100/70 flex items-start gap-2 text-xs text-[#526456]">
                  <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Conseil du Grenier :</strong> {cat.advice}</span>
                </div>
              </div>

              {/* Refused Card */}
              <div className="bg-white rounded-2xl border border-rose-200/80 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-rose-100">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1F3D2E]">
                      Ce qui ne peut pas être repris
                    </h4>
                    <p className="text-xs text-rose-800 font-medium">
                      À déposer en déchèterie publique
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-[#4E3939]">
                  {cat.refused.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 mt-4 border-t border-rose-100/70 text-xs text-[#735A5A] italic">
                  Les objets hors d'usage engendrent des coûts de traitement élevés pour l'association. Merci pour votre compréhension !
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};
