export interface OpeningHoursDay {
  day: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  morning: string | null;
  afternoon: string | null;
  isOpen: boolean;
  notes?: string;
}

export interface RecyclerieDepartment {
  id: string;
  name: string;
  description: string;
  icon: string;
  examples: string[];
  tips: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'don' | 'achat' | 'enlevement' | 'general';
}

export interface ItemAcceptanceStatus {
  category: string;
  accepted: string[];
  refused: string[];
  advice: string;
}

export interface NoticeBanner {
  enabled: boolean;
  message: string;
  type: 'info' | 'warning' | 'alert';
}

export interface SiteInfo {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    department: string;
    region: string;
    full: string;
    accessDetails: string;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    emailEnlevements: string;
  };
  maps: {
    googleMapsUrl: string;
    directionsUrl: string;
    wazeUrl: string;
    lat: number;
    lng: number;
  };
}

export interface SiteContent {
  info: SiteInfo;
  openingHours: OpeningHoursDay[];
  banner: NoticeBanner;
}

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  filePath: string;
}

export interface GitHubUpdateParams {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  filePath: string;
  content: string;
  commitMessage: string;
}

export interface GitHubUpdateResult {
  success: boolean;
  commitUrl?: string;
  commitSha?: string;
  message: string;
  status?: number;
}
