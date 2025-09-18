<template>
  <v-navigation-drawer
		color="#1D271A"
    :rail="!isLocked"
    permanent
    elevation="0"
    app
		z-index="1"
    :expand-on-hover="!isLocked  && !$vuetify.display.mobile"
  >
	<div class="toplogo" style="width: 100%; height: 64px; display: flex; align-items: center;">
		<v-img src="@/assets/LogoHorizontal.svg" max-width="190px" max-height="50px"
		class="ml-6">
			<v-btn width="100%" height="100%" @click="goToHome" variant="plain">
				<v-tooltip activator="parent" location="end">Home</v-tooltip>
			</v-btn>
		</v-img>
	</div>
	<v-divider></v-divider>
	<v-list density="compact" nav>
		<v-list-item prepend-icon="mdi-home" :title="$t('menu.home')" to="/" exact active-class="custon-active-iten"></v-list-item>
		<v-list-item prepend-icon="mdi-account" :title="$t('menu.partners')" to="/socios" active-class="custon-active-iten"></v-list-item>
		<v-list-item prepend-icon="mdi-folder-multiple" :title="$t('menu.projects')" to="/projetos" active-class="custon-active-iten"></v-list-item>
		<v-list-item prepend-icon="mdi-hand-coin-outline" :title="$t('menu.mensality')" to="/financas" active-class="custon-active-iten"></v-list-item>
	</v-list>
	
	<template v-slot:append>
		<v-list density="compact" nav class="d-none d-md-block">
			<v-divider :thickness="3"></v-divider>
			<v-list-item prepend-icon="mdi-exit-to-app" :title="$t('menu.exit')" @click="logout"></v-list-item>
			
        <!-- <v-list-item 
					:prepend-icon="lockMenuIcon"
					:title="lockMenuText"
					value="fixed"
					@click="toggleFixed"
					:active="isLocked"
					active-class="custon-active-iten"
				>
				</v-list-item> -->
			</v-list>
			
			<!-- <div class="d-flex flex-row">				
				<span v-if="isLocked">{{ "Versão: " }}</span><DefaultFooter/>
			</div> -->
    </template>
	</v-navigation-drawer>
</template>
<script>
	import DefaultFooter from '@/layouts/default/AppFooter.vue';
  import { useUserStore  } from '@/stores/user.store';
  import { createCheckout } from '@/services/checkout.service';

  const userStore = useUserStore();

  export default {
		components: {
			DefaultFooter,
		},
    data () {
      return {
        drawer: true,
        rail: true,
        isLocked: true,
      }
    },

    methods: {
      toggleRail () {
        this.rail = !this.rail
      },

			goToHome () {
				window.location = '/'
			},

      toggleFixed () {
        this.isLocked = !this.isLocked
        this.rail = this.isLocked;
      },

      logout() {
        // Usar o método logout do store
        userStore.logout();
        // Usar router em vez de window.location
        this.$router.push('/login');
      },

      async checkout() {
        const data = await createCheckout();
        window.location = data.url;
      }
    },

    computed: {
			
      lockMenuIcon() {
        return this.isLocked ? 'mdi-pin-off' : 'mdi-pin'
      },

      lockMenuText() {
        return !this.isLocked ? this.$t('menu.fixMenu') : this.$t('menu.fixedMenu')
      },
    }
  }
</script>
<style scoped>
	.custon-active-iten {
		background-color: rgba(41, 213, 58, 0.2) !important;

	}
</style>