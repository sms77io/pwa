import app from '@sms77.io/react-components';

app({
    options: {
        sentWith: 'PWA'
    },
    serviceWorker: true,
    onClickExternalLink: url => window.location.assign(url),
});