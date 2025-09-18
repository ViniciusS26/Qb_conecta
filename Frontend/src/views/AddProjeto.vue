<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
				<v-card class="align-center justify-center">
					<v-card-title class="align-start justify-start">
						Adicionar Projeto
					</v-card-title>
					<v-card-text>
							<div class="d-flex align-center justify-center" style="width: 100%;">
								<v-row class="mt-0 ml-0 mr-0 align-start justify-center" :gutter="1">
									<v-col cols="4">
										<span>Título deo Projeto</span>
										<v-text-field
										variant="outlined"
										v-model="data.titulo"
										:rules="[ruleRequired, ruleFullName]"
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

										<span>Status</span>
										<v-combobox
											v-model="data.status"
											:items="status"
											item-title="text"
											item-value="value"
											variant="outlined"
											:rules="[ruleRequired]"
											:return-object="false"
										></v-combobox>
									</v-col>

									<v-col cols="4">
										<span>Data de Início</span>
										<div class="d-flex align-center justify-center" style="width: 100%;">

												<v-row dense>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="data.dayI"
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
															v-model="data.monthI"
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
															v-model="data.yearI"
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
											<span>Data de Finalização</span>
											<div class="" style="width: 100%;">
												<v-row dense>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="data.dayF"
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
															v-model="data.monthF"
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
															v-model="data.yearF"
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
import ProjectsController from '@/controllers/projectsControler';
import statusCode from '@/helpers/statusCode';

const userController = new UserController();
const projectsController = new ProjectsController();

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
				titulo: '',
				dayI: '',
				monthI: '',
				yearI: '',
				dayF: '',
				monthF: '',
				yearF: '',
				dataInicio: '',
				datafim: '',
				descrição: '',
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
								console.error('Erro ao carregar sócios:', error);
								alert('Erro ao carregar lista de sócios');
						}
				},

		async addProjeto() {
			try {

				const payload = {
					titulo: this.data.titulo,
					dtinicio: `${this.data.yearI}-${String(this.data.monthI).padStart(2, '0')}-${String(this.data.dayI).padStart(2, '0')}`,
					dtfim: `${this.data.yearF}-${String(this.data.monthF).padStart(2, '0')}-${String(this.data.dayF).padStart(2, '0')}`,
					iduser: this.data.selectedUserId,
				};

				const response = await projectsController.addProject(payload).then((response) => {
					return response;
				});
				if (response.status === 201) {
					statusCode.toastSuccess({
						status: response.status,
						statusText: "Projeto adicionado com sucesso",
					});
					this.$router.push("/projetos");
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