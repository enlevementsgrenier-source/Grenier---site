import { SiteContent } from '../types';
import { GRENIER_INFO, OPENING_HOURS } from './grenierData';

export const DEFAULT_SITE_CONTENT: SiteContent = {
  info: GRENIER_INFO,
  openingHours: OPENING_HOURS,
  banner: {
    enabled: false,
    message: 'Bienvenue au Grenier de Mézos ! Dépôt de dons du mardi au samedi et enlèvement à domicile sur rendez-vous.',
    type: 'info'
  }
};
