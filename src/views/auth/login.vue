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
            <v-toolbar-title>{{ $t("login") }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                id="emailLogin"
                color="primary"
                :label="$t('email')"
                name="emailLogin"
                prepend-icon="mdi-account"
                v-model="emailInput"
                type="text"
              ></v-text-field>

              <v-text-field
                id="passwordLogin"
                color="primary"
                :label="$t('password')"
                name="passwordLogin"
                prepend-icon="mdi-lock"
                v-model="passwordInput"
                :type="valTypeInput"
                :value="valor"
              >
                <v-icon slot="append" color="primary" @click="setTypeInput()"
                  >mdi-{{ icon }}</v-icon
                >
              </v-text-field>
              <v-container>{{ msjError }}</v-container>
            </v-form>
          </v-card-text>
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="6">
                <v-btn
                  color="primary"
                  rounded
                  block
                  @click="iniciarSesionNUUP()"
                  >{{ $t("btnLogin") }}</v-btn
                >
              </v-col>
              <!-- <v-col cols="6">
                <v-btn
                  color="primary"
                  block
                  rounded
                  outlined
                  @click="irAlSlider(2)"
                >
                  {{ $t("btnCreateAccount") }}
                  <v-icon dense right>mdi-arrow-right</v-icon>
                </v-btn>
              </v-col> -->
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- <hooper
      :settings="hooperSettings"
      style="position: fixed; width: 100%; height: 100%; left: 0; top:6%;"
      :initialSlide="1"
      ref="carousel"
    >
      <slide>
     
      </slide>
      <!-- <slide>
        <v-row style="height:90vh;" justify="center" align="center">
          <v-col cols="12" sm="8" md="4">dada</v-col>
        </v-row>
      </slide>
      <slide>
        <v-row style="height:90vh;" justify="center" align="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-toolbar-title>{{ $t("register") }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="emailRegister"
                    v-model="emailInput"
                    color="primary"
                    :label="$t('email')"
                    name="emailRegister"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="passwordRegister"
                    color="primary"
                    :label="$t('password')"
                    name="passwordRegister"
                    v-model="passwordInput"
                    prepend-icon="mdi-lock"
                    :type="valTypeInput"
                    :value="valor"
                  >
                    <v-icon
                      slot="append"
                      color="primary"
                      @click="setTypeInput()"
                      >mdi-{{ icon }}</v-icon
                    >
                  </v-text-field>
                  <v-text-field
                    id="passwordRepeatRegister"
                    color="primary"
                    :label="$t('repeatPassword')"
                    name="passwordRepeatRegister"
                    prepend-icon="mdi-lock"
                    :type="valTypeInput"
                    v-model="passwordRepeatInput"
                    :value="valor"
                  >
                    <v-icon
                      slot="append"
                      color="primary"
                      @click="setTypeInput()"
                      >mdi-{{ icon }}</v-icon
                    >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-container>
                <v-row justify="center" align="center">
                  <v-col cols="6">
                    <v-btn
                      color="primary"
                      block
                      rounded
                      @click="createUserWithEmailAndPasswordApp()"
                      >{{ $t("btnRegister") }}</v-btn
                    >
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      color="primary"
                      block
                      rounded
                      outlined
                      @click="irAlSlider(0)"
                    >
                      <v-icon dense left>mdi-arrow-left</v-icon>
                      {{ $t("btnCreateAccount") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </slide> 
   </hooper> -->
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
// FIREBASE
import firebase from "firebase";

import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import axios from "axios";

export default {
  components: {
    Hooper,
    Slide,
  },
  data: () => ({
    msjError: null,
    emailInput: "",
    passwordInput: "",
    passwordRepeatInput: "",
    valor: "dadada",
    icon: "eye",
    colorIcon: "#757575",
    valTypeInput: "password",
    hooperSettings: {
      itemsToShow: 1,
      centerMode: true,
    },
  }),
  created: function() {
    // this.$store.commit("SET_LAYOUT", "simple-layout");
    this.$store.commit("SET_LAYOUT", "login-layout");
  },
  mounted: function() {
    this.validarAutenticacion();
  },
  methods: {
    alertSuccess(group, type, title, description, time = 200) {
      this.showMsj = true;
      this.$notify({
        group: group,
        type: type,
        text: description,
        duration: time,
        title: title,
      });
    },
    setTypeInput() {
      if (this.valTypeInput == "password") {
        this.valTypeInput = "text";
        this.icon = "eye-off";
      } else {
        this.valTypeInput = "password";
        this.icon = "eye";
      }
    },
    iniciarSesionNUUP() {
      if (isEmpty(this.emailInput) || isEmpty(this.passwordInput)) {
        this.alertSuccess(
          "toggleLang",
          "error",
          "Error",
          "Todos los campos son obligatorios",
          500
        );
      } else if (!validateEmail(this.emailInput)) {
        this.alertSuccess(
          "toggleLang",
          "error",
          "Error",
          "El correo electrónico es invalido",
          500
        );
      } else {
        axios
          .post(this.$apiURL + "/api_v1/accounts/login", {
            email: this.emailInput,
            password: this.passwordInput,
          })
          .then((response) => {
            if (response.data.success) {
              localStorage.setItem("keyCurrentUser", response.data.token);
              this.$router.push("/");
            } else {
              this.msjError =
                "Error en la autenticación del usuario, intentelo de nuevo.";
              setTimeout(() => {
                this.msjError = null;
              }, 3000);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    irAlSlider(index) {
      this.$refs.carousel.slideTo(index);
    },
    // createUserWithEmailAndPasswordApp() {
    //   firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(this.emailInput, this.passwordInput)
    //     .then(() => {
    //       // console.log(this.emailInput + " " + this.passwordInput);
    //       this.limpiarCampos();
    //       this.irAlSlider(0);
    //     })
    //     .catch(() => {
    //       // console.log("Contraseña o Usuario incorrecto");
    //     });
    // },
    // singOut() {
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //       localStorage.removeItem("currentUser");
    //     });
    // },
    validarAutenticacion() {
      // console.log(localStorage.getItem("currentUser"));
      if (localStorage.getItem("keyCurrentUser") != null) {
        this.$router.push("/");
        this.$store.commit("SET_LAYOUT", "app-layout");
      } else {
        this.$store.commit("SET_LAYOUT", "login-layout");
      }
    },
    limpiarCampos() {
      this.emailInput = null;
      this.passwordInput = null;
      this.passwordRepeatInput = null;
    },
  },
  computed: {},
  watch: {},
};
</script>
<style>
.v-application ul,
.v-application ol {
  padding-left: 0px !important;
}
</style>
