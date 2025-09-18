<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
				<div class="d-flex justify-space-between align-center mt-2">
					<div class ="d-flex" style="width: 30%">
						<v-text-field
						class=" mr-5 bg-grey-lighten-4"
						append-inner-icon="mdi-magnify"
						label="Busca por Título ou CNPJ"
						v-model="filters.search"
						max-width="70%"
						variant="outlined"
						density="compact"
						hide-details
						/>
						<v-btn append-icon="mdi-plus" color="primary" to="/projetos/adicionar" variant="elevated">
							Novo projeto
						</v-btn>
					</div>
					<div class="d-flex align-center">
						<span>Filtros: </span>
						<v-btn
							class="ma-1 d-flex align-center"
							color="primary"
							variant="outlined"
							@click="filters.selected = 'andamento', filterProjetos()"
						>
							<v-tooltip
								activator="parent"
								location="bottom"
							>
								Em andamento
							</v-tooltip>
							<v-icon>mdi-play-speed</v-icon>
						</v-btn>
						<v-btn
							class="ma-1 d-flex align-center"
							color="gray"
							variant="outlined"
							@click="filters.selected = 'complete', filterProjetos()"
						>
							<v-tooltip
								activator="parent"
								location="bottom"
							>
								Completos
							</v-tooltip>
							<v-icon>mdi-checkbox-marked-circle-outline</v-icon>
						</v-btn>
						<v-btn
							class="ma-1 d-flex align-center"
							variant="outlined"
							color="red"
							@click="filters.selected = 'canceled', filterProjetos()"
						>
							<v-tooltip
								activator="parent"
								location="bottom"
							>
								Cancelados
							</v-tooltip>
							<v-icon>mdi-close</v-icon>
						</v-btn>
						<v-btn
							class="ma-1 d-flex align-center border-lg border-opacity-75"
							variant="outlined"
							@click="filters.selected = 'all', filterProjetos()"
						>
							<v-tooltip
								activator="parent"
								location="bottom"
							>
								Todos
							</v-tooltip>
							<v-icon>mdi-list-box-outline</v-icon>
						</v-btn>
					</div>
				</div>
			</v-col>

			<v-col cols="12">
				<v-table>
							<thead>
								<tr>
									<th>Titulo</th>
									<th>Data de Inicio</th>
									<th>Data de Término</th>
									<th>Status</th>
									<th>Ações</th>
								</tr>
							</thead>
							<tbody>
								<tr
								v-for="(item, index) in projetosFiltered"
								:key="item.id"
								:style="{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }"
								>
								<td>{{ item.Titulo }}</td>

								<td>{{ formatDate(item.dataInicio) }}</td>
            					<td>{{ formatDate(item.dataFim) }}</td>
								
								<td>
									<v-chip
									:color="item.status === 'Finalizado' ? 'gray' : item.status === 'Cancelado' ? 'red' : 'green'"
									class="chip-size d-flex justify-center"
									variant="outlined"
									>
									{{ item.status }}
								</v-chip>
							</td>
							<td>
								<v-btn-group
									variant="outlined"
									divided
									rounded="lg"
									class="custom-btn-group d-flex align-center"
								>
									<v-btn
										width="32"
										height="32"
										@click="editProject(item.Titulo)"
										:loading="editLoading"
									>
										<v-tooltip
											activator="parent"
											location="bottom"
										>
											Editar
										</v-tooltip>
										<v-icon size="x-large">mdi-pencil</v-icon>
									</v-btn>
									<v-btn
										width="32"
										height="32"
										@click="confirmDelete(item.id, item.Titulo)"
										:loading="deleteLoading"
									>
										<v-tooltip
											activator="parent"
											location="bottom"
										>
											Apagar
										</v-tooltip>
										<v-icon size="x-large">mdi-trash-can-outline</v-icon>
									</v-btn>
								</v-btn-group>
						</td>
					</tr>
				</tbody>
			</v-table>
			</v-col>
			
		</v-row>
	</v-container>
	<v-dialog v-model="dialog" max-width="1300px">
		<v-card>
			<v-card-title class="headline">Editar projeto</v-card-title>
			<v-card class="align-center justify-center">
					<v-card-text>
							<div class="d-flex align-center justify-center" style="width: 100%;">
								<v-row class="mt-0 ml-0 mr-0 align-start justify-center" :gutter="1">
									<v-col cols="4">
										<span>Título deo Projeto</span>
										<v-text-field
										variant="outlined"
										v-model="projToedit.titulo"
										:rules="[ruleRequired]"
										></v-text-field>

										<span>Usuário Relacionado</span>
										<v-combobox
											v-model="projToedit.user"
											:items="socios"
											item-title="text"
											item-value="value"
											:rules="[ruleRequired]"
											variant="outlined"
											:return-object="false"
										/>

									</v-col>

									<v-col cols="4">
										<span>Data de Início</span>
										<div class="d-flex align-center justify-center" style="width: 100%;">

												<v-row dense>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="projToedit.dataInicio.day"
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
															v-model="projToedit.dataInicio.month"
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
															v-model="projToedit.dataInicio.year"
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
															v-model="projToedit.dataFim.day"
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
															v-model="projToedit.dataFim.month"
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
															v-model="projToedit.dataFim.year"
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
										<v-btn color="primary" class="ma-2" @click="confirmProjectEdition()" >
											Confirmar Edição
										</v-btn>
									</v-col>
								</v-row>

							</div>
					</v-card-text>
				</v-card>
			<v-card-actions>
				<v-btn color="primary" @click="dialog = false">Fechar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<!-- Confirmation Dialog for Deletion -->
	<v-dialog v-model="confirmDialog" max-width="500px">
		<v-card>
			<v-card-title class="headline">Confirmar Exclusão</v-card-title>
			<v-card-text>
				Tem certeza que deseja remover o projeto <strong>{{ projToDelete.titulo }}</strong>?
				<br><br>
				<v-alert color="warning" variant="outlined" class="mt-3">
					Esta ação não pode ser desfeita.
				</v-alert>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="grey" @click="confirmDialog = false">Cancelar</v-btn>
				<v-btn color="red" @click="deleterProjeto(projToDelete.id); confirmDialog = false">Confirmar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import DateLabel from '@/components/ui/DateLabel.vue';
