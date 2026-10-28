import type { Locale, Messages, TranslationKey } from './types';
import { LOCALES } from './types';
import zhCN from './locales/zh-CN';
import zhTW from './locales/zh-TW';
import en from './locales/en';
import ja from './locales/ja';
import ko from './locales/ko';
import es from './locales/es';
import fr from './locales/fr';
import de from './locales/de';
import ru from './locales/ru';
import pt from './locales/pt';

const DICTS: Record<Locale, Messages> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  en,
  ja,
  ko,
  es,
  fr,
  de,
  ru,
  pt,
};

const FALLBACK: Locale = 'zh-CN';
const STORAGE_KEY = 'text-diff:locale';

let current: Locale = FALLBACK;
const listeners = new Set<() => void>();

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** 归一化浏览器语言标签到受支持的语言 */
function matchLocale(raw: string): Locale | null {
  if (!raw) return null;
  const tag = raw.toLowerCase();
  if (tag === 'zh' || tag.startsWith('zh-')) {
    return /(hant|tw|hk|mo)/.test(tag) ? 'zh-TW' : 'zh-CN';
  }
  const main = tag.split('-')[0];
  for (const locale of LOCALES) {
    const l = locale.toLowerCase();
    if (l === tag || l === main) return locale;
  }
  return null;
}

/** 优先 localStorage，其次浏览器语言，最后回落简体中文 */
export function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isLocale(saved)) return saved;
  } catch {
    /* localStorage 不可用时忽略 */
  }
  const langs =
    navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const raw of langs) {
    const matched = matchLocale(raw);
    if (matched) return matched;
  }
  return FALLBACK;
}

export function getLocale(): Locale {
  return current;
}

export function setLocale(locale: Locale): void {
  if (!isLocale(locale)) return;
  current = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* 忽略写入失败 */
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
    applyI18n(document);
  }
  listeners.forEach((fn) => fn());
}

export function initI18n(): Locale {
  current = detectLocale();
  if (typeof document !== 'undefined') {
    document.documentElement.lang = current;
    applyI18n(document);
  }
  return current;
}

export function onLocaleChange(fn: () => void): void {
  listeners.add(fn);
}

/** 取当前语言的文案；缺失时回落 zh-CN，再缺失则回显键名 */
export function t(key: TranslationKey, params?: Record<string, string | number>): string {
  const dict = DICTS[current] ?? DICTS[FALLBACK];
  let str = dict[key] ?? DICTS[FALLBACK][key] ?? key;
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      str = str.split(`{${name}}`).join(String(value));
    }
  }
  return str;
}

/**
 * 替换带有 data-i18n* 属性的静态节点文案。
 * - data-i18n -> textContent（<title> 亦生效，会同步 document.title）
 * - data-i18n-placeholder -> placeholder
 * - data-i18n-title -> title
 */
export function applyI18n(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n as TranslationKey);
  });
  root.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
    (el as HTMLInputElement | HTMLTextAreaElement).placeholder = t(
      el.dataset.i18nPlaceholder as TranslationKey,
    );
  });
  root.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle as TranslationKey);
  });
}
