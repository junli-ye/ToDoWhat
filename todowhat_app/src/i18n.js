import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import zh from "./locales/zh.json";
import fr from "./locales/fr.json";

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  fr: { translation: fr },
};

i18n
  .use(LanguageDetector) // 使用语言检测插件
  .use(initReactI18next) // 必须使用这个初始化 React
  .init({
    resources,
    lng: "en", // 默认语言
    fallbackLng: "en", // 回退语言
    interpolation: {
      escapeValue: false, // React 默认已经防止了 XSS
    },
  });

export default i18n;