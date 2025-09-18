<template>
	<v-hover v-slot:default="{ isHovering, props }">
		<v-card width="50%">
			<v-card-title class="d-flex align-center justify-space-between">
				Receita Total
				<v-icon class="text-green">mdi-hand-coin-outline</v-icon>
			</v-card-title>
			<v-card-text>
				<v-btn class="d-flex justify-space-between" variant="flat" width="100%" to="/financas/receitas">
					<h2>{{ totalReceitas }}</h2>
					<v-icon size="x-large">mdi-arrow-right</v-icon>
				</v-btn>
			</v-card-text>
		</v-card>
	</v-hover>
</template>
  
<script>
	import IncomeController from '@/controllers/incomeControler';
	import statusCode from '@/helpers/statusCode';

  const incomeController = new IncomeController();

  export default {
    props: {
    },
		data() {
			return {
				Receitas: [],
				ReceitaTotal: 0,
			};
		},
		async mounted() {
			await this.loadReceitas();
		},
		methods: {
			async loadReceitas() {
				try {
					const response = await incomeController.getIncomes();
					console.log("response", response.body);
					this.Receitas = response.body;
					console.log("receitas",this.Receitas);
				} catch (error) {
					statusCode.toastError(error);
				}
			},
		},
    computed: {
			totalReceitas() {
				const total = this.Receitas.reduce((total, receita) => total + receita.valor, 0).toFixed(2);
				return `R$ ${total}`;
			},
			
    }
  };
  </script>
  