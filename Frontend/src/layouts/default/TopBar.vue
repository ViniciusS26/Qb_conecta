<template>
	<v-app-bar color="white" elevation="1" height="64" z-index="0">
		<div class="ma-2 " style="width: 25%; height: 100%; display: flex; align-items: center; padding: 20px;">
			<h3>
				{{ this.$route.name }}
			</h3>
		</div>
		<v-spacer></v-spacer>

		<v-divider class="ms-3 border-opacity-90" inset vertical></v-divider>

		<v-menu location="bottom" transition="slide-y-transition">
			<template v-slot:activator="{ props }">
				<v-btn variant="text" v-bind="props" class="pa-3" height="64">
					{{ user.name || 'Usuário' }}
				</v-btn>
			</template>

			<v-list density="compact" nav>
				<!-- <v-list-item @click="goToProfile">
					<template v-slot:prepend>
						<v-icon>mdi-account</v-icon>
					</template>
					<v-list-item-title>Perfil</v-list-item-title>
				</v-list-item> -->
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script>
import { useUserStore } from '@/stores/user.store';

const userStore = useUserStore();

export default {
	// methods: {
	// 	goToProfile() {
	// 		this.$router.push("/profile");
	// 	},
	// },
	computed: {
		user() {
			return userStore.getUser || {};
		},
	},
	methods: {
		goToHome() {
			this.$router.push("/");
		},
		//pergar o usuario logado
		getUser() {
			return userStore.getUser;
		},
	},
};
</script>

<style scoped></style>