<template>
  <v-app>
		<div class="d-flex">
			<default-bar v-if="this.$route.name !== 'LoginView'"/>
			<div class="d-flex">
				<default-top-bar v-if="this.$route.name !== 'LoginView'"/>
			</div>
		</div>
		<default-view />
		<defout-footer v-if="this.$route.name !== 'LoginView'"/>
		
  </v-app>
</template>

<script>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
	import DefaultTopBar from './TopBar.vue';
	import DefoutFooter from './AppFooter.vue';

  import { useUserStore  } from '@/stores/user.store';

  const userStore = useUserStore();

  export default {
		components: {
			DefaultBar,
			DefaultView,
			DefaultTopBar,
			DefoutFooter,
		},
		computed: {
			isLogged() {
				return true; // userStore.isLogged;
				// return userStore.isLogged && userStore.getUser.isEmailVerified;
			},
		},
	};
</script>
