import Vue from "vue";
import Vuetify from "vuetify/lib";
import es from "vuetify/es5/locale/es";
import colorLight from "./theme/light";
import colorDark from "./theme/dark";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: false,
    },
    themes: {
      light: {
        primary: "#B71C1C",
        secondary: "#424242",
        accent: "#000",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        text: "#fff",
        cards: "#000",
        btnPrimary: "#B71C1C",
      },
      dark: {
        primary: "#B71C1C",
        secondary: "#fff",
        // accent: '#82B1FF',
        accent: "#000",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        text: "#000",
        cards: "#fff",
        btnPrimary: "#2d2d2d",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
});
