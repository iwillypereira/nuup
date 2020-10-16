<template>
  <div>
    <v-switch
      v-model="valSwitch"
      @change="toggleDarkMode()"
      hide-details
      flat
      dense
      inset
      color="red darken-4"
      style="margin:0 !important; padding-top: 7px !important;"
    ></v-switch>
  </div>
</template>
<script>
export default {
  data: () => ({
    // darkMode
    sideBar: false,
    toggleThemeIcon: "mdi-brightness-2",
    toggleThemeIconColor: "yellow",
    valSwitch: false
  }),
  created: function() {
    if(this.$vuetify.theme.dark){
       this.valSwitch = true;
    }else{
       this.valSwitch = false;
    }
  },
  mounted: function() {
  },
  methods: {
    toggleModal() {
      this.sideBar = !this.sideBar;
    },
    toggleDarkMode() {
      
      this.valSwitch = !this.$vuetify.theme.dark;
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  
  
  }
}
</script>