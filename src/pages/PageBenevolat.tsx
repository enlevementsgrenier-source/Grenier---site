import React, { useState } from 'react';
import {
  CheckCircle2,
  Mail,
  Send,
  Copy,
  Check,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { GRENIER_INFO } from '../data/grenierData';
import type { PageId } from '../components/Header';

interface PageBenevolatProps {
  onNavigate?: (page: PageId) => void;
}

type HelpMode = 'temps' | 'competences';

interface FormState {
  lastName: string;
  firstName: string;
  city: string;
  email: string;
  phone: string;
  helpMode: HelpMode;
  skillsDetails: string;
}

interface FormErrors {
  lastName?: string;
  firstName?: string;
  email?: string;
  phone?: string;
}

const INITIAL_FORM: FormState = {
  lastName: '',
  firstName: '',
  city: '',
  email: '',
  phone: '',
  helpMode: 'temps',
  skillsDetails: ''
};

export const PageBenevolat: React.FC<PageBenevolatProps> = ({ onNavigate }) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<{
    applicantName: string;
    body: string;
    mailtoHref: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.lastName.trim()) {
      nextErrors.lastName = 'Veuillez indiquer votre nom.';
    }
    if (!form.firstName.trim()) {
      nextErrors.firstName = 'Veuillez indiquer votre prénom.';
    }
    const emailTrimmed = form.email.trim();
    if (!emailTrimmed) {
      nextErrors.email = 'Veuillez indiquer votre email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      nextErrors.email = 'Le format de l’email semble invalide.';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      nextErrors.phone = 'Veuillez indiquer votre numéro de téléphone pour que Florence puisse vous rappeler.';
    } else if (digits.length < 10) {
      nextErrors.phone = 'Veuillez saisir un numéro à 10 chiffres.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`;
    const helpLabel =
      form.helpMode === 'temps'
        ? "Juste donner un peu de temps et participer à l'aventure du Grenier avec le reste des bénévoles et de l'équipe"
        : "J'ai des compétences et des envies particulières (bricolage, livres, vêtements, etc.)";

    const lines = [
      'Bonjour Florence et l’équipe du Grenier de Mézos,',
      '',
      'Je souhaite devenir bénévole au Grenier :',
      `Nom : ${form.lastName.trim()}`,
      `Prénom : ${form.firstName.trim()}`,
      `Commune : ${form.city.trim() || 'Non précisée'}`,
      `Email : ${form.email.trim()}`,
      `Téléphone : ${form.phone.trim()}`,
      '',
      `Comment je souhaite aider : ${helpLabel}`,
      ...(form.helpMode === 'competences' && form.skillsDetails.trim()
        ? [`Précisions : ${form.skillsDetails.trim()}`]
        : [])
    ];

    const body = lines.join('\n');
    const subject = `Bénévolat au Grenier - ${fullName}`;
    const mailtoHref = `mailto:${GRENIER_INFO.contact.emailContact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmitted({
      applicantName: fullName,
      body,
      mailtoHref
    });
  };

  const handleCopy = () => {
    if (!submitted) return;
    navigator.clipboard.writeText(submitted.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div>
      {/* Header concis */}
      <section className="bg-[#214130] text-white py-12 sm:py-16 border-b border-[#183124]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#A3C9A8] hover:text-white transition mb-5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l&apos;accueil</span>
            </button>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] text-balance">
            Rejoignez les bénévoles du Grenier !
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
            Que vous soyez bricoleur, simple amateur de livres ou d&apos;objets de brocante, rejoignez-nous pour quelques heures de temps en temps ! Le Grenier a été créé par des bénévoles il y a 25 ans, les bénévoles sont essentiels à notre fonctionnement !
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-12 sm:py-16 bg-[#FAF7F2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="bg-white rounded-3xl border border-[#BCD9C7] p-7 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#E8EFEA] text-[#2D5A43] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3024]">
                    Merci {submitted.applicantName} !
                  </h2>
                  <p className="text-sm sm:text-base text-[#5A5045]">
                    Votre message est prêt à être envoyé. Florence, notre bénévole en charge des bénévoles, vous rappellera très vite pour en savoir plus !
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC7] space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DEC7] pb-2 text-xs text-[#685A4C]">
                  <span className="font-semibold uppercase tracking-wider">Récapitulatif</span>
                  <span className="text-[#2D5A43] font-medium">{GRENIER_INFO.contact.emailContact}</span>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#3E342B] leading-relaxed">
                  {submitted.body}
                </pre>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={submitted.mailtoHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2D5A43] text-white font-semibold text-sm hover:bg-[#204231] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A43] transition whitespace-nowrap shrink-0"
                >
                  <Mail className="w-4 h-4 text-[#A3C9A8]" />
                  <span>Envoyer par email</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F2] border border-[#DECDBB] text-[#1F3D2E] font-semibold text-sm hover:bg-[#EFE7DA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A43] transition cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#2D5A43]" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#5C5044]" />
                      <span>Copier le message</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSubmitted(null)}
                  className="inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-[#685A4C] hover:text-[#1F3D2E] hover:bg-[#F3ECE0] transition cursor-pointer whitespace-nowrap shrink-0"
                >
                  Modifier
                </button>
              </div>

              <div className="pt-4 border-t border-[#F0E6D8] text-xs text-[#685A4C]">
                <span>{GRENIER_INFO.address.full}</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#DECDBB] p-6 sm:p-10 shadow-xs">
              <div className="mb-7 pb-5 border-b border-[#EFE7DC]">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3024]">
                  Contactez-nous
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#5C5044]">
                  Florence, notre bénévole en charge des bénévoles, vous rappellera pour en savoir plus !
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Nom / Prénom / Commune */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="vol-lastName" className="block text-sm font-semibold text-[#3E342B] mb-1.5">
                      Nom <span className="text-rose-700" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="vol-lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => {
                        setForm({ ...form, lastName: e.target.value });
                        if (errors.lastName) setErrors({ ...errors, lastName: undefined });
                      }}
                      placeholder="Votre nom"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-[#FAF7F2]/60 text-sm text-[#2C2724] focus:outline-none focus:ring-2 focus:ring-[#2D5A43] transition ${
                        errors.lastName ? 'border-rose-500' : 'border-[#DECDBB]'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1.5 text-xs text-rose-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.lastName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="vol-firstName" className="block text-sm font-semibold text-[#3E342B] mb-1.5">
                      Prénom <span className="text-rose-700" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="vol-firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => {
                        setForm({ ...form, firstName: e.target.value });
                        if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                      }}
                      placeholder="Votre prénom"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-[#FAF7F2]/60 text-sm text-[#2C2724] focus:outline-none focus:ring-2 focus:ring-[#2D5A43] transition ${
                        errors.firstName ? 'border-rose-500' : 'border-[#DECDBB]'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1.5 text-xs text-rose-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.firstName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="vol-city" className="block text-sm font-semibold text-[#3E342B] mb-1.5">
                      Commune
                    </label>
                    <input
                      id="vol-city"
                      type="text"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Ex : Mézos"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DECDBB] bg-[#FAF7F2]/60 text-sm text-[#2C2724] focus:outline-none focus:ring-2 focus:ring-[#2D5A43] transition"
                    />
                  </div>
                </div>

                {/* Email / Téléphone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vol-email" className="block text-sm font-semibold text-[#3E342B] mb-1.5">
                      Email <span className="text-rose-700" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="vol-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="nom@exemple.fr"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-[#FAF7F2]/60 text-sm text-[#2C2724] focus:outline-none focus:ring-2 focus:ring-[#2D5A43] transition ${
                        errors.email ? 'border-rose-500' : 'border-[#DECDBB]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="vol-phone" className="block text-sm font-semibold text-[#3E342B] mb-1.5">
                      Téléphone <span className="text-rose-700" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="vol-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="06 00 00 00 00"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-[#FAF7F2]/60 text-sm text-[#2C2724] focus:outline-none focus:ring-2 focus:ring-[#2D5A43] transition ${
                        errors.phone ? 'border-rose-500' : 'border-[#DECDBB]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-rose-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Comment voulez-vous aider ? */}
                <fieldset className="space-y-3 pt-4 border-t border-[#EFE7DC]">
                  <legend className="font-serif text-lg font-bold text-[#1F3D2E] mb-1">
                    Comment voulez-vous aider ?
                  </legend>

                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      form.helpMode === 'temps'
                        ? 'bg-[#EBF2EE] border-[#2D5A43] text-[#173826]'
                        : 'bg-[#FAF7F2]/70 border-[#DECDBB] text-[#3E342B] hover:border-[#B5A38D]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="helpMode"
                      value="temps"
                      checked={form.helpMode === 'temps'}
                      onChange={() => setForm({ ...form, helpMode: 'temps' })}
                      className="mt-1 w-4 h-4 text-[#2D5A43] focus:ring-[#2D5A43] shrink-0"
                    />
                    <span className="text-sm font-medium leading-relaxed">
                      Juste donner un peu de temps et participer à l&apos;aventure du Grenier avec le reste des bénévoles et de l&apos;équipe
                    </span>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      form.helpMode === 'competences'
                        ? 'bg-[#EBF2EE] border-[#2D5A43] text-[#173826]'
                        : 'bg-[#FAF7F2]/70 border-[#DECDBB] text-[#3E342B] hover:border-[#B5A38D]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="helpMode"
                      value="competences"
                      checked={form.helpMode === 'competences'}
                      onChange={() => setForm({ ...form, helpMode: 'competences' })}
                      className="mt-1 w-4 h-4 text-[#2D5A43] focus:ring-[#2D5A43] shrink-0"
                    />
                    <span className="text-sm font-medium leading-relaxed">
                      J&apos;ai des compétences et des envies particulières (bricolage, livres, vêtements, etc.)
                    </span>
                  </label>

                  {form.helpMode === 'competences' && (
                    <div className="pt-1">
                      <label htmlFor="vol-skills" className="block text-sm font-semibold text-[#3E342B] mb-1.5">
                        Précisez vos compétences ou envies (facultatif)
                      </label>
                      <textarea
                        id="vol-skills"
                        rows={3}
                        value={form.skillsDetails}
                        onChange={(e) => setForm({ ...form, skillsDetails: e.target.value })}
                        placeholder="Ex : réparation électrique, tri de livres, couture, accueil des adhérents..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DECDBB] bg-[#FAF7F2]/60 text-sm text-[#2C2724] focus:outline-none focus:ring-2 focus:ring-[#2D5A43] transition"
                      />
                    </div>
                  )}
                </fieldset>

                {/* Bouton envoi */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2D5A43] text-white font-semibold text-sm sm:text-base hover:bg-[#204231] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A43] shadow-xs transition cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Send className="w-4 h-4 text-[#A3C9A8]" />
                    <span>Envoyer</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
