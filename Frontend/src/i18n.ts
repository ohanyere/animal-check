import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import  i18n  from "i18next"

import  hometranslationEN from "../src/locales/en/home.json"
import  hometranslationDE from "../src/locales/de/home.json"
import  hometranslationFR from "../src/locales/fr/home.json"
import  hometranslationNL from "../src/locales/nl/home.json"
import  hometranslationIG from "../src/locales/ig/home.json"
import  hometranslationYB from "../src/locales/yb/home.json"


const resources = {
    en : {translation : hometranslationEN},
    fr : {translation : hometranslationFR},
    de : {translation : hometranslationDE},
    nl : {translation : hometranslationNL},
    ig : {translation : hometranslationIG},
    yb : {translation : hometranslationYB}
}

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources,
    fallbackLng : "en",
    interpolation: {
      escapeValue: false
    }

})

export default i18n