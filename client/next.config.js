module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 900;
        return config;
    }
};