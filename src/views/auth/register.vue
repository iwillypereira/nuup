<template>
  <div>
    <v-card flat>
      <v-toolbar flat dense>
        <v-spacer></v-spacer>
        <dark-mode />
        <set-lenguaje />
      </v-toolbar>
    </v-card>

    <v-row style="height:90vh;" justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{ $t('register') }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                color="primary"
                :label="$t('email')"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                id="password"
                color="primary"
                :label="$t('password')"
                name="password"
                prepend-icon="mdi-lock"
                :type="valTypeInput"
                :value="valor"
              >
                <v-icon slot="append" color="primary" @click="setTypeInput()">mdi-{{icon}}</v-icon>
              </v-text-field>
              <v-text-field
                id="password"
                color="primary"
                :label="$t('repeatPassword')"
                name="password"
                prepend-icon="mdi-lock"
                :type="valTypeInput"
                :value="valor"
              >
                <v-icon slot="append" color="primary" @click="setTypeInput()">mdi-{{icon}}</v-icon>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-container>
            <v-row justify="center" align="center">
              <v-spacer></v-spacer>
              <v-col cols="6">
                <v-btn color="primary" block rounded to="/">{{$t('btnRegister')}}</v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  created: function() {
    // this.$store.commit("SET_LAYOUT", "simple-layout");
    this.$store.commit("SET_LAYOUT", "login-layout");
  },
  mounted: function() {},
  methods: {},
  computed: {}
};
</script>