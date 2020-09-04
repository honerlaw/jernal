import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as resources from '../../translations/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: resources as any,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });