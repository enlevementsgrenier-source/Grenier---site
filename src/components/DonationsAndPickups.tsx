import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, Phone, Mail, Send, Copy, Check, AlertCircle, Sparkles } from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';

export const DonationsAndPickups: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Mézos',
    itemTypes: [] as string[],
    floorAccess: 'Rez-de-chaussée',
    description: ''
  });

  const [formSentSuccess, setFormSentSuccess] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const toggleItemType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      itemTypes: prev.itemTypes.includes(type)
        ? prev.itemTypes.filter(t => t !== type)
        : [...prev.itemTypes, type]
    }));
  };

  const formattedSummary = `Demande d'enlèvement à domicile - Le Grenier de Mézos
Nom : ${formData.name || 'Non précisé'}
Téléphone : ${formData.phone || 'Non précisé'}
Commune : ${formData.city}
Accès / Étage : ${formData.floorAccess}
Catégories d'objets : ${formData.itemTypes.length > 0 ? formData.itemTypes.join(', ') : 'Gros mobilier / Encombrants'}
Description des objets :
${formData.description || 'Divers meubles et objets réutilisables en bon état.'}
`;

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demande d'enlèvement - ${formData.name || 'Particulier'} (${formData.city})`);
    const body = encodeURIComponent(formattedSummary);
    window.location.href = `mailto:${GRENIER_INFO.contact.emailEnlevements}?subject=${subject}&body=${body}`;
    setFormSentSuccess(true);
    setTimeout(() => setFormSentSuccess(false), 5000);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(formattedSummary);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  return (
    <section id="donner" className="py-16 sm:py-24 bg-white border-b border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
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
                  <span><strong>Accès facile en voiture</strong> avec quai et zone de déchargement.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                  <span><strong>Aide au déchargement</strong> par notre équipe de valoristes bienveillants.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                  <span><strong>Sans rendez-vous</strong> du mardi au samedi selon nos horaires de dépôt.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EADECE]">
              <a
                href="#infos-pratiques"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D5A43] hover:text-[#1B3829]"
              >
                <span>Consulter les horaires de dépôt</span>
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

        {/* Interactive Online Request Generator for Home Pickups */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#DECDBB] shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A43]">
              Simulateur &amp; Préparation de rendez-vous
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3D2E] mt-1">
              Préparez votre demande d'enlèvement en 1 minute
            </h3>
            <p className="text-sm text-[#615447] mt-2">
              Remplissez les informations ci-dessous pour générer automatiquement votre demande prête à être envoyée à l'équipe du Grenier de Mézos ({GRENIER_INFO.contact.emailEnlevements}).
            </p>
          </div>

          <form onSubmit={handleSendEmail} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#54473A] mb-1.5">
                  Votre nom ou prénom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Marie Dupont"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A43]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#54473A] mb-1.5">
                  Numéro de téléphone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex : 06 12 34 56 78"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A43]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#54473A] mb-1.5">
                  Commune / Ville *
                </label>
                <select
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A43]"
                >
                  <option value="Mézos">Mézos (40170)</option>
                  <option value="Mimizan">Mimizan (40200)</option>
                  <option value="Lit-et-Mixe">Lit-et-Mixe (40170)</option>
                  <option value="Saint-Julien-en-Born">Saint-Julien-en-Born (40170)</option>
                  <option value="Castets">Castets (40260)</option>
                  <option value="Onesse-Laharie">Onesse-Laharie (40110)</option>
                  <option value="Levignacq">Lévignacq (40170)</option>
                  <option value="Autre commune des Landes">Autre commune des Landes</option>
                </select>
              </div>
            </div>

            {/* Item categories checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#54473A] mb-2">
                Objets concernés par l'enlèvement :
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Canapé / Fauteuils',
                  'Table & Chaises',
                  'Armoire / Buffet',
                  'Lit & Sommier',
                  'Électroménager',
                  'Vaisselle / Cartons',
                  'Livres / Bibelots',
                  'Vélos & Bricolage'
                ].map(item => {
                  const isSelected = formData.itemTypes.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleItemType(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                        isSelected
                          ? 'bg-[#2D5A43] text-white border-[#2D5A43]'
                          : 'bg-white text-[#43382D] border-[#D5C7B4] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Floor / Access & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#54473A] mb-1.5">
                  Accès au logement
                </label>
                <select
                  value={formData.floorAccess}
                  onChange={e => setFormData({ ...formData, floorAccess: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A43]"
                >
                  <option value="Maison de plain-pied / Rez-de-chaussée">Maison plain-pied / RDC</option>
                  <option value="Étage avec ascenseur">Étage avec ascenseur</option>
                  <option value="Étage sans ascenseur">Étage sans ascenseur</option>
                  <option value="Garage ou extérieur abrité">Garage ou extérieur abrité</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-[#54473A] mb-1.5">
                  Précisions sur l'état et le volume
                </label>
                <input
                  type="text"
                  placeholder="Ex : Table en chêne 6 personnes + 4 chaises, buffet bas, le tout en bon état"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A43]"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D5A43] text-white font-semibold text-sm hover:bg-[#204231] shadow-xs active:scale-[0.99] transition"
                >
                  <Send className="w-4 h-4 text-[#A3C9A8]" />
                  <span>Envoyer l'email à enlevements.grenier@gmail.com</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#D5C7B4] text-[#43382D] text-sm font-semibold hover:bg-[#F2ECE1] transition"
                >
                  {copiedDraft ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedDraft ? 'Message copié !' : 'Copier le récapitulatif'}</span>
                </button>
              </div>

              <div className="text-xs text-[#6B5E51]">
                Ou appelez directement :{' '}
                <a href={`tel:${GRENIER_INFO.contact.phoneRaw}`} className="font-bold text-[#2D5A43] hover:underline">
                  {GRENIER_INFO.contact.phone}
                </a>
              </div>
            </div>

            {formSentSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Votre logiciel de messagerie s'est ouvert avec les informations préparées. Merci !</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
};
