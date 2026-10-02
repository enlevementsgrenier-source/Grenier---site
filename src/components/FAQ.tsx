import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/grenierData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DEC7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#244F39] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>Foire Aux Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3024] tracking-tight">
            Vos questions fréquentes
          </h2>
          <p className="mt-3 text-base text-[#5C5044]">
            Tout ce qu'il faut savoir avant de venir déposer ou acheter au Grenier de Mézos.
          </p>
        </div>

        {/* Questions Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#DECDBB] overflow-hidden transition shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#1F3D2E]">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#2D5A43] text-white' : 'text-[#5C5044]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-sm sm:text-base text-[#54483C] leading-relaxed border-t border-[#F3EDE5] mt-1 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-10 p-6 rounded-2xl bg-[#EBF2EE] border border-[#C5DCCD] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-[#A3C9A8]" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1F3D2E]">
                Une question spécifique sur un don ou un objet ?
              </div>
              <div className="text-xs text-[#526557]">
                Notre équipe vous renseigne par téléphone au 05 58 42 65 00 pendant nos ouvertures.
              </div>
            </div>
          </div>

          <a
            href="tel:+33558426500"
            className="px-4 py-2 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#204030] transition shrink-0"
          >
            Appeler la recyclerie
          </a>
        </div>

      </div>
    </section>
  );
};
