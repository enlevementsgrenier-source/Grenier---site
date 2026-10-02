import React, { useState } from 'react';
import { Armchair, Utensils, Shirt, BookOpen, Wrench, Baby, ShoppingBag, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { DEPARTMENTS } from '../data/grenierData';

const ICONS_MAP: Record<string, React.FC<{ className?: string }>> = {
  Armchair,
  Utensils,
  Shirt,
  BookOpen,
  Wrench,
  Baby
};

export const ShopShowcase: React.FC = () => {
  const [activeDeptId, setActiveDeptId] = useState(DEPARTMENTS[0].id);

  const activeDept = DEPARTMENTS.find(d => d.id === activeDeptId) || DEPARTMENTS[0];
  const IconComponent = ICONS_MAP[activeDept.icon] || ShoppingBag;

  return (
    <section id="boutique" className="py-16 sm:py-24 bg-white border-b border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#244F39] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>La Boutique Solidaire</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3024] tracking-tight">
            Chinez et équipez-vous à petits prix
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5A5045]">
            Ouverte à tous, sans condition de revenus ! Découvrez nos rayons achalandés au quotidien par de nouveaux trésors nettoyés et vérifiés.
          </p>
        </div>

        {/* Department Pills / Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {DEPARTMENTS.map((dept) => {
            const TabIcon = ICONS_MAP[dept.icon] || ShoppingBag;
            const isActive = dept.id === activeDeptId;
            return (
              <button
                key={dept.id}
                onClick={() => setActiveDeptId(dept.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#443B30] border border-[#DECDBB] hover:bg-[#EFE8DC]'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-[#A3C9A8]' : 'text-[#6C5E50]'}`} />
                <span>{dept.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Department Spotlight */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#DECDBB] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D5C9B8] text-xs font-bold text-[#2D5A43]">
                <Tag className="w-3.5 h-3.5" />
                <span>Rayon solidaire</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-[#A3C9A8]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3D2E]">
                  {activeDept.name}
                </h3>
              </div>

              <p className="text-base text-[#52463B] leading-relaxed">
                {activeDept.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#736657] mb-2.5">
                  Ce que vous y trouverez :
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                  {activeDept.examples.map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#352D25] font-medium bg-white px-3 py-2 rounded-lg border border-[#E4DACB]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F0EAE0] border border-[#DDD2C2] text-xs text-[#5C4F42] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2D5A43] shrink-0" />
                <span><strong>Astuce :</strong> {activeDept.tips}</span>
              </div>
            </div>

            {/* Right preview box: Pricing philosophy & visiting hours */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#DECDBB] p-6 space-y-5 shadow-xs">
              <h4 className="font-serif text-lg font-bold text-[#1F3D2E] pb-3 border-b border-[#F0E6D8]">
                Pourquoi acheter au Grenier ?
              </h4>

              <div className="space-y-3.5 text-sm text-[#4E4338]">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E5ECE7] text-[#2D5A43] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-[#1F3D2E]">Des prix solidaires et accessibles</strong>
                    <p className="text-xs text-[#6B5F52] mt-0.5">
                      Des objets jusqu’à 70% à 90% moins chers que le neuf pour tous les budgets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E5ECE7] text-[#2D5A43] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-[#1F3D2E]">Des pièces authentiques &amp; rétro</strong>
                    <p className="text-xs text-[#6B5F52] mt-0.5">
                      Chinez des créations introuvables en grande surface, du mobilier plein d'histoire.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E5ECE7] text-[#2D5A43] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-[#1F3D2E]">100% de vos achats réinvestis localement</strong>
                    <p className="text-xs text-[#6B5F52] mt-0.5">
                      Chaque euro finance des emplois d'insertion et des projets associatifs dans les Landes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#infos-pratiques"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#204231] transition"
                >
                  <span>Venir faire un tour au magasin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
