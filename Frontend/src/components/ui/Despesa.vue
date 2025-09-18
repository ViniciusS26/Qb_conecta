<template>
	<v-hover v-slot:default="{ isHovering, props }">
		<v-card class="mx-1" width="50%">
			<v-card-title class="d-flex align-center justify-space-between">
				Despesa Total
				<v-icon class="text-red">mdi-hand-coin-outline</v-icon>
			</v-card-title>
			<v-card-text>
				<v-btn class="d-flex justify-space-between" variant="flat" width="100%" to="/financas/despesas">
					<h2>{{ totalDespesas }}</h2>
					<v-icon size="x-large">mdi-arrow-right</v-icon>
				</v-btn>
			</v-card-text>
		</v-card>
	</v-hover>
</template>
  
<script>
	import CostController from '@/controllers/costsControlles';
	import statusCode from '@/helpers/statusCode';

  const costController = new CostController();

  export default {
    props: {
    },
		data() {
			return {
				Despesas: [],
			};
		},
		async mounted() {
			await this.loadDespesas();
		},
		methods: {
			async loadDespesas() {
				try {
					const response = await costController.getCosts();
					console.log("response", response.body);
					this.Despesas = response.body;
					console.log("Despesas",this.Despesas);
				} catch (error) {
					statusCode.toastError(error);
				}
			},
		},
    computed: {
			totalDespesas() {
				const total = this.Despesas.reduce((total, despesa) => total + despesa.valor, 0).toFixed(2);
				return `R$ ${total}`;
			},
			
    }
  };
  </script>
  