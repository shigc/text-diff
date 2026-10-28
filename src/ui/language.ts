import { LOCALES, LOCALE_NAMES } from '../i18n/types';
import { getLocale, isLocale, setLocale } from '../i18n';

/** 用支持的语言填充工具栏语言下拉，并绑定切换 */
export function setupLanguageSelect(): void {
  const select = document.getElementById('lang-select');
  if (!(select instanceof HTMLSelectElement)) return;

  for (const locale of LOCALES) {
    const option = document.createElement('option');
    option.value = locale;
    option.textContent = LOCALE_NAMES[locale];
    select.appendChild(option);
  }
  select.value = getLocale();

  select.addEventListener('change', () => {
    if (isLocale(select.value)) setLocale(select.value);
  });
}
