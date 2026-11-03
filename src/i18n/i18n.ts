import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";

export const languageLocales: Record<string, string> = {
  en: "en-US",
  es: "es-419",
  pt: "pt-BR",
};
const preferenceKey = "bruma.language.v1";
function initialLanguage() {
  try {
    const saved = localStorage.getItem(preferenceKey);
    if (saved && languageLocales[saved]) return saved;
  } catch {
    /* Browsing still works when storage is unavailable. */
  }
  return (
    navigator.languages
      .map((language) => language.split("-")[0])
      .find((language) => languageLocales[language]) ?? "en"
  );
}
void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt },
  },
  lng: initialLanguage(),
  fallbackLng: "en",
  supportedLngs: ["en", "es", "pt"],
  interpolation: { escapeValue: false },
});
document.documentElement.lang = languageLocales[i18n.language] ?? "en-US";
i18n.on("languageChanged", (language) => {
  document.documentElement.lang = languageLocales[language] ?? "en-US";
  try {
    localStorage.setItem(preferenceKey, language);
  } catch {
    /* Preference remains in memory. */
  }
});
export default i18n;
