var PrerenderSpaPlugin = require("prerender-spa-plugin");
var path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== "production") return;

    return {
      plugins: [
        new PrerenderSpaPlugin(
          // Absolute path to compiled SPA
          path.resolve(__dirname, "dist"),
          // List of routes to prerender
          [
            "/",
            "/punchClock",
            "/about",
            "/games",
            "/teams",
            "/contact",
            "/calendar",
            "/teams",
          ]
        ),
      ],
    };
  },

  publicPath: process.env.NODE_ENV === "production" ? "/HR-official/" : "/",
};
