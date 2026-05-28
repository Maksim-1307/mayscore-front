const isDev =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

const config = {
    API_URL: isDev
        ? 'http://localhost:8080/api/'
        : 'https://mayscor.ru/api/',
    IS_DEV: isDev,
};

export default config;