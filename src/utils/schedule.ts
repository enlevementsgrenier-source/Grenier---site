import { OPENING_HOURS } from '../data/grenierData';

export interface ScheduleStatus {
  isOpenNow: boolean;
  statusLabel: string;
  detailLabel: string;
  badgeColor: 'emerald' | 'amber' | 'slate';
  currentDayName: string;
  currentDayIndex: number;
}

export function getCurrentScheduleStatus(): ScheduleStatus {
  // Get date in Europe/Paris timezone
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
  
  const todaySchedule = OPENING_HOURS.find(d => d.dayIndex === currentDayIndex);

  if (!todaySchedule || !todaySchedule.isOpen) {
    return {
      isOpenNow: false,
      statusLabel: 'Fermé aujourd’hui',
      detailLabel: 'Réouverture mardi à 09h00',
      badgeColor: 'slate',
      currentDayName,
      currentDayIndex
    };
  }

  // Parse today's morning and afternoon ranges
  let isMorningOpen = false;
  let isAfternoonOpen = false;
  
  // Mardi to Vendredi : 9h00 - 12h00 / 14h30 - 18h30
  // Samedi : 10h00 - 12h00 / 14h30 - 18h30
  // Dimanche : 14h30 - 18h30
  if (currentDayIndex >= 2 && currentDayIndex <= 5) {
    isMorningOpen = currentTimeDec >= 9.0 && currentTimeDec < 12.0;
    isAfternoonOpen = currentTimeDec >= 14.5 && currentTimeDec < 18.5;
    
    if (isMorningOpen) {
      return {
        isOpenNow: true,
        statusLabel: 'Ouvert actuellement',
        detailLabel: 'Ferme à 12h00 (reprise à 14h30)',
        badgeColor: 'emerald',
        currentDayName,
        currentDayIndex
      };
    }
    if (currentTimeDec >= 12.0 && currentTimeDec < 14.5) {
      return {
        isOpenNow: false,
        statusLabel: 'Pause méridienne',
        detailLabel: 'Réouverture cet après-midi à 14h30',
        badgeColor: 'amber',
        currentDayName,
        currentDayIndex
      };
    }
    if (isAfternoonOpen) {
      return {
        isOpenNow: true,
        statusLabel: 'Ouvert actuellement',
        detailLabel: 'Ferme ce soir à 18h30',
        badgeColor: 'emerald',
        currentDayName,
        currentDayIndex
      };
    }
    if (currentTimeDec < 9.0) {
      return {
        isOpenNow: false,
        statusLabel: 'Fermé pour le moment',
        detailLabel: 'Ouvre aujourd’hui à 09h00',
        badgeColor: 'slate',
        currentDayName,
        currentDayIndex
      };
    }
    return {
      isOpenNow: false,
      statusLabel: 'Fermé pour la nuit',
      detailLabel: 'Réouverture demain à 09h00',
      badgeColor: 'slate',
      currentDayName,
      currentDayIndex
    };
  }

  if (currentDayIndex === 6) { // Samedi
    isMorningOpen = currentTimeDec >= 10.0 && currentTimeDec < 12.0;
    isAfternoonOpen = currentTimeDec >= 14.5 && currentTimeDec < 18.5;

    if (isMorningOpen) {
      return {
        isOpenNow: true,
        statusLabel: 'Ouvert actuellement',
        detailLabel: 'Ferme à 12h00 (reprise à 14h30)',
        badgeColor: 'emerald',
        currentDayName,
        currentDayIndex
      };
    }
    if (currentTimeDec >= 12.0 && currentTimeDec < 14.5) {
      return {
        isOpenNow: false,
        statusLabel: 'Pause de midi',
        detailLabel: 'Réouverture à 14h30',
        badgeColor: 'amber',
        currentDayName,
        currentDayIndex
      };
    }
    if (isAfternoonOpen) {
      return {
        isOpenNow: true,
        statusLabel: 'Ouvert actuellement',
        detailLabel: 'Ferme ce soir à 18h30',
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
    return {
      isOpenNow: false,
      statusLabel: 'Fermé pour la nuit',
      detailLabel: 'Réouverture dimanche à 14h30',
      badgeColor: 'slate',
      currentDayName,
      currentDayIndex
    };
  }

  if (currentDayIndex === 0) { // Dimanche
    isAfternoonOpen = currentTimeDec >= 14.5 && currentTimeDec < 18.5;
    if (isAfternoonOpen) {
      return {
        isOpenNow: true,
        statusLabel: 'Ouvert actuellement',
        detailLabel: 'Ferme ce soir à 18h30',
        badgeColor: 'emerald',
        currentDayName,
        currentDayIndex
      };
    }
    if (currentTimeDec < 14.5) {
      return {
        isOpenNow: false,
        statusLabel: 'Ouverture cet après-midi',
        detailLabel: 'Ouvre aujourd’hui de 14h30 à 18h30',
        badgeColor: 'amber',
        currentDayName,
        currentDayIndex
      };
    }
    return {
      isOpenNow: false,
      statusLabel: 'Fermé pour le week-end',
      detailLabel: 'Réouverture mardi à 09h00 (lundi fermé)',
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
