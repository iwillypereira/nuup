<template>
  <v-container>
    <v-row style="height:90vh;" justify="center" align="center">
      <v-col cols="12">
        <v-card flat>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>Crear Usuarios</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              color="primary"
              :label="'Correo electrónico'"
              name="login"
              filled
              rounded
              type="text"
              v-model="data.email"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="'Nombre'"
              name="login"
              filled
              rounded
              type="text"
              v-model="data.name"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="'Apellido Paterno'"
              name="login"
              filled
              rounded
              type="text"
              v-model="data.apellido_pat"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="'Apellido Materno'"
              name="login"
              filled
              rounded
              type="text"
              v-model="data.apellido_mat"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="'Contraseña'"
              name="login"
              filled
              rounded
              type="text"
              v-model="data.password"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="'Teléfono'"
              name="login"
              filled
              rounded
              type="text"
              v-model="data.phone"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" rounded width="250" @click="crearUsuarios()"
              >CREAR</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import firebase from "firebase";

// import VistaLogin from "../views/auth/login";

import axios from "axios";
export default {
  name: "App",
  data: () => ({
    sideBar: false,
    nombre_usuario: null,
    array_user: {},
    data: {
      email: null,
      name: null,
      apellido_pat: null,
      apellido_mat: null,
      password: null,
      is_Admin: 0,
      phone: null,
    },
    token: localStorage.getItem("keyCurrentUser"),
    cantTokensList: 0,
  }),
  created: function() {},
  mounted: function() {},
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
    limpiarCampos() {
      this.data.email = null;
      this.data.name = null;
      this.data.apellido_pat = null;
      this.data.apellido_mat = null;
      this.data.password = null;
      this.data.phone = null;
    },
    // CREAR SUBADMINS
    crearUsuarios() {
      axios
        .post(this.$apiURL + "/api_v1/accounts/register", this.data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.alertSuccess(
            "toggleLang",
            "success",
            "Exitoso",
            "Se ha creado el usuario correctamente",
            500
          );
          this.limpiarCampos();
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
