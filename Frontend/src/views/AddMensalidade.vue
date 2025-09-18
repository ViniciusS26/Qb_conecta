<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
				<v-card class="align-center justify-center">
					<v-card-title class="align-start justify-start">
						Adicionar mensalidade
					</v-card-title>
					<v-card-text>
							<div class="d-flex align-center justify-center" style="width: 100%;">
								<v-row class="mt-0 ml-0 mr-0 align-start justify-center" :gutter="1">
									<v-col cols="4">
										<span>valor</span>
										<v-text-field
										variant="outlined"
										v-model="data.valor"
										type="number"
										:rules="[ruleRequired]"
										></v-text-field>

										<span>Usuário Relacionado</span>
										<v-combobox
											v-model="data.selectedUserId"
											:items="socios"
											item-title="text"
											item-value="value"
											:rules="[ruleRequired]"
											variant="outlined"
											:return-object="false"
										/>

									</v-col>

									<v-col cols="4">
										<span>Data de Vencimento</span>
										<div class="d-flex align-center justify-center" style="width: 100%;">

												<v-row dense>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="data.dayV"
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
															v-model="data.monthV"
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
															v-model="data.yearV"
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
											<span>Data de Pagamento</span>
											<div class="" style="width: 100%;">
												<v-row dense>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="data.dayP"
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
															v-model="data.monthP"
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
															v-model="data.yearP"
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
										<v-btn color="primary" class="ma-2" @click="addProjeto" >
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
import { ruleRequired, ruleEmail, ruleFullName } from '@/helpers/RulesHelper';
import UserController from '@/controllers/userController';
import MonthlyController from '@/controllers/monthlyControler';
import statusCode from '@/helpers/statusCode';

const userController = new UserController();
const monthlyController = new MonthlyController();

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
				dayV: '',
				monthV: '',
				yearV: '',
				dayP: '',
				monthP: '',
				yearP: '',
				dataVencimento: '',
				dataPagametno: '',
				status: '',
				selectedUserId: "",
			},
			status: [
				{ text: 'Em Andamento', value: 'inProgress' },
				{ text: 'Finalizado', value: 'complete' },
				{ text: 'Cancelado', value: 'cancel' },
			],
			socios: [],
			ruleRequired,
			ruleEmail,
			ruleFullName,
		};
	},
	async mounted() {
		await this.loadSocios();
	},

	methods: {
		greet() {
			alert(this.message);
		},
		//criar metodo para cadastrar projeto na api usando axios:http://localhost:8000/projetos/

		async loadSocios() {
						try {
								const response = await userController.getUsers().then((response) => {
										return response;
								});
								if (response.status === 200) {
										this.socios = response.body.map(user => ({
											text: user.name,
											value: user.id,
										}));
								}
						} catch (error) {
							statusCode.toastError(error);
						}
				},

		async addProjeto() {
			try {

				const payload = {
					valor: parseFloat(this.data.valor) || 0,
					dtvencimento: `${this.data.yearV}-${String(this.data.monthV).padStart(2, '0')}-${String(this.data.dayV).padStart(2, '0')}`,
					dtpagamento: `${this.data.yearP}-${String(this.data.monthP).padStart(2, '0')}-${String(this.data.dayP).padStart(2, '0')}`,
					status: "Em Dia",
					iduser: this.data.selectedUserId,
				};
				console.log("valor da mensalidade", payload.valor);
				const response = await monthlyController.addMonthly(payload).then((response) => {
					return response;
				});
				if (response.status === 201) {
					statusCode.toastSuccess({
						status: response.status,
						statusText: "Mensalidade adicionada com sucesso!",
					});
					this.$router.push("/financas");
				}
			} catch (error) {
				statusCode.toastError(error);
			}
		}


	},
};
</script>

<style scoped>

</style>