import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, GitHubConfig, GitHubUpdateResult } from '../types';
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent';
import { updateGitHubFile } from '../services/githubApi';

const STORAGE_KEY_CONTENT = 'grenier_mezos_custom_content';
const STORAGE_KEY_GITHUB = 'grenier_mezos_github_config';

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetToDefault: () => void;
  hasCustomChanges: boolean;
  githubConfig: GitHubConfig;
  updateGitHubConfig: (config: Partial<GitHubConfig>) => void;
  saveToGitHub: (customCommitMessage?: string) => Promise<GitHubUpdateResult>;
  isSaving: boolean;
  lastSaveResult: GitHubUpdateResult | null;
  clearLastSaveResult: () => void;
}

const defaultGitHubConfig: GitHubConfig = {
  token: '',
  owner: '',
  repo: 'le-grenier-de-mezos',
  branch: 'main',
  filePath: 'src/data/siteContent.json'
};

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with default to ensure no missing properties
        return {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          info: { ...DEFAULT_SITE_CONTENT.info, ...parsed.info },
          banner: { ...DEFAULT_SITE_CONTENT.banner, ...parsed.banner }
        };
      }
    } catch (e) {
      console.error('Error loading custom content from localStorage', e);
    }
    return DEFAULT_SITE_CONTENT;
  });

  const [githubConfig, setGithubConfig] = useState<GitHubConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GITHUB);
      if (saved) {
        return { ...defaultGitHubConfig, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error loading GitHub config from localStorage', e);
    }
    return defaultGitHubConfig;
  });

  const [hasCustomChanges, setHasCustomChanges] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_CONTENT) !== null;
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaveResult, setLastSaveResult] = useState<GitHubUpdateResult | null>(null);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    setHasCustomChanges(true);
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(newContent));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const resetToDefault = () => {
    setContent(DEFAULT_SITE_CONTENT);
    setHasCustomChanges(false);
    localStorage.removeItem(STORAGE_KEY_CONTENT);
  };

  const updateGitHubConfig = (partial: Partial<GitHubConfig>) => {
    setGithubConfig(prev => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY_GITHUB, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save github config', e);
      }
      return updated;
    });
  };

  const saveToGitHub = async (customCommitMessage?: string): Promise<GitHubUpdateResult> => {
    setIsSaving(true);
    setLastSaveResult(null);

    // Prepare JSON content string formatted nicely
    const jsonString = JSON.stringify(content, null, 2);

    const result = await updateGitHubFile({
      token: githubConfig.token,
      owner: githubConfig.owner,
      repo: githubConfig.repo,
      branch: githubConfig.branch || 'main',
      filePath: githubConfig.filePath || 'src/data/siteContent.json',
      content: jsonString,
      commitMessage: customCommitMessage || `Mise à jour du site via l'interface admin - ${new Date().toLocaleDateString('fr-FR')}`
    });

    setIsSaving(false);
    setLastSaveResult(result);
    return result;
  };

  const clearLastSaveResult = () => setLastSaveResult(null);

  return (
    <SiteContentContext.Provider
      value={{
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
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = (): SiteContentContextType => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
