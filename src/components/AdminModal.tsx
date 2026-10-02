import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Save,
  Github,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  EyeOff,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Bell,
  Calendar,
  Building2,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { SiteContent, GitHubUpdateResult } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_ADMIN_PASSWORD = 'grenier-mezos';

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    content,
    updateContent,
    resetToDefault,
    hasCustomChanges,
    githubConfig,
    updateGitHubConfig,
    saveToGitHub,
    isSaving,
    lastSaveResult,
    clearLastSaveResult
  } = useSiteContent();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('grenier_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showToken, setShowToken] = useState(false);

  // Form tabs
  const [activeTab, setActiveTab] = useState<'info' | 'hours' | 'banner' | 'github' | 'standalone'>('info');

  // Local copy of form state
  const [formData, setFormData] = useState<SiteContent>(content);
  const [customCommitMessage, setCustomCommitMessage] = useState(
    `Mise à jour du contenu du site - ${new Date().toLocaleDateString('fr-FR')}`
  );
  const [copiedStandalone, setCopiedStandalone] = useState(false);

  // Keep form data synced if content changes outside
  React.useEffect(() => {
    setFormData(content);
  }, [content]);

  if (!isOpen) return null;

  // Handle password login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === DEFAULT_ADMIN_PASSWORD || passwordInput.trim().startsWith('ghp_')) {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem('grenier_admin_auth', 'true');
      if (passwordInput.trim().startsWith('ghp_')) {
        updateGitHubConfig({ token: passwordInput.trim() });
      }
    } else {
      setAuthError(true);
    }
  };

  const handleApplyLocally = () => {
    updateContent(formData);
    alert('Modifications appliquées en direct sur le site (sauvegardées en local) !');
  };

  const handlePushGitHub = async () => {
    // First apply locally so content is current
    updateContent(formData);
    // Then call GitHub API PUT
    await saveToGitHub(customCommitMessage);
  };

  const standaloneSnippet = `<!-- Code autonome d'administration et de sauvegarde GitHub via API REST -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Admin Le Grenier de Mézos - Sauvegarde GitHub REST API</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 650px; margin: 40px auto; padding: 20px; line-height: 1.5; color: #1f2937; }
    input, textarea, button { width: 100%; box-sizing: border-box; padding: 10px; margin-top: 6px; margin-bottom: 14px; border: 1px solid #d1d5db; border-radius: 6px; }
    button { background: #2D5A43; color: white; font-weight: bold; cursor: pointer; border: none; }
    button:hover { background: #214332; }
    .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; margin-bottom: 20px; }
    .status { padding: 12px; border-radius: 6px; font-size: 14px; display: none; }
    .success { background: #def7ec; color: #03543f; border: 1px solid #84e1bc; }
    .error { background: #fde8e8; color: #9b1c1c; border: 1px solid #f8b4b4; }
  </style>
</head>
<body>
  <h2>🌿 Administration & Sauvegarde GitHub REST API</h2>
  <div class="card">
    <label>Token GitHub (PAT avec scope 'repo' ou 'Contents: Write') :</label>
    <input type="password" id="ghToken" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx">

    <label>Compte / Organisation GitHub :</label>
    <input type="text" id="ghOwner" placeholder="votre-compte">

    <label>Nom du Dépôt :</label>
    <input type="text" id="ghRepo" value="le-grenier-de-mezos">

    <label>Chemin du fichier cible :</label>
    <input type="text" id="ghPath" value="src/data/siteContent.json">

    <label>Message de commit :</label>
    <input type="text" id="ghCommit" value="Mise à jour des coordonnées et horaires">

    <label>Contenu JSON à envoyer :</label>
    <textarea id="ghContent" rows="6">${JSON.stringify(formData, null, 2)}</textarea>

    <button onclick="saveToGitHubAPI()">🚀 Envoyer sur GitHub (PUT via API REST)</button>
    <div id="statusBox" class="status"></div>
  </div>

  <script>
    // Encodage UTF-8 vers Base64 sécurisé pour les accents français
    function utf8ToBase64(str) {
      const bytes = new TextEncoder().encode(str);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }

    async function saveToGitHubAPI() {
      const token = document.getElementById('ghToken').value.trim();
      const owner = document.getElementById('ghOwner').value.trim();
      const repo = document.getElementById('ghRepo').value.trim();
      const path = document.getElementById('ghPath').value.trim();
      const message = document.getElementById('ghCommit').value.trim();
      const content = document.getElementById('ghContent').value;
      const statusBox = document.getElementById('statusBox');

      if (!token || !owner || !repo || !path) {
        statusBox.className = 'status error';
        statusBox.style.display = 'block';
        statusBox.textContent = 'Erreur : Veuillez remplir le token, le compte, le dépôt et le chemin.';
        return;
      }

      statusBox.className = 'status';
      statusBox.style.display = 'block';
      statusBox.textContent = '⏳ Connexion à GitHub et récupération du SHA actuel...';

      try {
        // 1. Récupération du SHA actuel du fichier
        const getUrl = \`https://api.github.com/repos/\${encodeURIComponent(owner)}/\${encodeURIComponent(repo)}/contents/\${path}\`;
        const getRes = await fetch(getUrl, {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });

        let sha = null;
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData.sha;
        }

        statusBox.textContent = '⏳ Envoi de la mise à jour (requête PUT)...';

        // 2. Requête PUT avec le contenu en Base64
        const payload = {
          message: message || 'Mise à jour via REST API',
          content: utf8ToBase64(content),
          branch: 'main'
        };
        if (sha) payload.sha = sha;

        const putRes = await fetch(getUrl, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28'
          },
          body: JSON.stringify(payload)
        });

        const resData = await putRes.json();

        if (putRes.ok) {
          statusBox.className = 'status success';
          const commitSha = resData.commit ? resData.commit.sha.substring(0, 7) : '';
          statusBox.innerHTML = '✅ <strong>Succès !</strong> Fichier mis à jour sur GitHub (Commit: ' + commitSha + ').';
        } else {
          statusBox.className = 'status error';
          statusBox.textContent = '❌ Erreur ' + putRes.status + ' : ' + (resData.message || 'Échec de la requête');
        }
      } catch (err) {
        statusBox.className = 'status error';
        statusBox.textContent = '❌ Erreur réseau : ' + err.message;
      }
    }
  </script>
</body>
</html>`;

  const copyStandaloneCode = () => {
    navigator.clipboard.writeText(standaloneSnippet);
    setCopiedStandalone(true);
    setTimeout(() => setCopiedStandalone(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-[#DECDBB] max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#172E22] text-white flex items-center justify-between border-b border-[#244835]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center">
              {isAuthenticated ? <Unlock className="w-5 h-5 text-[#A3C9A8]" /> : <Lock className="w-5 h-5 text-[#A3C9A8]" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                  Espace Administration du Grenier
                </h3>
                {hasCustomChanges && (
                  <span className="text-[10px] uppercase font-bold bg-[#A3C9A8] text-[#172E22] px-2 py-0.5 rounded-full">
                    Brouillon actif
                  </span>
                )}
              </div>
              <p className="text-xs text-white/70">
                Gestion des informations du site &amp; Synchronisation directe GitHub REST API
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-10 flex-1 overflow-y-auto flex items-center justify-center">
            <div className="max-w-md w-full bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#DECDBB] space-y-5 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#2D5A43] text-white flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-7 h-7 text-[#A3C9A8]" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-[#1F3D2E]">
                  Accès sécurisé
                </h4>
                <p className="text-xs text-[#6C5E50] mt-1">
                  Veuillez saisir le mot de passe d'administration ou votre Personal Access Token GitHub.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#54473A] mb-1">
                    Mot de passe administrateur :
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={e => {
                        setPasswordInput(e.target.value);
                        setAuthError(false);
                      }}
                      placeholder="Mot de passe ou Token GitHub"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A43] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[#7B6E5F]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {authError && (
                    <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Mot de passe incorrect. (Indice par défaut : <code>grenier-mezos</code>)</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#2D5A43] text-white text-sm font-semibold hover:bg-[#204231] shadow-xs transition"
                >
                  Déverrouiller l'espace administration
                </button>

                <div className="p-3 rounded-xl bg-white border border-[#E4D9CA] text-[11px] text-[#6E6153] leading-relaxed">
                  💡 <strong>Note :</strong> Le mot de passe par défaut pour ce site test est :{' '}
                  <code className="bg-[#FAF7F2] px-1.5 py-0.5 rounded text-[#2D5A43] font-bold">grenier-mezos</code>
                  . Vous pouvez également coller directement votre Personal Access Token GitHub (<code>ghp_...</code>).
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <>
            {/* Navigation Tabs */}
            <div className="flex border-b border-[#E8DFC8] bg-[#FAF7F2] px-4 sm:px-6 overflow-x-auto gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('info')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                  activeTab === 'info'
                    ? 'border-[#2D5A43] text-[#2D5A43]'
                    : 'border-transparent text-[#6F6355] hover:text-[#2D5A43]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Coordonnées &amp; Textes</span>
              </button>

              <button
                onClick={() => setActiveTab('hours')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                  activeTab === 'hours'
                    ? 'border-[#2D5A43] text-[#2D5A43]'
                    : 'border-transparent text-[#6F6355] hover:text-[#2D5A43]'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Horaires d'ouverture</span>
              </button>

              <button
                onClick={() => setActiveTab('banner')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                  activeTab === 'banner'
                    ? 'border-[#2D5A43] text-[#2D5A43]'
                    : 'border-transparent text-[#6F6355] hover:text-[#2D5A43]'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Bandeau d'actualité</span>
                {formData.banner.enabled && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('github')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                  activeTab === 'github'
                    ? 'border-[#2D5A43] text-[#2D5A43]'
                    : 'border-transparent text-[#6F6355] hover:text-[#2D5A43]'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>Enregistrement GitHub (API REST)</span>
              </button>

              <button
                onClick={() => setActiveTab('standalone')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                  activeTab === 'standalone'
                    ? 'border-[#2D5A43] text-[#2D5A43]'
                    : 'border-transparent text-[#6F6355] hover:text-[#2D5A43]'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Code autonome (Export)</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-[#352D24]">
              
              {/* Feedback Alert Banners */}
              {lastSaveResult && (
                <div
                  className={`p-4 rounded-2xl border text-sm flex items-start justify-between gap-3 animate-fadeIn ${
                    lastSaveResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {lastSaveResult.success ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-sm">
                        {lastSaveResult.success ? 'Succès de la mise à jour GitHub !' : 'Échec de la sauvegarde GitHub'}
                      </div>
                      <p className="text-xs mt-0.5">{lastSaveResult.message}</p>
                      {lastSaveResult.commitUrl && (
                        <a
                          href={lastSaveResult.commitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold underline mt-2 text-emerald-900"
                        >
                          <span>Voir le commit sur GitHub ({lastSaveResult.commitSha})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={clearLastSaveResult}
                    className="p-1 rounded-md hover:bg-black/5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* TAB 1: General Info & Coordinates */}
              {activeTab === 'info' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                        Nom de la recyclerie :
                      </label>
                      <input
                        type="text"
                        value={formData.info.name}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            info: { ...formData.info, name: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                        Nom juridique / Association :
                      </label>
                      <input
                        type="text"
                        value={formData.info.legalName}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            info: { ...formData.info, legalName: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                      Slogan / Sous-titre :
                    </label>
                    <input
                      type="text"
                      value={formData.info.tagline}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          info: { ...formData.info, tagline: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                      Description de la mission :
                    </label>
                    <textarea
                      rows={3}
                      value={formData.info.description}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          info: { ...formData.info, description: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                    />
                  </div>

                  {/* Contact details */}
                  <div className="pt-2 border-t border-[#EDE4D8]">
                    <h4 className="font-serif text-base font-bold text-[#1F3D2E] mb-3">
                      Coordonnées de contact
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                          Numéro de téléphone :
                        </label>
                        <input
                          type="text"
                          value={formData.info.contact.phone}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              info: {
                                ...formData.info,
                                contact: {
                                  ...formData.info.contact,
                                  phone: e.target.value,
                                  phoneRaw: e.target.value.replace(/[^0-9+]/g, '')
                                }
                              }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                          Email Enlèvements :
                        </label>
                        <input
                          type="email"
                          value={formData.info.contact.emailEnlevements}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              info: {
                                ...formData.info,
                                contact: {
                                  ...formData.info.contact,
                                  emailEnlevements: e.target.value
                                }
                              }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Postal address */}
                  <div className="pt-2 border-t border-[#EDE4D8]">
                    <h4 className="font-serif text-base font-bold text-[#1F3D2E] mb-3">
                      Adresse postale (Google Maps)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                          Rue / Zone :
                        </label>
                        <input
                          type="text"
                          value={formData.info.address.street}
                          onChange={e => {
                            const newStreet = e.target.value;
                            setFormData({
                              ...formData,
                              info: {
                                ...formData.info,
                                address: {
                                  ...formData.info.address,
                                  street: newStreet,
                                  full: `${newStreet}, ${formData.info.address.postalCode} ${formData.info.address.city}`
                                }
                              }
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                          Code postal &amp; Ville :
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={formData.info.address.postalCode}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                info: {
                                  ...formData.info,
                                  address: {
                                    ...formData.info.address,
                                    postalCode: e.target.value
                                  }
                                }
                              })
                            }
                            className="w-20 px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                          />
                          <input
                            type="text"
                            value={formData.info.address.city}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                info: {
                                  ...formData.info,
                                  address: {
                                    ...formData.info.address,
                                    city: e.target.value
                                  }
                                }
                              })
                            }
                            className="flex-1 px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                        Informations d'accès / Parking :
                      </label>
                      <input
                        type="text"
                        value={formData.info.address.accessDetails}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            info: {
                              ...formData.info,
                              address: {
                                ...formData.info.address,
                                accessDetails: e.target.value
                              }
                            }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Opening Hours Editor */}
              {activeTab === 'hours' && (
                <div className="space-y-4">
                  <p className="text-xs text-[#6F6152]">
                    Modifiez les créneaux pour chaque jour de la semaine. Le badge d'ouverture sur le site se recalcule automatiquement.
                  </p>

                  <div className="space-y-3">
                    {formData.openingHours.map((slot, idx) => (
                      <div
                        key={slot.day}
                        className="p-3.5 rounded-xl border border-[#DECDBB] bg-[#FAF7F2] space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#1F3D2E]">{slot.day}</span>
                          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={slot.isOpen}
                              onChange={e => {
                                const updatedHours = [...formData.openingHours];
                                updatedHours[idx] = {
                                  ...updatedHours[idx],
                                  isOpen: e.target.checked
                                };
                                setFormData({ ...formData, openingHours: updatedHours });
                              }}
                              className="w-4 h-4 rounded text-[#2D5A43] focus:ring-[#2D5A43]"
                            />
                            <span>{slot.isOpen ? 'Ouvert au public' : 'Fermé au public'}</span>
                          </label>
                        </div>

                        {slot.isOpen && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <label className="block text-[#6F6152] mb-1">Créneau matin (ex: 09h00 - 12h00) :</label>
                              <input
                                type="text"
                                value={slot.morning || ''}
                                placeholder="Laisser vide si fermé le matin"
                                onChange={e => {
                                  const updatedHours = [...formData.openingHours];
                                  updatedHours[idx] = {
                                    ...updatedHours[idx],
                                    morning: e.target.value.trim() || null
                                  };
                                  setFormData({ ...formData, openingHours: updatedHours });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5C9B8] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[#6F6152] mb-1">Créneau après-midi (ex: 14h30 - 18h30) :</label>
                              <input
                                type="text"
                                value={slot.afternoon || ''}
                                placeholder="Ex: 14h30 - 18h30"
                                onChange={e => {
                                  const updatedHours = [...formData.openingHours];
                                  updatedHours[idx] = {
                                    ...updatedHours[idx],
                                    afternoon: e.target.value.trim() || null
                                  };
                                  setFormData({ ...formData, openingHours: updatedHours });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5C9B8] bg-white"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <input
                            type="text"
                            placeholder="Précision ou note (ex: Quai de déchargement ouvert, grande chine...)"
                            value={slot.notes || ''}
                            onChange={e => {
                              const updatedHours = [...formData.openingHours];
                              updatedHours[idx] = {
                                ...updatedHours[idx],
                                notes: e.target.value
                              };
                              setFormData({ ...formData, openingHours: updatedHours });
                            }}
                            className="w-full px-2.5 py-1 rounded-lg border border-[#E0D4C5] bg-white text-xs text-[#524538]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Notice Banner */}
              {activeTab === 'banner' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DECDBB] space-y-3">
                    <label className="flex items-center gap-2.5 cursor-pointer font-bold text-sm text-[#1F3D2E]">
                      <input
                        type="checkbox"
                        checked={formData.banner.enabled}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            banner: { ...formData.banner, enabled: e.target.checked }
                          })
                        }
                        className="w-4 h-4 rounded text-[#2D5A43] focus:ring-[#2D5A43]"
                      />
                      <span>Afficher un bandeau d'alerte / actualité en haut du site</span>
                    </label>

                    {formData.banner.enabled && (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                            Texte du message :
                          </label>
                          <textarea
                            rows={3}
                            value={formData.banner.message}
                            placeholder="Ex : Fermeture exceptionnelle ce jeudi pour inventaire. Réouverture vendredi à 9h !"
                            onChange={e =>
                              setFormData({
                                ...formData,
                                banner: { ...formData.banner, message: e.target.value }
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                            Style du bandeau :
                          </label>
                          <div className="flex gap-3 text-xs font-semibold">
                            {[
                              { id: 'info', label: 'Informatif (Vert/Émeraude)' },
                              { id: 'warning', label: 'Important (Ambre/Orange)' },
                              { id: 'alert', label: 'Urgent (Rose/Rouge)' }
                            ].map(item => (
                              <button
                                type="button"
                                key={item.id}
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    banner: { ...formData.banner, type: item.id as any }
                                  })
                                }
                                className={`px-3 py-1.5 rounded-lg border transition ${
                                  formData.banner.type === item.id
                                    ? 'bg-[#2D5A43] text-white border-[#2D5A43]'
                                    : 'bg-white text-[#453A2F] border-[#D5C9B8]'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Banner preview */}
                        <div className="mt-4 pt-3 border-t border-[#E8DEC7]">
                          <span className="text-[11px] font-bold uppercase text-[#736556]">
                            Aperçu en direct du bandeau :
                          </span>
                          <div
                            className={`mt-1.5 p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                              formData.banner.type === 'warning'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : formData.banner.type === 'alert'
                                ? 'bg-rose-100 text-rose-900 border border-rose-300'
                                : 'bg-[#E5ECE7] text-[#1F3D2E] border border-[#B9D4C2]'
                            }`}
                          >
                            <Bell className="w-4 h-4 shrink-0" />
                            <span>{formData.banner.message || 'Votre message ici...'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: GitHub API Configuration & REST Save */}
              {activeTab === 'github' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DECDBB] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-[#1F3D2E] flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        <span>Paramètres de connexion GitHub REST API</span>
                      </span>
                      <a
                        href="https://github.com/settings/tokens?type=beta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#2D5A43] underline font-semibold inline-flex items-center gap-1"
                      >
                        <span>Créer un token GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* GitHub Token Field */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                        Personal Access Token (PAT) GitHub * :
                      </label>
                      <div className="relative">
                        <input
                          type={showToken ? 'text' : 'password'}
                          value={githubConfig.token}
                          onChange={e => updateGitHubConfig({ token: e.target.value })}
                          placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-xs font-mono pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowToken(!showToken)}
                          className="absolute right-3 top-2.5 text-[#736758]"
                        >
                          {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-[11px] text-[#786C5F] mt-1">
                        Requis pour l'écriture sur votre dépôt. Utilisez un token classique avec le scope <code>repo</code> ou un Fine-grained token avec la permission <code>Contents: Read and write</code>.
                      </p>
                    </div>

                    {/* Owner & Repo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[#54483C] font-semibold mb-1">
                          Nom du compte GitHub (Owner) * :
                        </label>
                        <input
                          type="text"
                          value={githubConfig.owner}
                          onChange={e => updateGitHubConfig({ owner: e.target.value })}
                          placeholder="Ex : votre-nom-utilisateur"
                          className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[#54483C] font-semibold mb-1">
                          Nom du dépôt (Repository) * :
                        </label>
                        <input
                          type="text"
                          value={githubConfig.repo}
                          onChange={e => updateGitHubConfig({ repo: e.target.value })}
                          placeholder="Ex : le-grenier-de-mezos"
                          className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white font-mono"
                        />
                      </div>
                    </div>

                    {/* Branch & Path */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[#54483C] font-semibold mb-1">
                          Branche :
                        </label>
                        <input
                          type="text"
                          value={githubConfig.branch}
                          onChange={e => updateGitHubConfig({ branch: e.target.value })}
                          placeholder="main"
                          className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[#54483C] font-semibold mb-1">
                          Fichier cible à mettre à jour :
                        </label>
                        <input
                          type="text"
                          value={githubConfig.filePath}
                          onChange={e => updateGitHubConfig({ filePath: e.target.value })}
                          placeholder="src/data/siteContent.json"
                          className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white font-mono"
                        />
                      </div>
                    </div>

                    {/* Commit Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#54483C] mb-1">
                        Message du commit GitHub :
                      </label>
                      <input
                        type="text"
                        value={customCommitMessage}
                        onChange={e => setCustomCommitMessage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-white text-xs"
                      />
                    </div>
                  </div>

                  {/* REST API Call Action Card */}
                  <div className="p-4 rounded-xl bg-[#E8EFEA] border border-[#B9D5C3] space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2D5A43]" />
                      <span className="font-bold text-xs uppercase tracking-wide text-[#1E3024]">
                        Envoi automatique via l'API REST de GitHub
                      </span>
                    </div>
                    <p className="text-xs text-[#496152] leading-relaxed">
                      En cliquant sur le bouton ci-dessous, l'application exécute une requête <code>GET</code> pour récupérer le SHA actuel de votre fichier sur GitHub, encode le nouveau contenu en Base64, puis exécute la requête <code>PUT</code> pour commiter la modification directement sur votre branche <code>{githubConfig.branch || 'main'}</code>.
                    </p>

                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handlePushGitHub}
                      className="w-full py-3 px-4 rounded-xl bg-[#2D5A43] text-white font-semibold text-sm hover:bg-[#204030] disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#A3C9A8]" />
                          <span>Communication avec l'API GitHub...</span>
                        </>
                      ) : (
                        <>
                          <Github className="w-4 h-4" />
                          <span>Pousser les modifications sur GitHub (Requête PUT)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: Standalone Single File Code (Exportable) */}
              {activeTab === 'standalone' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#1F3D2E]">
                        Fichier autonome HTML/JS/CSS intégrable
                      </h4>
                      <p className="text-xs text-[#6C5E50]">
                        Conformément à votre demande, voici le code propre en un seul fichier contenant la fonction JavaScript REST API PUT vers GitHub.
                      </p>
                    </div>

                    <button
                      onClick={copyStandaloneCode}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#204231] transition"
                    >
                      {copiedStandalone ? <Check className="w-3.5 h-3.5 text-[#A3C9A8]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedStandalone ? 'Copié !' : 'Copier tout le code'}</span>
                    </button>
                  </div>

                  <div className="relative rounded-2xl bg-[#1E2522] text-[#A5D6B6] p-4 text-xs font-mono overflow-x-auto max-h-[380px] shadow-inner">
                    <pre className="whitespace-pre">{standaloneSnippet}</pre>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-4 bg-[#FAF7F2] border-t border-[#DECDBB] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetToDefault}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition"
                  title="Rétablir les données d'origine"
                >
                  Réinitialiser aux valeurs d'origine
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleApplyLocally}
                  className="px-4 py-2 rounded-xl bg-white border border-[#D5C9B8] text-[#342D24] text-xs font-semibold hover:bg-[#F2ECE1] transition"
                  title="Applique immédiatement sur la page et sauvegarde en mémoire locale"
                >
                  <Save className="w-3.5 h-3.5 inline mr-1 text-[#2D5A43]" />
                  <span>Tester / Sauvegarder en local</span>
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handlePushGitHub}
                  className="px-5 py-2 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#204231] disabled:opacity-50 transition flex items-center gap-1.5 shadow-xs"
                >
                  {isSaving ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Github className="w-3.5 h-3.5" />
                  )}
                  <span>Publier sur GitHub</span>
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
