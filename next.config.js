const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,

  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
    register: true,
    publicExcludes: [],
    buildExcludes: [/middleware-manifest\.json$/],
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: getSecurityHeaders(),
      },
    ];
  },
});

function getSecurityHeaders() {
  return [
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "X-XSS-Protection",
      value: "1; mode=block",
    },
    {
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
    {
      key: "Permissions-Policy",
      value: "fullscreen=(), camera=*",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "origin-when-cross-origin",
    },
    // {
    //   key: "Content-Security-Policy",
    //   value:
    //     "default-src 'self'; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:; font-src 'self' https://fonts.gstatic.com",
    // },
  ];
}
