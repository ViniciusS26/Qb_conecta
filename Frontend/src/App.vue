<template>
  <router-view />
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user.store';
import AuthService from './controllers/authController';

const authService = new AuthService();

// onBeforeMount(() => {
// 	const urlParams = new URLSearchParams(window.location.search);
// 	const access = urlParams.get('access');
// 	const refresh = urlParams.get('refresh');
// 	const utmSource = urlParams.get('utm_source');
// 	const userStore = useUserStore();

// 	if (access) {
// 		userStore.setToken({
// 			access: {token: access},
// 			refresh: {token: refresh}
// 		});

// 		urlParams.delete('access');
// 		urlParams.delete('refresh');
// 		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;

// 		window.location.replace(newUrl);
// 	} else {
// 		const parseUser = (user) => {
// 			userStore.setUser(user);

// 			const redirectTo = localStorage.getItem('redirect-to');
// 			localStorage.removeItem('redirect-to');

// 			if (redirectTo) {
// 				window.location = redirectTo;
// 			}
// 		};

// 		const storedToken = localStorage.getItem('token');
// 		if (storedToken) {
// 			userStore.setIsLogged(true);

// 			authService.getCurrentUser()
// 				.then((user)=> parseUser(user))
// 				.catch(() => {
// 					authService.refreshTokens()
// 					.then((res) => {
// 						userStore.setToken(res.body);
// 						authService.getCurrentUser()
// 						.then((user) => parseUser(user))
// 						.catch(() => {
// 							userStore.setIsLogged(false);
// 							localStorage.clear();
// 							window.location = '/login';
// 						});
// 					})
// 				});
	
// 			userStore.setIsInstagram(utmSource === 'instagram');
	
// 			setInterval(() => { 
// 				authService.refreshTokens()
// 				.then((res) => {
// 					userStore.setToken(res.body);
// 					authService.getCurrentUser()
// 					.then((user) => parseUser(user))
// 					.catch(() => {
// 						userStore.setIsLogged(false);
// 						localStorage.clear();
// 						window.location = '/login';
// 					})
// 				});
// 			}, 1000 * 60 * 5);
// 		} else {
// 			userStore.setIsLogged(false);
// 		}
// 	}
// });
</script>

<style>
  .main {
    background-color: #d9d9d9 !important;
  }

  html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

  .blur {
    filter: blur(2px);
  }
</style>
