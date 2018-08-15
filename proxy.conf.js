const environment = require('./generated_modules/environment/environment.json').environment;

const environmentBackendUrlMapping = require('./lib/environment/environment-backend-url-mapping.json');

const environmentBackendUrl = environmentBackendUrlMapping[environment];

if (!environmentBackendUrl) {
  throw new Error('No such enviromnent found: ' + environment);
}

const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/briefcase",
      "/artichoke",
      "/files"
    ],
    target: environmentBackendUrl,
    changeOrigin: true,
    logLevel: "debug",
    ws: true
  }
];

module.exports = PROXY_CONFIG;