import ProjectsController from '@/controllers/projectsControler';
import statusCode from '@/helpers/statusCode';
import { ruleRequired, ruleFullName } from '@/helpers/RulesHelper';
import UserController from '@/controllers/userController';

const projectsControler = new ProjectsController();
const userController = new UserController();

export default {
	name: 'projetos',
	components: {
		DateLabel,
	},
	data() {
		return {
			message: 'Hello, Vue!',
			projetos: [ ],
			projetosFiltered: null,
			confirmDialog: false,
			filters: {
				selected: "all",
				search: "",
				},
			projToedit: {
				titulo: "",
				dataInicio:{
					day: "",
					month: "",
					year: "",
				},
				dataFim:{
					day: "",
					month: "",
					year: "",
				},
				user: "",
			},
			projToDelete: {
				id: null,
				titulo: "",
			},
			dialog: false,
			editLoading: false,
			socios: [],
			status: [
				{ text: 'Em Andamento', value: 'inProgress' },
				{ text: 'Finalizado', value: 'complete' },
				{ text: 'Cancelado', value: 'cancel' },
			],
			ruleFullName,
			ruleRequired,
		};
	},
	async mounted(){
		await this.loadProjetos();
		this.filterProjetos();
		await this.loadSocios();
	},
	methods: {
		async loadProjetos() {
			try {
				const response = await projectsControler.getProjects().then((response) => {
						return response;
				});

				console.log(response);

				// Um status 200 é o esperado para requisições GET bem-sucedidas
		
				if (response.status === 200) {
					const hoje = new Date();
					this.projetos = response.body.map((item) => ({

						id: item.id,
						Titulo: item.titulo,
						//converter data_inicio e data_fim para o formato valido dia mes e ano
						
						dataInicio: item.dtinicio,
						dataFim: item.dtfim,
						status: hoje > new Date(item.dtfim) ? "Finalizado" : "Em Andamento",
					}));
				} else {
					// Se o status não for 200, lance um erro
					throw new Error(`Erro ao carregar projetos: ${response.statusText}`);
				}
			} catch (error) {
				// Captura erros de rede, erros HTTP (4xx, 5xx)
				statusCode.toastError({
					status: error.response ? error.response.status : 500,
					statusText: error.message || 'Erro ao carregar projetos',
				});

				// Opcional: Se for um erro 401/403 (Unauthorized/Forbidden), redirecionar para o login
				if (error.response && (error.response.status === 401 || error.response.status === 403)) {
					// Lógica para deslogar e redirecionar
					// this.$router.push('/login');
				}
			}
		},
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
		filterProjetos() {
			let tempProjetos = [...this.projetos]; // Começa com uma cópia dos projetos originais

			// Aplica o filtro de busca primeiro, se houver
			if (this.filters.search) {
				const searchTerm = this.filters.search.toLowerCase();
				tempProjetos = tempProjetos.filter((item) =>
					item?.Titulo?.toLowerCase().includes(searchTerm) ||
					item?.CNPJ?.includes(searchTerm) // CNPJ geralmente não é sensível a maiúsculas/minúsculas, mas a busca sim
				);
			}

			// Aplica o filtro de status sobre os resultados da busca (ou sobre todos os projetos se não houver busca)
			switch (this.filters.selected) {
				case "andamento":
					tempProjetos = tempProjetos.filter((item) => item.status === "Em Andamento");
					break;
				case "canceled":
					tempProjetos = tempProjetos.filter((item) => item.status === "Cancelado");
					break;
				case "complete":
					tempProjetos = tempProjetos.filter((item) => item.status === "Finalizado");
					break;
				// Para "all" ou "search" (já tratado acima), não fazemos um filtro adicional aqui.
				// O caso "search" só serve para indicar que o filtro de busca está ativo,
				// a filtragem real já aconteceu no 'if (this.filters.search)'.
			}

			this.projetosFiltered = tempProjetos;
			console.log("Projetos Filtrados:", this.projetosFiltered);
		},
		formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            // Verifica se a data é válida
            if (isNaN(date.getTime())) {
                return 'Data Inválida'; // Ou algum placeholder de erro
            }
            // Formate a data como desejar, por exemplo: DD/MM/AAAA
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexed
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
		async editProject(id){
			this.editLoading = true;
			try {
				const response = await projectsControler.getProject(id).then((response) => {
					return response;
				});
				if (response.status === 200) {
					console.log("Projeto carregado:", response?.body);
					this.projToedit.id = response?.body?.id;
					this.projToedit.titulo = response?.body?.titulo;
					const [yearI, monthI, dayI] = response?.body?.dtinicio.split("-");
					const [yearF, monthF, dayF] = response?.body?.dtfim.split("-");
						this.projToedit.dataInicio = {
							day: dayI,
							month: monthI,
							year: yearI,
						},
						this.projToedit.dataFim = {
							day: dayF,
							month: monthF,
							year: yearF,
						}
					this.projToedit.user = response?.body?.iduser;
					let date = new Date();
					date > new Date(response?.body?.dtfim) ? this.projToedit.status = "complete" : this.projToedit.status = "inProgress";
				} else {
					throw new Error("Erro ao carregar o projeto");
				}
				this.dialog = true;
			} catch (error) {
				statusCode.toastError(error);
			} finally {
				this.editLoading = false;
			}
		},
		async confirmProjectEdition() {
			console.log("Confirmando edição do projeto:", this.projToedit.dataInicio.day);
			try {
				const payload = {
					titulo: this.projToedit.titulo,
					dtinicio: `${this.projToedit.dataInicio.year}-${String(this.projToedit.dataInicio.month).padStart(2, '0')}-${String(this.projToedit.dataInicio.day).padStart(2, '0')}`,
					dtfim: `${this.projToedit.dataFim.year}-${String(this.projToedit.dataFim.month).padStart(2, '0')}-${String(this.projToedit.dataFim.day).padStart(2, '0')}`,
					iduser: this.projToedit.user,
				};

				await projectsControler.updateProject(this.projToedit.id, payload)
				.then(response => {
						statusCode.toastSuccess({
							status: response.status,
							statusText: "Projeto editado com sucesso",
						});
						this.dialog = false;
				})
			} catch (error) {
				statusCode.toastError(error);
			}
			await this.loadProjetos();
			this.filterProjetos();

		},
		confirmDelete(id,titulo) {
			this.projToDelete = {id, titulo};
			this.confirmDialog = true;
		},
		async deleterProjeto(id){
			try {
				const response = await projectsControler.deleteProject(id).then((response) => {
					return response;
				});
				if (response.status === 200) {
					statusCode.toastSuccess({
						status: response.status,
						statusText: "Projeto deletado com sucesso",
					});
					this.loadProjetos();
					this.filterProjetos();
				} 
			} catch (error) {
				statusCode.toastError(error);
			}
		}
	},

	watch: {
		"filters.search"() {
			console.log(this.filters.search);
			this.filters.selected = "search";
			this.filterProjetos();
		}
	},
};
</script>

<style scoped>

</style>