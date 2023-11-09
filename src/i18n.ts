import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";
import {LOCAL_STORAGE_KEYS} from "./constants/localStorageKeys";

const getLng = (): string => {
  let lng = localStorage.getItem(LOCAL_STORAGE_KEYS.language);
  if (!lng) {
    lng = navigator.language.slice(0, 2);
    localStorage.setItem(LOCAL_STORAGE_KEYS.language, lng);
  }
  return lng;
}

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    // returnNull: false,
    fallbackLng: "en",
    lng: getLng(),
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
