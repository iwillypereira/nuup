module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/nuup-master/" : "/",
  transpileDependencies: ["vuetify"],

  assetsDir: "assets",

  pluginOptions: {
    i18n: {
      locale: "es",
      fallbackLocale: "es",
      localeDir: "lang",
      enableInSFC: true,
    },
  },
};
