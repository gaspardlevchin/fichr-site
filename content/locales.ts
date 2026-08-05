export const locales = ["fr", "en", "de", "es", "pt", "it"] as const;

export type Locale = (typeof locales)[number];

export const localeTags: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  de: "de-DE",
  es: "es-ES",
  pt: "pt-PT",
  it: "it-IT",
};

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  es: "Español",
  pt: "Português",
  it: "Italiano",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
