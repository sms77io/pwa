import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en';

const options = {
    interpolation: {
        escapeValue: false, // react already prevents xss
    },
    lng: 'en',
    resources: {
        en,
    },
};

i18next
    .use(initReactI18next) // pass i18n down to react-i18next
    .init(options);

export default i18next;