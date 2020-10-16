<template>
  <div>
    <v-app>
      <v-app-bar app>
        <v-btn icon @click="toggleModal()">
          <v-icon large>mdi-menu</v-icon>
        </v-btn>

        <v-toolbar-title>NÚUP'</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer v-model="sideBar" app color="text">
        <v-container class="d-block text-center">
          <v-row align="end" class="py-0 fill-height">
            <div style="display:flex;">
              <v-col align-self="start" cols="2">
                <!-- <v-badge bottom overlap @click="prueba()" v-model="show_edit"> -->
                <v-avatar
                  class="profile m-auto"
                  color="grey"
                  size="64"
                  @mouseover="show_edit = true"
                  @mouseleave="show_edit = false"
                >
                  <v-fade-transition>
                    <v-overlay v-if="show_edit" absolute color="primary">
                      <v-btn
                        icon
                        color="secondary"
                        @click="abrirProfile(array_user.user)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                  <v-img class :src="array_user.user.avatar"> </v-img>
                </v-avatar>

                <!-- <template v-slot:badge>
                    <v-icon icon color="grey">mdi-pencil</v-icon>
                  </template>
                </v-badge> -->
              </v-col>
              <v-col cols="10">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title"
                      >{{ array_user.user.name }}
                      {{ array_user.user.apellido_pat }}</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      array_user.user.email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </div>

            <v-col cols="12" class="my-0 py-0">
              <v-row>
                <v-col cols="8">
                  <set-lenguaje />
                </v-col>
                <v-col cols="2" class="d-block m-auto">
                  <dark-mode />
                </v-col>
                <v-col cols="12">
                  <v-btn color="danger" rounded block @click="singOut()">{{
                    $t("singOut")
                  }}</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-list transition="slide-x-transition">
          <v-list-item :to="{ path: '/' }" @click="obtenerListaTokens()">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("home") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ path: '/lista-tokens' }"
            @click="obtenerListaTokens()"
          >
            <v-list-item-action>
              <v-badge
                :content="cantTokensList == 0 ? '0' : cantTokensList"
                color="primary"
                overlap
                bottom
              >
                <v-icon>mdi-format-list-bulleted-square</v-icon>
              </v-badge>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("tokenList") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ path: '/create-token' }"
            @click="obtenerListaTokens()"
          >
            <v-list-item-action>
              <v-icon>mdi-shield-key-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("create-token") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="{ path: '/crear-usuarios' }"
            v-if="array_user.user.is_Admin"
          >
            <v-list-item-action>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Crear Usuarios</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/lista-usuarios' }">
            <v-list-item-action>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Lista Usuarios</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <router-view></router-view>
      </v-content>

      <v-dialog
        v-model="abrirModal_edit"
        overlay-opacity="0.7"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span>Datos Personales</span>
          </v-card-title>
          <v-card-text>
            <v-avatar
              class="profile m-auto"
              color="grey"
              size="128"
              style="display:block; margin:auto; margin: 20px auto;"
            >
              <v-img class :src="array_user.user.avatar"> </v-img>
            </v-avatar>
            <v-text-field
              color="primary"
              :label="'Nombre usuario'"
              name="login"
              filled
              rounded
              type="text"
              v-model="array_user.user.name"
            ></v-text-field>

            <v-text-field
              color="primary"
              :label="'Apellido Paterno'"
              name="login"
              filled
              rounded
              type="text"
              v-model="array_user.user.apellido_pat"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="'Apellido Materno'"
              name="login"
              filled
              rounded
              type="text"
              v-model="array_user.user.apellido_mat"
            ></v-text-field>

            <v-text-field
              color="primary"
              :label="'Teléfono'"
              name="login"
              filled
              rounded
              type="text"
              v-model="array_user.user.phone"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="abrirModal_edit = false">
              CANCELAR
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" rounded @click="actualizarProfile()">
              ACTUALIZAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";

import VistaLogin from "../views/auth/login";

import axios from "axios";
export default {
  name: "App",
  data: () => ({
    sideBar: false,
    nombre_usuario: null,
    array_user: {},
    show_edit: false,
    abrirModal_edit: false,
    array_update_profile: {
      apellido_mat: null,
      apellido_pat: null,
      name: null,
      phone: null,
    },

    token: localStorage.getItem("keyCurrentUser"),
    cantTokensList: 0,
  }),
  created: function() {},
  mounted: function() {
    this.validarAutenticacion();
    this.obtenerListaTokens();
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
    toggleModal() {
      this.sideBar = !this.sideBar;
    },
    abrirProfile() {
      this.abrirModal_edit = true;
    },
    guardarDatosNuevos() {
      this.array_update_profile.apellido_mat = this.array_user.user.apellido_mat;
      this.array_update_profile.apellido_pat = this.array_user.user.apellido_pat;
      this.array_update_profile.name = this.array_user.user.name;
      this.array_update_profile.phone = this.array_user.user.phone;
    },
    actualizarProfile() {
      this.guardarDatosNuevos();
      axios
        .post(
          this.$apiURL + "/api_v1/accounts/profile",
          this.array_update_profile,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.token,
            },
          }
        )
        .then((response) => {
          this.abrirModal_edit = false;
          this.alertSuccess(
            "toggleLang",
            "success",
            "Exitoso",
            "Se ha actualizado correctamente",
            500
          );
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    singOut() {
      localStorage.removeItem("keyCurrentUser");
      this.$router.push("/welcome");
    },
    obtenerListaTokens() {
      //   const currentTokenUser = localStorage.getItem("keyCurrentUser");
      axios
        .get(this.$apiURL + "/api_v1/tokens/token", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.cantTokensList = response.data.tokens.length;
          // this.cantTokensList = 0;
          // console.log(this.cantTokensList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    validarAutenticacion() {
      // console.log(localStorage.getItem("currentUser"));
      if (localStorage.getItem("keyCurrentUser") == null) {
        this.$router.push("/welcome");
        this.$store.commit("SET_LAYOUT", "login-layout");
      } else {
        axios
          .get(this.$apiURL + "/api_v1/accounts/profile", {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.array_user = response.data;
            // is_Admin
            // console.log(this.array_user.user);
          })
          .catch((e) => {
            console.log(e);
          });
        this.$store.commit("SET_LAYOUT", "app-layout");
      }
    },
  },
};
</script>
