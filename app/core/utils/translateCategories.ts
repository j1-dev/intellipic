import translations from '@/app/core/resources/promptTranslations';

const translate = (key: string, lang: string = 'en'): string => {
  return translations[key]?.[lang] || key; // Default to the key if no translation found
};
export default translate;
