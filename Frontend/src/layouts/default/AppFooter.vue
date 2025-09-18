<template>
  <div class="d-flex  justify-center">
		<v-footer class="d-flex justify-space-between align-center" height="55" color="white" app>
			<div class="d-flex justify-center">
				<span class="font-weight-bold">Copyright © 2024 | AQBA. </span>
				<span>Todos os direitos reservados.</span>
			</div>

			<div class="d-flex flex-column align-center justify-center">
				<span class="font-weight-bold">Versão:</span>
				<span>{{ APP_VERSION }}</span>
			</div>
		</v-footer>
	</div>
</template>

<script>
  import { APP_VERSION } from '@/config';

  export default {
    data() {
      return {
        APP_VERSION,
      }
    },
  }
</script>

<style>
	
</style>