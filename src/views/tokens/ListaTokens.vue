<template>
  <div>
    <v-container>
      <v-list three-line>
        <v-subheader
          ><h2>{{ $t("tokenList") }}</h2>
          <v-spacer></v-spacer>
          <v-btn icon color="grey" @click="obtenerListaTokens()">
            <v-icon>mdi-cached</v-icon>
          </v-btn></v-subheader
        >
        <v-skeleton-loader
          ref="skeleton"
          boilerplate
          type="list-item-avatar-three-line"
          class="mx-auto"
          v-if="loaderlist"
        ></v-skeleton-loader>
        <v-skeleton-loader
          ref="skeleton"
          boilerplate
          type="list-item-avatar-three-line"
          class="mx-auto"
          v-if="loaderlist"
        ></v-skeleton-loader>
        <v-skeleton-loader
          ref="skeleton"
          boilerplate
          type="list-item-avatar-three-line"
          class="mx-auto"
          v-if="loaderlist"
        ></v-skeleton-loader>

        <template v-if="!loaderlist">
          <div
            v-for="(tokenlist, index) in array_lista_tokens"
            v-bind:key="index"
          >
            <v-divider></v-divider>
            <v-lazy
              v-model="isActive"
              :options="{
                threshold: 0,
              }"
              transition="slide-y-transition"
            >
              <v-list-item>
                <!-- <v-list-item-avatar>
                  <v-img :src="tokenlist.propietario.avatar"></v-img>
                </v-list-item-avatar> -->

                <v-list-item-content>
                  <v-list-item-title
                    style="display:flex; justify-content: space-between;"
                  >
                    <p>{{ tokenlist.Nombre_token }}</p>
                    <p>
                      {{ moment(tokenlist.fecha_creacion).format("LLL") }}
                    </p>
                  </v-list-item-title>
                  <v-list-item-subtitle
                    >{{ tokenlist.nota_recordatoria }}
                    <br />
                    <div class="mt-5" style="text-align:right;">
                      <v-btn
                        color="primary"
                        @click="eliminarTokenPorID(tokenlist)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>

                      <v-btn
                        color="warning"
                        @click="actualizarTokenPorID(tokenlist)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>

                      <v-btn color="warning" @click="descargarToken(tokenlist)">
                        <v-icon>mdi-download-outline</v-icon>
                      </v-btn>
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-lazy>
          </div>
        </template>
      </v-list>
    </v-container>
    <v-dialog v-model="actualizar" max-width="500px">
      <v-card>
        <v-card-title>
          {{ data.Nombre_token }}
          {{ data.token_url }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            color="primary"
            :label="'Nombre del token'"
            name="login"
            filled
            rounded
            append-icon="mdi-note"
            type="text"
            v-model="data.Nombre_token"
          ></v-text-field>
          <v-textarea
            color="primary"
            :label="$t('rememberNote')"
            auto-grow
            clearable
            rounded
            filled
            row-height="24"
            v-model="data.nota_recordatoria"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="actualizar = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="loaderProceso" color="primary">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import { functions } from "firebase";
import download from "downloadjs";

export default {
  data: () => ({
    array_lista_tokens: [],
    moment: moment,
    isActive: false,
    token: "",
    eliminar: false,
    actualizar: false,
    loaderlist: true,
    loaderProceso: false,
    data: {
      Nombre_token: null,
      nota_recordatoria: null,
      fecha_creacion: null,
      token_url: null,
      disponible: true,
    },
  }),
  created: function() {
    this.cambiarIdiomaFechas("es");
  },
  mounted: function() {
    this.token = localStorage.getItem("keyCurrentUser");
    this.obtenerListaTokens();
  },
  methods: {
    cambiarIdiomaFechas: function(idioma) {
      switch (idioma) {
        case "es":
          this.moment.locale("es");
          break;
        case "en-au":
          this.moment.locale("en-au");
          break;
        default:
          break;
      }
    },
    obtenerListaTokens() {
      this.loaderlist = true;
      //   const currentTokenUser = localStorage.getItem("keyCurrentUser");
      axios
        .get(this.$apiURL + "/api_v1/tokens/token", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.loaderlist = false;
          this.loaderlist = false;
          this.array_lista_tokens = response.data.tokens;
          // console.log(this.array_lista_tokens);

          // console.log(
          //   this.array_lista_tokens["0"].fecha_creacion.substr(0, 10)
          // );
        })
        .catch((e) => {
          console.log(e);
        });
    },
    eliminarTokenPorID: function(tokenSelected) {
      this.loaderProceso = true;
      axios
        .delete(this.$apiURL + "/api_v1/tokens/token/" + tokenSelected._id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.obtenerListaTokens();
          this.loaderProceso = false;
        })
        .catch((e) => {
          console.log(e);
        });
      // console.log(tokenSelected);
    },
    actualizarTokenPorID: function(tokenSelected) {
      this.actualizar = !this.actualizar;
      this.data = tokenSelected;
    },
    descargarToken: function(tokenSelected) {
      this.loaderProceso = true;
      let data_file = tokenSelected.token_url;
      let file_name = data_file.split("/");
      axios
        .get(this.$apiURL + "/api_v1/tokens/download/" + data_file, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
          responseType: "blob",
        })
        .then((response) => {
          console.log(response);
          this.loaderProceso = false;
          const content = response.headers["content-type"];
          download(response.data, file_name[1], content);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
