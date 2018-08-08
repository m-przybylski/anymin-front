const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/briefcase",
      "/artichoke",
      "/files"
    ],
    target: "https://dev.anymind.com",
    changeOrigin: true,
    logLevel: "debug",
    ws: true
  }
];

module.exports = PROXY_CONFIG;
