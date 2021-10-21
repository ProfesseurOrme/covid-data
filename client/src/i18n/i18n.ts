import i18n from 'i18next';
import fr from "./locales/fr-translation.json";
import LanguageDetector from 'i18next-browser-languagedetector';
import {
    initReactI18next
} from 'react-i18next';

const resources = {
    fr: {
        translation : fr
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    lng: 'fr',
    fallbackLng: 'fr',
    resources,
    interpolation: {
        escapeValue : false
    },

})

export default i18n;