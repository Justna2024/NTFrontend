import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'
import TranslationPL from './locales/pl.json'
import TranslationEN from './locales/en.json'

const resources = {
    en:{
        translation: TranslationEN
    },
    pl:{
        translation: TranslationPL
    }
}




i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng:'en',
        resources
    
})

export default i18n