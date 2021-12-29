const rollbarOptions = (overrideOptions={}) => ({
    accessToken: process.env.ROLLBAR_BE_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    ...overrideOptions
});

module.exports = { rollbarOptions };