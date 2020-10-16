<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-container fluid class="pl-5 pr-5">
        <div class="about">
          <h2>{{ $t("resum") }}</h2>
          <v-divider class="my-5"></v-divider>

          <v-row>
            <v-col cols xs="12" sm="12" md="12" lg="4">
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="headline"
                      ><v-badge
                        color="primary"
                        :content="cantTokensList == 0 ? '0' : cantTokensList"
                        inline
                      >
                        Tokens
                      </v-badge></v-card-title
                    >

                    <v-card-subtitle
                      >Listado de la cantidad de tokens creados</v-card-subtitle
                    >
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
            <v-col cols xs="12" sm="6" md="6" lg="4">
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="headline"
                      ><v-badge color="primary" :content="cantUsersList == 0 ? '0' : cantUsersList" inline>
                        Usuarios
                      </v-badge></v-card-title
                    >
                    <v-card-subtitle
                      >Cantidad de usuarios creados</v-card-subtitle
                    >
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
            <v-col cols xs="12" sm="6" md="6" lg="4">
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="headline"
                      ><v-badge color="primary" content="1" inline>
                        Alertas
                      </v-badge></v-card-title
                    >

                    <v-card-subtitle
                      >Cantidad de token que han sido activados</v-card-subtitle
                    >
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <!-- <h2>Alertas</h2>
          <v-divider class="my-5"></v-divider> -->
          <!-- <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="headline"
                  >Unlimited music now</v-card-title
                >

                <v-card-subtitle
                  >Listen to your favorite artists and albums whenever and
                  wherever, online and offline.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn text>Listen Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col v-for="(item, i) in items" :key="i" cols="12">
              <v-card :color="item.color" dark>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="headline"
                      v-text="item.title"
                    ></v-card-title>

                    <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.src"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row> -->
        </div>
      </v-container>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "App",
  data: () => ({
    sideBar: false,
    nombre_usuario: null,
    cantTokensList: 0,
    cantUsersList: 0,
    token: localStorage.getItem("keyCurrentUser"),
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
      },
    ],
  }),
  created: function() {
    this.$store.commit("SET_LAYOUT", "app-layout");
  },
  mounted: function() {
    // this.validarAutenticacion();
    this.obtenerListaTokens();
    this.obtenerListaDeUsuariosCreados();
  },
  methods: {
    toggleModal() {
      this.sideBar = !this.sideBar;
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
          // console.log(this.cantTokensList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    obtenerListaDeUsuariosCreados() {
      axios
        .get(this.$apiURL + "/api_v1/accounts/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.cantUsersList = response.data.count;
          // console.log(this.cantUsersList);
        })
        .catch((e) => {
          console.log(e);
        });
      F;
    },
  },
};
</script>
