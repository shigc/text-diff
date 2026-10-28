import type zhCN from './locales/zh-CN';

export type Locale = 'zh-CN' | 'zh-TW' | 'en' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'ru' | 'pt';

export const LOCALES: readonly Locale[] = [
  'zh-CN',
  'zh-TW',
  'en',
  'ja',
  'ko',
  'es',
  'fr',
  'de',
  'ru',
  'pt',
];

/** 语言名以「母语自称」展示，不随界面语言变化 */
export const LOCALE_NAMES: Record<Locale, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ru: 'Русский',
  pt: 'Português',
};

/** 以 zh-CN 字典的键为唯一事实来源，保证各语言键完整 */
export type TranslationKey = keyof typeof zhCN;

export type Messages = Record<TranslationKey, string>;
