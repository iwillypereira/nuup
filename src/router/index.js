import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '../views/inicio/Home'
import Login from "../views/auth/login"
import CreateToken from "../views/tokens/CreateTokens"
import ListaToken from "../views/tokens/ListaTokens"
import CrearUsuarios from "../views/inicio/CrearUsuarios"
import ListaUsuarios from "../views/inicio/ListaUsuarios";
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Inicio,
  },
  {
    path: '/welcome',
    component: Login,
  },
  {
    path: '/create-token',
    component: CreateToken,
  },
  {
    path: '/lista-tokens',
    component: ListaToken,
  },
  {
    path: '/crear-usuarios',
    component: CrearUsuarios,
  },
  {
    path: '/lista-usuarios',
    component: ListaUsuarios,
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
