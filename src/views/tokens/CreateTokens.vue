<template>
  <v-container>
    <v-row style="height:90vh;" justify="center" align="center">
      <v-col cols="12">
        <v-card flat>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{ $t("create-token") }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <!-- <v-select
              :items="items"
              rounded
              filled
              :label="$t('chooseYouToken')"
              dense
              v-model="data."
            ></v-select> -->
            <!-- <v-text-field
              color="primary"
              :label="$t('typeYouEmail')"
              filled
              rounded
              name="login"
              append-icon="mdi-at"
              type="text"
            ></v-text-field> -->
            <v-text-field
              color="primary"
              :label="'Nombre del token'"
              name="login"
              filled
              rounded
              append-icon="mdi-note"
              type="text"
              v-model="data.nombre_token"
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
            <!-- <v-file-input
              label="Subir Excel"
              chips
              counter
              show-size
              clearable
              :accept="type_file"
            ></v-file-input> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" rounded width="250" @click="crearToken()"
              >CREAR</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="loaderProceso" color="primary">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    items: ["Excel"],
    loaderProceso: false,
    type_file:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    data: {
      nombre_token: null,
      nota_recordatoria: null,
      disponible: true,
    },
    token: localStorage.getItem("keyCurrentUser"),
  }),
  mounted() {},
  methods: {
    limpiarCampos() {
      this.data.nombre_token = null;
      this.data.nota_recordatoria = null;
      this.data.disponible = true;
    },
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
    crearToken: function() {
      this.loaderProceso = true;
      axios
        .post(this.$apiURL + "/api_v1/tokens/token", this.data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.loaderProceso = false;
          this.alertSuccess(
            "toggleLang",
            "success",
            "Exitoso",
            "Se ha creado correctamente.",
            500
          );
          this.limpiarCampos();
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
