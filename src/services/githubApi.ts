import { GitHubUpdateParams, GitHubUpdateResult } from '../types';

/**
 * Encode safely UTF-8 string to Base64 in browser (supporting accents, emojis, etc.)
 */
export function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Decode Base64 string to UTF-8 in browser
 */
export function base64ToUtf8(base64: string): string {
  const cleanBase64 = base64.replace(/\s/g, '');
  const binary = atob(cleanBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Fetch the current blob SHA of a file in GitHub repository
 */
export async function getGitHubFileSha(
  token: string,
  owner: string,
  repo: string,
  branch: string,
  filePath: string
): Promise<{ exists: boolean; sha?: string; error?: string; status?: number }> {
  const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${cleanPath}?ref=${encodeURIComponent(branch)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.trim()}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (response.status === 404) {
      // File does not exist yet; will create a new file
      return { exists: false };
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        exists: false,
        status: response.status,
        error: errData.message || `Erreur GitHub HTTP ${response.status}`
      };
    }

    const data = await response.json();
    return {
      exists: true,
      sha: data.sha
    };
  } catch (err: any) {
    return {
      exists: false,
      error: err.message || 'Impossible de joindre l’API GitHub.'
    };
  }
}

/**
 * Update or create a file in a GitHub repository using the GitHub REST API (PUT)
 */
export async function updateGitHubFile(params: GitHubUpdateParams): Promise<GitHubUpdateResult> {
  const { token, owner, repo, branch, filePath, content, commitMessage } = params;

  if (!token?.trim()) {
    return {
      success: false,
      message: 'Le token GitHub (Personal Access Token) est requis.'
    };
  }

  if (!owner?.trim() || !repo?.trim()) {
    return {
      success: false,
      message: 'Veuillez renseigner le propriétaire (compte) et le nom du dépôt GitHub.'
    };
  }

  const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;

  // 1. Récupérer le SHA actuel du fichier s'il existe déjà
  const shaResult = await getGitHubFileSha(token, owner, repo, branch, cleanPath);

  if (shaResult.error && shaResult.status !== 404) {
    if (shaResult.status === 401) {
      return {
        success: false,
        status: 401,
        message: 'Token GitHub invalide ou expiré (Erreur 401 Bad credentials). Vérifiez que votre token est correct.'
      };
    }
    if (shaResult.status === 404) {
      return {
        success: false,
        status: 404,
        message: `Dépôt introuvable : ${owner}/${repo} sur la branche "${branch}". Vérifiez le nom exact.`
      };
    }
    if (shaResult.status === 403) {
      return {
        success: false,
        status: 403,
        message: 'Permissions insuffisantes (Erreur 403). Assurez-vous que votre token dispose des droits "Contents: Read & write" ou scope "repo".'
      };
    }
  }

  // 2. Encoder le contenu en Base64 UTF-8
  let base64Content: string;
  try {
    base64Content = utf8ToBase64(content);
  } catch (encodeError: any) {
    return {
      success: false,
      message: `Erreur d'encodage du fichier : ${encodeError.message}`
    };
  }

  // 3. Préparer le payload PUT
  const payload: Record<string, any> = {
    message: commitMessage || `Mise à jour de ${cleanPath} via l'espace administration`,
    content: base64Content,
    branch: branch || 'main'
  };

  if (shaResult.exists && shaResult.sha) {
    payload.sha = shaResult.sha;
  }

  const putUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${cleanPath}`;

  try {
    const putResponse = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.trim()}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify(payload)
    });

    const responseData = await putResponse.json().catch(() => ({}));

    if (!putResponse.ok) {
      let customMsg = responseData.message || `Erreur GitHub HTTP ${putResponse.status}`;

      if (putResponse.status === 401) {
        customMsg = 'Token GitHub invalide ou révoqué (Erreur 401).';
      } else if (putResponse.status === 404) {
        customMsg = `Dépôt "${owner}/${repo}" introuvable ou branche "${branch}" inexistante (Erreur 404).`;
      } else if (putResponse.status === 409) {
        customMsg = 'Conflit de version GitHub (Erreur 409) : le fichier a été modifié ailleurs depuis le chargement. Réessayez pour resynchroniser.';
      } else if (putResponse.status === 403) {
        customMsg = 'Accès refusé (Erreur 403) : Votre token ne possède pas les permissions d’écriture sur ce dépôt.';
      } else if (putResponse.status === 422) {
        customMsg = `Validation échouée (Erreur 422) : ${responseData.message || 'Contenu ou SHA invalide'}`;
      }

      return {
        success: false,
        status: putResponse.status,
        message: customMsg
      };
    }

    // Succès !
    const commitUrl = responseData?.commit?.html_url;
    const commitSha = responseData?.commit?.sha?.substring(0, 7);

    return {
      success: true,
      commitUrl,
      commitSha,
      status: putResponse.status,
      message: `Modifications enregistrées avec succès sur GitHub ! (Commit ${commitSha || ''})`
    };
  } catch (networkError: any) {
    return {
      success: false,
      message: `Erreur de connexion réseau : ${networkError.message || 'Impossible de contacter GitHub.'}`
    };
  }
}
