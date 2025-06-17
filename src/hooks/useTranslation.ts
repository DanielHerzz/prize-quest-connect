
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
  'prizes.drawWhenComplete': {
    ar: 'السحب عند اكتمال',
    en: 'Draw when'
  },
  'prizes.participant': {
    ar: 'مشارك',
    en: 'participants complete'
  },
  'prizes.completed': {
    ar: 'مكتمل - جاري التحضير للسحب',
    en: 'Completed - Preparing for draw'
  },
  'button.participateInDraw': {
    ar: 'شارك في السحب',
    en: 'Participate in Draw'
  },
  'button.completed': {
    ar: 'مكتمل',
    en: 'Completed'
  },
  // Social Media
  'social.followUs': {
    ar: 'تابعنا على وسائل التواصل',
    en: 'Follow Us on Social Media'
  },
  'social.getUpdates': {
    ar: 'احصل على التحديثات الفورية وفرص إضافية للفوز',
    en: 'Get instant updates and additional chances to win'
  },
  'social.telegram': {
    ar: 'انضم لقناة تليجرام',
    en: 'Join Telegram Channel'
  },
  'social.facebook': {
    ar: 'تابعنا على فيسبوك',
    en: 'Follow on Facebook'
  },
  'social.instagram': {
    ar: 'تابعنا على إنستاجرام',
    en: 'Follow on Instagram'
  },
  // Draw Countdown
  'countdown.nextDraw': {
    ar: 'السحب القادم خلال',
    en: 'Next Draw In'
  },
  'countdown.days': {
    ar: 'يوم',
    en: 'Days'
  },
  'countdown.hours': {
    ar: 'ساعة',
    en: 'Hours'
  },
  'countdown.minutes': {
    ar: 'دقيقة',
    en: 'Minutes'
  },
  'countdown.seconds': {
    ar: 'ثانية',
    en: 'Seconds'
  },
  'countdown.automatic': {
    ar: 'السحب يتم تلقائيًا عند انتهاء الوقت أو اكتمال العدد المطلوب',
    en: 'Draw happens automatically when time ends or required number is reached'
  },
  // Transparency
  'transparency.title': {
    ar: 'كيف يتم اختيار الفائزين؟',
    en: 'How are winners selected?'
  },
  'transparency.proof': {
    ar: 'إثبات السحب',
    en: 'Draw Proof'
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
  },
  'winners.winner': {
    ar: 'الفائز:',
    en: 'Winner:'
  },
  'winners.delivered': {
    ar: 'تم تسليم الجائزة بنجاح',
    en: 'Prize delivered successfully'
  },
  'winners.transparency': {
    ar: 'شفافية كاملة',
    en: 'Complete Transparency'
  },
  'winners.fairDraw': {
    ar: 'سحب عادل',
    en: 'Fair Draw'
  },
  'winners.randomAlgorithm': {
    ar: 'خوارزمية عشوائية',
    en: 'Random Algorithm'
  },
  'winners.guaranteedDelivery': {
    ar: 'تسليم مضمون',
    en: 'Guaranteed Delivery'
  },
  'winners.deliveryTime': {
    ar: 'خلال 3-5 أيام',
    en: 'Within 3-5 days'
  },
  'winners.regularProofs': {
    ar: 'إثباتات دورية',
    en: 'Regular Proofs'
  },
  'winners.weeklyUpdate': {
    ar: 'تحديث أسبوعي',
    en: 'Weekly Update'
  },
  'winners.description': {
    ar: 'جميع الفائزين حقيقيون ويتم الإعلان عنهم فور إجراء السحب. نحن نؤمن بالشفافية الكاملة ونشارك إثباتات تسليم الجوائز.',
    en: 'All winners are real and announced immediately after the draw. We believe in complete transparency and share proof of prize delivery.'
  },
  // Participation Status
  'participation.yourStatus': {
    ar: 'حالة مشاركاتك',
    en: 'Your Participation Status'
  },
  'participation.qualified': {
    ar: 'مؤهل للسحب',
    en: 'Qualified for Draw'
  },
  'participation.pending': {
    ar: 'بانتظار التحقق',
    en: 'Pending Verification'
  },
  'participation.failed': {
    ar: 'لم يكتمل العرض',
    en: 'Offer Not Completed'
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
