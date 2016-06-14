// You can set the environment in one of two ways: either from within the application with global.environment or as an environment variable. If there is no environment set then it defaults to 'development'.
module.exports = global.environment || process.env.NODE_ENV || 'development';
