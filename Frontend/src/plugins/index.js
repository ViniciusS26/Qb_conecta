/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router' 
import VueConfetti from 'vue-confetti'

import VueTheMask from 'vue-the-mask';

import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import messages from '../i18n/index.js';

import { createI18n } from 'vue-i18n';
import { registerPinia } from './pinia'

export function registerPlugins (app) {
	registerPinia(app)
  loadFonts()
  app
    .use(createI18n({
      legacy: false,
      locale: 'pt',
      messages,
    }))
    .use(VueConfetti)
    .use(VueTheMask)
    .use(Vue3Toasity,  {
      autoClose: 3000,
    })
    .use(vuetify)
    .use(router)
}
