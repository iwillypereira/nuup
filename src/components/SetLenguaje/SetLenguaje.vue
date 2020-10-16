<template>
  <div>
    <v-select
      v-model="langSelected"
      :items="lang"
      item-text="lang"
      :no-data-text="$t('emptyDataList')"
      item-value="lang"
      filled
      rounded
      hide-details
      dense
      flat
      hide-selected
      @change="changeLang(langSelected.cross);"
      return-object
      style="width:150px;"
    >
      <template v-slot:item="{ item }">{{ $t(item.cross)}}</template>
    </v-select>
  </div>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    //Mensajes
    showMsj: false,
    //  lang
    lang: null,
    langSelected: null,
  }),
  created: function() {
  },
  mounted: function() {
    this.setLenguaje();
  },
  methods: {
    changeLang: function(lang) {
      this.$i18n.locale = lang;
      this.setLenguaje();
    },
    setLenguaje() {
      if (this.$i18n.locale == "es") {
        this.lang = [
          { lang: "Español", icon: "español.jpg", cross: "es" },
          { lang: "Ingles", icon: "english.jpg", cross: "en" }
        ];
        this.langSelected = {
          lang: "Español",
          icon: "español.jpg",
          cross: "es"
        };

        this.alertSuccess(
          "toggleLang",
          "success",
          "Se cambio el idioma a " + this.langSelected.lang
        );
      } else if (this.$i18n.locale == "en") {
        this.lang = [
          { lang: "Spanish", icon: "español.jpg", cross: "es" },
          { lang: "English", icon: "english.jpg", cross: "en" }
        ];
        this.langSelected = {
          lang: "English",
          icon: "english.jpg",
          cross: "es"
        };
        this.alertSuccess(
          "toggleLang",
          "success",
          "Se cambio el idioma a " + this.langSelected.lang,
          "Se ha cambiado con exito!"
        );
      }
      var self = this;
    },
    alertSuccess(group, type, title, description) {
      this.showMsj = true;
      this.$notify({
        group: group,
        type: type,
        text: description,
        duration: 200,
        title: title
      });
    }
  }
};
</script>