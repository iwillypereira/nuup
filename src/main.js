import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import Notifications from "vue-notification";
import componentesGlobales from "./componentesGlobales";
import { funciones } from "./utils/Funciones";
// SWIPER
import VueAgile from "vue-agile";
import fireBaseApp from "./firebase/index";
Vue.use(VueAgile);
Vue.use(componentesGlobales);
Vue.use(Notifications);
Vue.prototype.$funciones = funciones;
Vue.prototype.$apiURL = "//apinup-env-1.eba-hzsiupwa.us-east-2.elasticbeanstalk.com";

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
