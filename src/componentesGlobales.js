// LIBRERIAS

// COMPONENTES
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import SetLenguaje from './components/SetLenguaje/SetLenguaje'
import DarkMode from './components/ThemeMode/DarkMode'

const GlobalComponents = {
   install(Vue) {
      Vue.component('vueperSlides', VueperSlides);
      Vue.component('vueperSlide', VueperSlide);
      Vue.component('darkMode',DarkMode);
      Vue.component('setLenguaje',SetLenguaje);
   }
}

export default GlobalComponents