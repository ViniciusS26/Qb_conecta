<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
				<v-card class="align-center justify-center">
					<v-card-title class="align-start justify-start">
						Adicionar Receita
					</v-card-title>
					<v-card-text>
							<div class="d-flex align-center justify-center" style="width: 100%;">
								<v-row class="mt-0 ml-0 mr-0 align-start justify-center" :gutter="1">
									<v-col cols="4">
										<span>Valor</span>
										<v-text-field
										variant="outlined"
										v-model="data.valor"
										type="number"
										:rules="[ruleRequired]"
										></v-text-field>

										<span>Origem</span>
										<v-text-field
										variant="outlined"
										v-model="data.origem"
										type="text"
										:rules="[ruleRequired]"
										></v-text-field>
									</v-col>

									<v-col cols="4">
										<span>Data</span>
										<div class="d-flex align-center justify-center" style="width: 100%;">

												<v-row dense>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="data.day"
															label="Dia"
															type="number"
															:min="1"
															:max="31"
															:rules="[ruleRequired]"
														>
														</v-text-field>
													</v-col>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="data.month"
															label="Mês"
															type="number"
															:min="1"
															:max="12"
															:rules="[ruleRequired]"
														>
														</v-text-field>
													</v-col>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="data.year"
															label="Ano"
															type="number"
															:min="1900"
															:max="2100"
															:rules="[ruleRequired]"
														>
														</v-text-field>
													</v-col>
												</v-row>
											</div>
									</v-col>
									<v-col class="d-flex align-center justify-center" cols="8">
										<v-btn color="primary" class="ma-2" @click="addReceita()" >
											Adicionar
										</v-btn>
									</v-col>
								</v-row>

							</div>
					</v-card-text>
				</v-card>
			</v-col>

		</v-row>
	</v-container>	
</template>

<script>
import DateLabel from '@/components/ui/DateLabel.vue';
import { VDateInput } from 'vuetify/labs/VDateInput'
import { ruleRequired} from '@/helpers/RulesHelper';
import IncomeController from '@/controllers/incomeControler';
import statusCode from '@/helpers/statusCode';

const incomeControler = new IncomeController();

export default {
	name: 'Socios',
	components: {
		DateLabel,
		VDateInput
	},
	data() {
		return {
			message: 'Hello, Vue!',
			data: {
				valor: '',
				day: '',
				month: '',
				year: '',
				origem: '',
			},
			ruleRequired,
		};
	},

	methods: {
		greet() {
			alert(this.message);
		},

		async addReceita() {
			try {
				const response = await incomeControler.addIncome({
					valor: parseFloat(this.data.valor),
					data: `${this.data.year}-${this.data.month}-${this.data.day}`,
					origem: this.data.origem,
				});
				if (response.status === 201) {
					statusCode.toastSuccess("Receita adicionada com sucesso!");
					this.$router.push('/financas/receitas');
				} else {
					statusCode.toastError("Erro ao adicionar receita.");
				}
			} catch (error) {
				statusCode.toastError(error);
			}
		},


	},
};
</script>

<style scoped>

</style>