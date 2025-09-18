/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

const urlParams = new URLSearchParams(window.location.search);
const redirectTo = urlParams.get('redirectTo');

if (redirectTo) {
  localStorage.setItem('redirect-to', redirectTo);
}

app.mount('#app');

// const userStore = useUserStore();

// if (access) {
//   userStore.setToken(access);

//   localStorage.setItem('refresh-token', refresh);
//   urlParams.delete('access');
//   urlParams.delete('refresh');
//   const newUrl = `${window.location.pathname}?${urlParams.toString()}`;

//   window.location.replace(newUrl);
// } else {
//   const parseUser = (user) => {
//     userStore.setUser(user);

//     const redirectTo = localStorage.getItem('redirect-to');
//     localStorage.removeItem('redirect-to');

//     if (redirectTo) {
//       window.location = redirectTo;
//     }
//   }

//   getCurrentUser()
//     .then(parseUser)
//     .catch(() => {
//       refreshToken()
//         .then(getCurrentUser)
//         .then(parseUser)
//         .catch(() => {
//           userStore.setIsLogged(false);
//         });
//     });

//   userStore.setIsInstagram(utmSource === 'instagram');

//   setInterval(() => { refreshToken(); }, 1000 * 60 * 5);
  
// }
