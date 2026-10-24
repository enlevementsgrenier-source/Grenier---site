import { OPENING_HOURS } from '../data/grenierData';
import { OpeningHoursDay } from '../types';

export interface ScheduleStatus {
  isOpenNow: boolean;
  statusLabel: string;
  detailLabel: string;
  badgeColor: 'emerald' | 'amber' | 'slate';
  currentDayName: string;
  currentDayIndex: number;
}

export function getCurrentScheduleStatus(customHours?: OpeningHoursDay[]): ScheduleStatus {
  const hours = customHours || OPENING_HOURS;
  const now = new Date();
  
  // Format current Paris time
  const parisTimeStr = now.toLocaleTimeString('fr-FR', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const [currentHour, currentMinute] = parisTimeStr.split(':').map(Number);
  const currentTimeDec = currentHour + currentMinute / 60;
  
  // Day of week: 0 = Dimanche, 1 = Lundi, 2 = Mardi, ..., 6 = Samedi
  const parisDayFormatter = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    weekday: 'long'
  });
  const currentDayNameRaw = parisDayFormatter.format(now);
  const currentDayName = currentDayNameRaw.charAt(0).toUpperCase() + currentDayNameRaw.slice(1);
  
  const parisDayIndexFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    weekday: 'short'
  });
  const shortDay = parisDayIndexFormatter.format(now);
  const dayIndexMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };
  const currentDayIndex = dayIndexMap[shortDay] ?? now.getDay();
  
  const todaySchedule = hours.find(d => d.dayIndex === currentDayIndex);

  if (!todaySchedule || !todaySchedule.isOpen) {
    return {
      isOpenNow: false,
      statusLabel: 'Fermé aujourd’hui',
      detailLabel: 'Réouverture mardi à 10h00',
      badgeColor: 'slate',
      currentDayName,
      currentDayIndex
    };
  }

  // Mardi à Samedi : 10h00 - 12h00 & 13h30 - 17h30
  if (currentDayIndex >= 2 && currentDayIndex <= 6) {
    const isMorningOpen = currentTimeDec >= 10.0 && currentTimeDec < 12.0;
    const isAfternoonOpen = currentTimeDec >= 13.5 && currentTimeDec < 17.5;
    
    if (isMorningOpen) {
      return {
        isOpenNow: true,
        statusLabel: 'Ouvert actuellement',
        detailLabel: 'Ferme à 12h00 (reprise à 13h30)',
        badgeColor: 'emerald',
        currentDayName,
        currentDayIndex
      };
    }
    if (currentTimeDec >= 12.0 && currentTimeDec < 13.5) {
      return {
        isOpenNow: false,
        statusLabel: 'Pause méridienne',
        detailLabel: 'Réouverture cet après-midi à 13h30',
        badgeColor: 'amber',
        currentDayName,
        currentDayIndex
      };
    }
    if (isAfternoonOpen) {
      return {
        isOpenNow: true,
        statusLabel: 'Ouvert actuellement',
        detailLabel: 'Ferme ce soir à 17h30',
        badgeColor: 'emerald',
        currentDayName,
        currentDayIndex
      };
    }
    if (currentTimeDec < 10.0) {
      return {
        isOpenNow: false,
        statusLabel: 'Fermé pour le moment',
        detailLabel: 'Ouvre aujourd’hui à 10h00',
        badgeColor: 'slate',
        currentDayName,
        currentDayIndex
      };
    }
    // After 17h30
    return {
      isOpenNow: false,
      statusLabel: 'Fermé pour la nuit',
      detailLabel: currentDayIndex === 6 ? 'Réouverture dimanche à 13h30' : 'Réouverture demain à 10h00',
      badgeColor: 'slate',
      currentDayName,
      currentDayIndex
    };
  }

  // Dimanche : 13h30 - 17h30
  if (currentDayIndex === 0) {
    const isAfternoonOpen = currentTimeDec >= 13.5 && currentTimeDec < 17.5;
    if (isAfternoonOpen) {
      return {
        isOpenNow: true,
        statusLabel: 'Ouvert actuellement',
        detailLabel: 'Ferme ce soir à 17h30',
        badgeColor: 'emerald',
        currentDayName,
        currentDayIndex
      };
    }
    if (currentTimeDec < 13.5) {
      return {
        isOpenNow: false,
        statusLabel: 'Ouverture cet après-midi',
        detailLabel: 'Ouvre aujourd’hui de 13h30 à 17h30',
        badgeColor: 'amber',
        currentDayName,
        currentDayIndex
      };
    }
    return {
      isOpenNow: false,
      statusLabel: 'Fermé pour le week-end',
      detailLabel: 'Réouverture mardi à 10h00 (lundi fermé)',
      badgeColor: 'slate',
      currentDayName,
      currentDayIndex
    };
  }

  return {
    isOpenNow: false,
    statusLabel: 'Fermé actuellement',
    detailLabel: 'Consultez les horaires détaillés',
    badgeColor: 'slate',
    currentDayName,
    currentDayIndex
  };
}
