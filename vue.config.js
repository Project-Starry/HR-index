module.exports = {
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        "/",
        "/about./games",
        "/teams",
        "/contact",
        "/calendar",
        "/teams",
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
    },
  },

  publicPath: process.env.NODE_ENV === "production" ? "/HR-official/" : "/",
};
