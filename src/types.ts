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
