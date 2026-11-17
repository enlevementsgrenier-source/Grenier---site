import React, { useState } from 'react';
import {
  CheckCircle2,
  Mail,
  Send,
  Copy,
  Check,
  AlertCircle,
  ArrowLeft,
  Loader2
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<{
    message: string;
    mailtoHref: string;
    body: string;
  } | null>(null);
  const [submittedApplicant, setSubmittedApplicant] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const recipientEmail = GRENIER_INFO.contact.emailBenevolat || 'direction.grenier@gmail.com';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

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
      `Nom : ${form.lastName.trim()}`,
      `Prénom : ${form.firstName.trim()}`,
      `Commune : ${form.city.trim() || 'Non précisée'}`,
      `Email : ${form.email.trim()}`,
      `Téléphone : ${form.phone.trim()}`,
      `Comment aider : ${helpLabel}`,
      ...(form.helpMode === 'competences' && form.skillsDetails.trim()
        ? [`Précisions : ${form.skillsDetails.trim()}`]
        : [])
    ];
    const plainBody = lines.join('\n');
    const subject = `Nouvelle demande bénévole - ${fullName}`;
    const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainBody)}`;

    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);

    try {
      const web3FormsKey = '75a0e216-4961-42f6-b6a6-df2e79082533';

      if (web3FormsKey) {
        const formData = new FormData();
        formData.append('access_key', web3FormsKey);
        formData.append('subject', subject);
        formData.append('from_name', 'Le Grenier de Mezos');
        formData.append('name', fullName);
        formData.append('email', form.email.trim());
        formData.append('Nom', form.lastName.trim());
        formData.append('Prenom', form.firstName.trim());
        formData.append('Commune', form.city.trim() || 'Non precisee');
        formData.append('Telephone', form.phone.trim());
        formData.append('Participation', helpLabel);
        if (form.helpMode === 'competences' && form.skillsDetails.trim()) {
          formData.append('Competences', form.skillsDetails.trim());
        }
        formData.append('message', plainBody);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          signal: controller.signal,
          body: formData
        });

        const data = await response.json().catch(() => null);
        if (!response.ok || !data?.success) {
          throw new Error(data?.message || 'Erreur lors de l’envoi.');
        }
      } else {
        const formData = new FormData();
        formData.append('_subject', subject);
        formData.append('_replyto', form.email.trim());
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');
        formData.append('name', fullName);
        formData.append('email', form.email.trim());
        formData.append('Nom', form.lastName.trim());
        formData.append('Prénom', form.firstName.trim());
        formData.append('Commune', form.city.trim() || 'Non précisée');
        formData.append('Téléphone', form.phone.trim());
        formData.append('Souhait de participation', helpLabel);
        if (form.helpMode === 'competences' && form.skillsDetails.trim()) {
          formData.append('Compétences et envies', form.skillsDetails.trim());
        }

        const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          signal: controller.signal,
          body: formData
        });

        const data = await response.json().catch(() => null);
        const isSuccess = Boolean(
          response.ok && data && (data.success === true || data.success === 'true')
        );

        if (!isSuccess) {
          const rawMsg = typeof data?.message === 'string' ? data.message : '';
          if (/activ|confirm/i.test(rawMsg)) {
            throw new Error('ACTIVATION_REQUIRED');
          }
          throw new Error(rawMsg || 'INVALID_RESPONSE');
        }
      }

      setSubmittedApplicant(fullName);
      setForm(INITIAL_FORM);
    } catch (err: unknown) {
      const isTimeout = err instanceof DOMException && err.name === 'AbortError';
      const errMsg = err instanceof Error ? err.message : '';
      let userMessage =
        "L'envoi automatique n'a pas abouti. Vous pouvez réessayer ou envoyer votre demande directement via votre messagerie.";

      if (isTimeout) {
        userMessage =
          "Le service d'envoi automatique met trop de temps à répondre. Vous pouvez réessayer ou envoyer votre demande en un clic par messagerie.";
      } else if (errMsg === 'ACTIVATION_REQUIRED') {
        userMessage = `Activation requise pour ${recipientEmail} : vérifiez la boîte de réception (et les spams) de ${recipientEmail} pour cliquer sur le lien d'activation FormSubmit, puis réessayez. En attendant, vous pouvez envoyer la demande ci-dessous par messagerie.`;
      } else if (errMsg === 'INVALID_RESPONSE') {
        userMessage = `Le relais d'envoi n'a pas confirmé la transmission vers ${recipientEmail} (activation ou clé Web3Forms requise). Vous pouvez envoyer votre demande directement ci-dessous.`;
      }

      setSubmitError({
        message: userMessage,
        mailtoHref,
        body: plainBody
      });
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const handleCopyFallback = () => {
    if (!submitError) return;
    navigator.clipboard.writeText(submitError.body);
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
          {submittedApplicant ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-white rounded-3xl border border-[#BCD9C7] p-7 sm:p-10 shadow-xs space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8EFEA] text-[#2D5A43] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3024]">
                    Merci {submittedApplicant} !
                  </h2>
                  <p className="text-sm sm:text-base text-[#5A5045] leading-relaxed">
                    Votre demande a bien été envoyée par email à notre équipe. Florence, notre bénévole en charge des bénévoles, vous rappellera très prochainement pour en savoir plus !
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0E6D8] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#685A4C]">{GRENIER_INFO.address.full}</span>
                <button
                  type="button"
                  onClick={() => setSubmittedApplicant(null)}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DECDBB] text-sm font-semibold text-[#1F3D2E] hover:bg-[#EFE7DA] transition cursor-pointer whitespace-nowrap shrink-0"
                >
                  Envoyer une autre demande
                </button>
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

                {submitError && (
                  <div
                    role="alert"
                    className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-3"
                  >
                    <div className="flex items-start gap-2.5 text-sm">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{submitError.message}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href={submitError.mailtoHref}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#204231] transition"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#A3C9A8]" />
                        <span>Envoyer par messagerie ({recipientEmail})</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyFallback}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-xs font-semibold text-amber-950 hover:bg-amber-100/60 transition cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-[#2D5A43]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copié' : 'Copier le message'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Bouton envoi */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2D5A43] text-white font-semibold text-sm sm:text-base hover:bg-[#204231] disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A43] shadow-xs transition cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-[#A3C9A8] animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#A3C9A8]" />
                        <span>Envoyer</span>
                      </>
                    )}
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
