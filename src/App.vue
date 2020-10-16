<template>
  <v-app>
    <router-view :is="layout"></router-view>
    <notifications group="toggleLang" />
  </v-app>
</template>

<script>
import AppLayout from "./container/AppLayout";
import SimpleLayout from "./container/SimpleLayout";
import LoginLayout from "./container/LoginLayout";

export default {
  name: "App",
  computed: {
    layout() {
      return this.$store.getters.layout;
    }
  },
  components: {
    "app-layout": AppLayout,
    "simple-layout": SimpleLayout,
    "login-layout": LoginLayout
  },
  data: () => ({}),
  created: function() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.light = true;
    }
    this.$store.commit("SET_LAYOUT", "app-layout");
    // store.commit("SET_LAYOUT", "simple-layout");
    // store.commit("SET_LAYOUT", "login-layout");
  },
  mounted: function() {},
  methods: {}
};
</script>
