<template>
  <v-container>
    <v-row style="height:90vh;" justify="center" align="center">
      <v-col cols="12">
        <v-card flat>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>Lista de Usuarios Creados</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-list dense>
              <!-- <v-subheader>REPORTS</v-subheader> -->
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(usuario, index) in cantUsersList"
                  :key="index"
                  class="d-flex"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-avatar color="orange" size="62">
                        <img alt="Avatar" :src="usuario.avatar"/></v-avatar
                      >{{ usuario.name }} {{ usuario.apellido_pat }}
                      {{ usuario.apellido_mat }} | {{ usuario.phone }}
                      <v-btn
                        color="primary"
                        rounded
                        @click="eliminarUsuario(usuario)"
                        >Eliminar</v-btn
                      >
                      <v-btn
                        color="warning"
                        rounded
                        @click="abrirModal(usuario)"
                        >Editar</v-btn
                      >
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="openmodalUpdate" max-width="600px">
      {{ data }}
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <!-- <v-text-field
              color="primary"
              :label="'Correo electrónico'"
              name="login"
              filled
              rounded
              type="text"
              v-model="data.email"
            ></v-text-field> -->
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
            <!-- <v-text-field
              color="primary"
              :label="'Contraseña'"
              name="login"
              filled
              rounded
              type="text"
              v-model="data.password"
            ></v-text-field> -->
            <v-text-field
              color="primary"
              :label="'Teléfono'"
              name="login"
              filled
              rounded
              type="text"
              v-model="data.phone"
            ></v-text-field>
          </v-container>
          <v-btn color="primary" rounded block @click="actualizarUsuario()"
            >Actualizar</v-btn
          >
        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// import firebase from "firebase";

// import VistaLogin from "../views/auth/login";

import axios from "axios";
export default {
  name: "App",
  data: () => ({
    cantUsersList: [],
    userSelected: {},
    data: {
      email: null,
      name: null,
      apellido_pat: null,
      apellido_mat: null,
      password: null,
      is_Admin: 0,
      phone: null,
    },
    openmodalUpdate: false,
    token: localStorage.getItem("keyCurrentUser"),
  }),
  created: function() {},
  mounted: function() {
    this.obtenerListaDeUsuariosCreados();
  },
  methods: {
    obtenerListaDeUsuariosCreados() {
      axios
        .get(this.$apiURL + "/api_v1/accounts/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.cantUsersList = response.data.users;
          console.log(this.cantUsersList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    abrirModal: function(userSeleccionado) {
      this.openmodalUpdate = !this.openmodalUpdate;
      this.data = userSeleccionado;
      console.log(this.data);
    },

    eliminarUsuario(tokenSelected) {
      // localhost:3000/api_v1/accounts/users/5f69901ed6b40f6028af3e51
      axios
        .delete(this.$apiURL + "/api_v1/accounts/users/" + tokenSelected._id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.obtenerListaDeUsuariosCreados();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    actualizarUsuario() {
      // localhost:3000/api_v1/accounts/users/5f69800b80417924409041f4

      axios
        .patch(
          this.$apiURL + "/api_v1/accounts/users/" + this.data._id,
          this.data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.token,
            },
          }
        )
        .then(function(response) {})
        .catch(function(error) {
          console.log(error);
        });
      this.openmodalUpdate = false;
    },
  },
};
</script>
