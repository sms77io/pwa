const locale = window.navigator ? window.navigator.language : 'en-US';

export const numberFormatter = new Intl.NumberFormat(locale, {
    currency: 'EUR',
    style: 'currency',
});