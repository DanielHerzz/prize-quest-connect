
import { useState, useCallback } from 'react';

export type Language = 'ar' | 'en';

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  // Header
  'site.title': {
    ar: 'اربح جوائز مذهلة',
    en: 'Win Amazing Prizes'
  },
  'site.subtitle': {
    ar: 'شارك في السحوبات المجانية واحصل على فرصة للفوز بأحدث الأجهزة والجوائز النقدية',
    en: 'Participate in free giveaways and get a chance to win the latest devices and cash prizes'
  },
  'stats.participants': {
    ar: 'مشارك',
    en: 'Participants'
  },
  'stats.winners': {
    ar: 'فائز',
    en: 'Winners'
  },
  'stats.prizeValue': {
    ar: 'قيمة الجوائز',
    en: 'Prize Value'
  },
  'stats.continuous': {
    ar: 'سحوبات مستمرة',
    en: 'Continuous Draws'
  },
  // Prizes
  'prizes.availableNow': {
    ar: 'الجوائز المتاحة الآن',
    en: 'Prizes Available Now'
  },
  'prizes.chooseToParticipate': {
    ar: 'اختر الجائزة التي تريد المشاركة في السحب عليها',
    en: 'Choose the prize you want to participate in the draw for'
  },
  'prizes.participantsRemaining': {
    ar: 'المشاركات المتبقية',
    en: 'Remaining Participants'
  },
  'button.participateInDraw': {
    ar: 'شارك في السحب',
    en: 'Participate in Draw'
  },
  // Registration
  'registration.startNow': {
    ar: 'ابدأ المشاركة الآن',
    en: 'Start Participating Now'
  },
  'registration.description': {
    ar: 'أدخل بريدك الإلكتروني وأكمل عرضًا واحدًا للمشاركة في جميع السحوبات',
    en: 'Enter your email and complete one offer to participate in all draws'
  },
  'email.placeholder': {
    ar: 'أدخل بريدك الإلكتروني',
    en: 'Enter your email address'
  },
  'button.subscribeNow': {
    ar: 'اشترك مجانًا',
    en: 'Subscribe for Free'
  },
  'registration.guarantee': {
    ar: 'مجاني 100% • لا توجد رسوم خفية • سحوبات عادلة وشفافة',
    en: '100% Free • No Hidden Fees • Fair and Transparent Draws'
  },
  // Winners
  'winners.title': {
    ar: 'قائمة الفائزين',
    en: 'Winners List'
  },
  'winners.subtitle': {
    ar: 'جميع الفائزين حقيقيون ومؤكدون مع إثباتات الاستلام',
    en: 'All winners are real and verified with delivery proofs'
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = useCallback((key: string): string => {
    return translations[key]?.[language] || key;
  }, [language]);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return { t, language, changeLanguage };
};
