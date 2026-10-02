import React, { useState } from 'react';
import { X, Github, Copy, Check, Terminal, ExternalLink, Globe, BookOpen, Sparkles, FolderArchive } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('votre-utilisateur-github');
  const [repoName, setRepoName] = useState('le-grenier-de-mezos');
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'git' | 'deploy' | 'files'>('git');

  if (!isOpen) return null;

  const cleanUser = username.trim() || 'votre-nom-d-utilisateur';
  const cleanRepo = repoName.trim() || 'le-grenier-de-mezos';
  const repoUrl = `https://github.com/${cleanUser}/${cleanRepo}.git`;

  const gitCommands = `# 1. Initialiser le dépôt git local (si ce n'est pas déjà fait)
git init
git branch -M main

# 2. Ajouter tous les fichiers du projet
git add .

# 3. Créer le premier commit
git commit -m "feat: site officiel Le Grenier de Mézos (recyclerie & ressourcerie)"

# 4. Lier votre dépôt GitHub distant
git remote add origin ${repoUrl}

# 5. Pousser le code vers GitHub
git push -u origin main`;

  const handleCopyAll = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#DECDBB] max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#1F3D2E] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold tracking-tight">
                Publier le code sur GitHub
              </h3>
              <p className="text-xs text-white/70">
                Guide simple pour héberger et versionner le site de votre recyclerie
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

        {/* Tab Bar */}
        <div className="flex border-b border-[#E8DFC8] bg-[#FAF7F2] px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('git')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === 'git'
                ? 'border-[#2D5A43] text-[#2D5A43]'
                : 'border-transparent text-[#706456] hover:text-[#2D5A43]'
            }`}
          >
            Commandes Git (Rapide)
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === 'deploy'
                ? 'border-[#2D5A43] text-[#2D5A43]'
                : 'border-transparent text-[#706456] hover:text-[#2D5A43]'
            }`}
          >
            Déploiement en ligne gratuit
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === 'files'
                ? 'border-[#2D5A43] text-[#2D5A43]'
                : 'border-transparent text-[#706456] hover:text-[#2D5A43]'
            }`}
          >
            Structure du projet
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#352D24]">
          
          {activeTab === 'git' && (
            <div className="space-y-5">
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DECDBB] space-y-3">
                <span className="text-xs font-bold uppercase text-[#2D5A43]">
                  Étape 1 : Personnalisez vos identifiants GitHub
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#5B4F42] font-semibold mb-1">
                      Votre nom d'utilisateur GitHub :
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Ex: mon-compte"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5B4F42] font-semibold mb-1">
                      Nom du dépôt :
                    </label>
                    <input
                      type="text"
                      value={repoName}
                      onChange={e => setRepoName(e.target.value)}
                      placeholder="Ex: grenier-de-mezos"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#54483C] flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#2D5A43]" />
                    <span>Étape 2 : Exécutez ces commandes dans le terminal</span>
                  </span>
                  <button
                    onClick={handleCopyAll}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-[#2D5A43] text-white hover:bg-[#204030] transition"
                  >
                    {copiedAll ? <Check className="w-3 h-3 text-[#A3C9A8]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedAll ? 'Copié !' : 'Copier tout'}</span>
                  </button>
                </div>

                <div className="relative rounded-xl bg-[#1E2522] text-[#A5D6B6] p-4 text-xs font-mono overflow-x-auto shadow-inner">
                  <pre className="whitespace-pre">{gitCommands}</pre>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F0EAE1] text-xs text-[#56493C] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                <div>
                  <strong>Prérequis :</strong> Créez au préalable un nouveau dépôt vide sur{' '}
                  <a
                    href="https://github.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#2D5A43] font-semibold inline-flex items-center gap-0.5"
                  >
                    github.com/new <ExternalLink className="w-3 h-3 inline" />
                  </a>{' '}
                  avec le nom <code>{cleanRepo}</code> (sans cocher "Add a README" car le projet en contient déjà un complet).
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-4">
              <p className="text-xs text-[#5D5144]">
                Une fois votre code publié sur GitHub, vous pouvez le mettre en ligne gratuitement en 2 minutes :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1F3D2E]">Vercel (Recommandé)</span>
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      1 clic
                    </span>
                  </div>
                  <p className="text-xs text-[#5A4F43]">
                    Connectez votre compte GitHub sur <strong>vercel.com</strong>, sélectionnez le dépôt, et votre site sera en ligne avec HTTPS et nom de domaine personnalisé gratuit.
                  </p>
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#2D5A43] inline-flex items-center gap-1 hover:underline pt-1"
                  >
                    <span>Ouvrir Vercel</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1F3D2E]">GitHub Pages</span>
                    <span className="text-[11px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded">
                      Inclus
                    </span>
                  </div>
                  <p className="text-xs text-[#5A4F43]">
                    Dans l'onglet <strong>Settings &gt; Pages</strong> de votre dépôt GitHub, activez "GitHub Actions" pour compiler et déployer automatiquement à chaque modification de code.
                  </p>
                  <a
                    href="https://pages.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#2D5A43] inline-flex items-center gap-1 hover:underline pt-1"
                  >
                    <span>Guide GitHub Pages</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-[#54483C]">
                Fichiers inclus et prêts dans ce dépôt :
              </span>
              <div className="bg-[#FAF7F2] rounded-xl border border-[#DECDBB] p-4 text-xs font-mono space-y-1.5 text-[#352D24]">
                <div>📁 <strong>src/</strong> (Code React + TypeScript complet)</div>
                <div className="pl-4">├── <strong>components/</strong> (Header, Hero, Infos, Dons, Shop, FAQ, GitHub...)</div>
                <div className="pl-4">├── <strong>data/grenierData.ts</strong> (Données officielles Mézos)</div>
                <div className="pl-4">└── <strong>App.tsx &amp; main.tsx</strong> (Entrée principale)</div>
                <div>📄 <strong>index.html</strong> (SEO, métadonnées, OpenGraph, typographies)</div>
                <div>📄 <strong>package.json</strong> (Scripts de build Vite, Tailwind CSS v4)</div>
                <div>📄 <strong>README.md</strong> (Documentation complète en français)</div>
                <div>📄 <strong>.gitignore</strong> (Fichiers temporaires ignorés pour un repo propre)</div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#DECDBB] flex items-center justify-between">
          <span className="text-xs text-[#716456]">
            Projet prêt pour GitHub • 100% open &amp; personnalisable
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#204030] transition"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
