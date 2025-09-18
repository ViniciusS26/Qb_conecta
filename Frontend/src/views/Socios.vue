<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
				<div class="d-flex justify-space-between align-center mt-2">
					<div class ="d-flex" style="width: 30%">
						<v-text-field
						class=" mr-5 bg-grey-lighten-4"
						append-inner-icon="mdi-magnify"
						label="Busca por nome ou CPF"
						v-model="filters.search"
						max-width="70%"
						variant="outlined"
						density="compact"
						hide-details
						/>
						<v-btn append-icon="mdi-plus" color="primary" to="/socios/adicionar" variant="elevated">
							Adicionar sócio
						</v-btn>
					</div>
					<div class="d-flex align-center">
						<span>Filtros: </span>
						<v-btn
							class="ma-1 d-flex align-center"
							color="primary"
							variant="outlined"
							@click="filters.selected = true, filterSocios()"
						>
							<v-tooltip
								activator="parent"
								location="bottom"
							>
								Com Atividade
							</v-tooltip>
							<v-icon>mdi-checkbox-marked-circle-outline</v-icon>
						</v-btn>
						<v-btn
							class="ma-1 d-flex align-center"
							variant="outlined"
							color="red"
							@click="filters.selected = false, filterSocios()"
						>
							<v-tooltip
								activator="parent"
								location="bottom"
							>
								Sem Atividade
							</v-tooltip>
							<v-icon>mdi-close</v-icon>
						</v-btn>
						<v-btn
							class="ma-1 d-flex align-center border-lg border-opacity-75"
							variant="outlined"
							@click="filters.selected = 'all', filterSocios()"
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
							<th>Nome</th>
							<th>CPF</th>
							<th>Data de Nascimento</th>
							<th>Pessoas na Família</th>
							<th>Cargo</th>
							<th>Possui Atividade</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item, index) in sociosFiltered"
							:key="item.Id"
							:style="{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }"
						>
							<td>{{ item.Nome }}</td>
							<td>{{ item.CPF }}</td>
							<td><DateLabel :date="new Date(item.DataDeNascimento)" /> </td>
							<td>{{ item.PessoasNaFamilia }}</td>
							<td>{{ item.Cargo }}</td>
							<td>
								<v-chip
									:color="item.PossuiAtividade ? 'green' : 'red'"
									class="d-flex justify-center bg-opacity-50"
									variant="outlined"
								>
									<span v-if="item.PossuiAtividade">sim</span>
									<span v-else>não</span>
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
										@click="editSocio(item.Id)"
										:loading="editLoading"
									>
										<v-tooltip
											activator="parent"
											location="bottom"
										>
											Editar
										</v-tooltip>
										<v-icon density="x-large">mdi-pencil</v-icon>
									</v-btn>
									<v-btn
										width="32"
										height="32"
										@click="confirmDelete(item.Id, item.Nome)"
									>
										<v-tooltip
											activator="parent"
											location="bottom"
											
										>
											Deletar
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
			<v-card-title class="headline">Editar Sócio</v-card-title>
			<v-card class="align-center justify-center">
					<v-card-title class="align-start justify-start">
						Adicionar Sócio
					</v-card-title>
					<v-card-text>
							<div class="d-flex align-center justify-center" style="width: 100%;">
								<v-row class="mt-0 ml-0 mr-0 align-start justify-center" :gutter="1">
									<v-col cols="4">
										<span>Nome</span>
										<v-text-field
										variant="outlined"
										v-model="userToEdit.Nome"
										:rules="[ruleRequired, ruleFullName]"
										density="compact"
										></v-text-field>
										
										<span>CPF</span>
										<v-text-field
											variant="outlined"
											v-model="userToEdit.CPF"
											:rules="[ruleRequired]"
											density="compact"
										></v-text-field>
										
										<span>Mantem atividade agrícola, artesanal ou cultural na cominidade</span>
										<v-combobox
											width="20%"
											v-model="userToEdit.PossuiAtividade"
											:items="atividadeAgricola.map(item => item.text)"
											variant="outlined"
											:rules="[ruleRequired]"
										></v-combobox>

									</v-col>

									<v-col cols="4">
										<span>Email</span>
										<v-text-field
											variant="outlined"
											v-model="userToEdit.Email"
											:rules="[ruleRequired, ruleEmail]"
										></v-text-field>
										
										<div class="d-flex align-center justify-center" style="width: 100%;">
											<div class="mr-3" style="width: 50%;">
												<span>Cargo</span>
												<v-combobox
												v-model="userToEdit.Cargo"
												:items="cargos.map(item => item.text)"
												variant="outlined"
												:rules="[ruleRequired]"
												></v-combobox>
											</div>
											
											<div class="ml-3" style="width: 50%;">
												<span>Pessoas na família</span>
												<v-text-field
												type="number"
												variant="outlined"
												v-model="userToEdit.PessoasNaFamilia"
												:rules="[ruleRequired]"
												></v-text-field>
											</div>
										</div>

										<div class="d-flex align-center justify-center" style="width: 100%;">
											
											<div class="ml-3" style="width: 100%;">
												<span>Data de nascimento</span>
												<v-row dense>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="userToEdit.DataDeNascimento.day"
															label="Dia"
															type="number"
															:min="1"
															:max="31"
															:rules="[ruleRequired]"
															density="compact"
														>
														</v-text-field>
													</v-col>
													<v-col cols="4">
														<v-text-field
															variant="outlined"
															v-model="userToEdit.DataDeNascimento.month"
															label="Mês"
															type="number"
															:min="1"
															:max="12"
															:rules="[ruleRequired]"
															density="compact"
														>
														</v-text-field>
													</v-col>
													<v-col cols="4">
														<v-text-field
															width="150"
															variant="outlined"
															v-model="userToEdit.DataDeNascimento.year"
															label="Ano"
															type="number"
															:min="1900"
															:max="2100"
															:rules="[ruleRequired]"
															density="compact"
														>
														</v-text-field>
													</v-col>
												</v-row>
											</div>
										</div>

									</v-col>
									<v-col class="d-flex align-center justify-center" cols="8">
										<v-btn color="primary" class="ma-2" @click="confirmEdition(userToEdit.Id)" >
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
				Tem certeza que deseja remover o sócio <strong>{{ userToDelete.name }}</strong>?
				<br><br>
				<v-alert color="warning" variant="outlined" class="mt-3">
					Esta ação não pode ser desfeita.
				</v-alert>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="grey" @click="confirmDialog = false">Cancelar</v-btn>
				<v-btn color="red" @click="deleteSocio(userToDelete.id); confirmDialog = false">Confirmar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import DateLabel from '@/components/ui/DateLabel.vue';
import UserController from '@/controllers/userController';
import { ruleRequired, ruleEmail, ruleFullName } from '@/helpers/RulesHelper';
import statusCode from '@/helpers/statusCode';

const userController = new UserController();

export default {
		name: 'Socios',
		components: {
				DateLabel,
		},
		data() {
				return {
						message: 'Hello, Vue!',
						socios: [], // Initialize socios as an empty array
						sociosFiltered: null,
						filters: {
								selected: "all",
								search: "",
						},
						dialog: false, // For the edit dialog
						confirmDialog: false, // For the delete confirmation dialog
						userToDelete: { id: null, name: '' }, // Store user info for deletion confirmation
						editLoading: false, // To manage loading state when editing
						userToEdit: {
							Id: '', // To hold the ID of the user being edited
							Nome: '',
							CPF: '',
							DataDeNascimento: {
								day: '',
								month: '',
								year: ''
							},
							PessoasNaFamilia: 0,
							Cargo: '',
							Email: '',
							dataAssociated: '', // This can be used to hold the date associated with the user
						}, // To hold the user data being edited
						atividadeAgricola: [
							{ text: 'Sim', value: true },
							{ text: 'Não', value: false }
						],
						cargos: [
							{ text: 'Presidente', value: 'presidente' },
							{ text: 'Vice-Presidente', value: 'vice-presidente' },
							{ text: 'Diretor', value: 'diretor' },
							{ text: 'Gerente', value: 'gerente' },
							{ text: 'Tesoureiro', value: 'tesoureiro' },
							{ text: 'Secretário', value: 'secretario' },
							{ text: 'Fiscal', value: 'fiscal' },		
							{ text: 'Suplente', value: 'suplente' },
							{ text: 'Associado', value: 'associado' },
							{ text: 'Funcionário', value: 'funcionario' }
						],
						ruleRequired,
						ruleEmail,
						ruleFullName,
				};
		},
		async mounted() { // Use async here because you'll be awaiting loadSocios
				await this.loadSocios(); // First, load the data
				this.filterSocios(); // Then, apply initial filters
				await this.pollingSocios(); // Start polling for updates
		},
		methods: {
				greet() {
						alert(this.message);
				},
				async loadSocios() {
						try {
								const response = await userController.getUsers().then((response) => {
										return response;
								});
								if (response.status === 200) {
									console.log('Sócios carregados com sucesso:', response.body);
										this.socios = response.body.map(user => ({
												Id: user.id,
												Nome: user.name,
												CPF: user.cpf,
												DataDeNascimento: user.data_nascimento,
												PessoasNaFamilia: user.quantidade,
												Cargo: user.cargo,
												PossuiAtividade: user.possui_atividade, // Ensure this matches your API response if it exists, otherwise set a default
												Email: user.email
										}));
								}
						} catch (error) {
								console.error('Erro ao carregar sócios:', error);
								alert('Erro ao carregar lista de sócios');
						}
				},
				async pollingSocios() {
						try {
								const response = await userController.getUsers().then((response) => {
										return response;
								});
								if (response.status === 200) {
									console.log('Sócios carregados com sucesso:', response.body);
										this.socios = response.body.map(user => ({
												Id: user.id,
												Nome: user.name,
												CPF: user.cpf,
												DataDeNascimento: user.data_nascimento,
												PessoasNaFamilia: user.quantidade,
												Cargo: user.cargo,
												PossuiAtividade: user.possui_atividade, // Ensure this matches your API response if it exists, otherwise set a default
												Email: user.email
										}));
								}
						} catch (error) {
								statusCode.toastError({
										status: error.response ? error.response.status : 500,
										statusText: error.message || 'Erro ao carregar sócios',
								});
						} finally {
							await new Promise((resolve) => setTimeout(resolve, 5000));
							this.pollingSocios();
						}
				},
				filterSocios() {
						let tempSocios = [...this.socios]; // Create a copy to filter

						if (this.filters.search) {
								tempSocios = tempSocios.filter((item) =>
										item?.Nome?.toLowerCase().includes(this.filters.search.toLowerCase()) ||
										item?.CPF?.includes(this.filters.search)
								);
						}

						switch (this.filters.selected) {
								case "all":
										// If "all" and no search, it's just the original socios
										break; // No need to re-assign tempSocios here as it's already a copy of this.socios or filtered by search
								case true:
										tempSocios = tempSocios.filter((item) => item.PossuiAtividade);
										break;
								case false:
										tempSocios = tempSocios.filter((item) => !item.PossuiAtividade);
										break;
						}
						this.sociosFiltered = tempSocios;
						console.log(this.sociosFiltered);
				},
				async editSocio(id) {
					this.editLoading = true; // Set loading state to true
						// Implement the logic to edit a socio
						try {
								const response = await userController.getUser(id).then((response) => {
										return response;
								});
								if (response.status === 200) {
									console.log('Sócio carregado com sucesso:', response.body);
										this.userToEdit.Id = response.body?.id || '';
										this.userToEdit.CPF = response.body?.cpf || '';
										this.userToEdit.Nome = response.body?.name || '';
										const [year, month, day] = response.body.data_nascimento.split("-");
										this.userToEdit.DataDeNascimento = {
												day: day || '',
												month: month || '',
												year: year || ''
										};
										this.userToEdit.PessoasNaFamilia = response.body?.quantidade || 0;
										this.userToEdit.Cargo = response.body?.cargo || '';
										this.userToEdit.Email = response.body?.email || '';
										this.userToEdit.dataAssociated = response.body?.dtassociacao || '';
								}
								this.dialog = true; // Open the dialog for editing
						} catch (error) {
								statusCode.toastError({
										status: error.response ? error.response.status : 500,
										statusText: error.message || 'Erro ao carregar sócio para edição',
								});
						}finally {
								this.editLoading = false; // Reset loading state
						}
						
				},
				confirmDelete(id, name) {
					this.userToDelete = { id, name };
					this.confirmDialog = true;
				},
				async deleteSocio(id){
						// Implement the logic to delete a socio
						try {
								const response = await userController.deleteUser(id).then((response) => {
										return response;
								});
								if (response.status === 200) {
										statusCode.toastSuccess({
												status: response.status,
												statusText: "Sócio excluído com sucesso",
										});
										this.loadSocios(); // Reload the list of socios after deletion
								}
						} catch (error) {
								// Check if it's a CORS error
								if (error.message && error.message.includes('CORS')) {
									statusCode.toastError({
										status: 500,
										statusText: 'Erro de CORS: O servidor precisa ser configurado para permitir requisições deste domínio',
									});
								} else {
									statusCode.toastError({
										status: error.response ? error.response.status : 500,
										statusText: error.message || 'Erro ao excluir sócio',
									});
								}
						}
				},
				async confirmEdition(id) {
						// Implement the logic to confirm the edition of a socio
						const payload = {
								name: this.userToEdit.Nome,
								email: this.userToEdit.Email,
								cpf: this.userToEdit.CPF.replace(/[.-]/g, ''),
								data_nascimento: `${this.userToEdit.DataDeNascimento.year}-${String(this.userToEdit.DataDeNascimento.month).padStart(2, '0')}-${String(this.userToEdit.DataDeNascimento.day).padStart(2, '0')}`,
								senha: this.userToEdit.CPF.replace(/[.-]/g, ''), // Assuming CPF is used as a password, adjust if needed
								quantidade: this.userToEdit.PessoasNaFamilia,
								cargo: this.userToEdit.Cargo,
								dtassociacao: this.userToEdit.dataAssociated, // Assuming this is the date associated with the user
						};
						console.log('Payload para edição:', payload);
						await userController.updateUser(id, payload)
						.then(response => {
								statusCode.toastSuccess({
										status: response.status,
										statusText: "Sócio editado com sucesso",
								});
								this.dialog = false; // Close the dialog // Reload the list of socios
						})
						.catch(error => {
								statusCode.toastError({
										status: error.response ? error.response.status : 500,
										statusText: error.message || 'Erro ao editar sócio',
								});
						}).finally(async () =>
							{
								this.editLoading = false; // Reset loading state after the operation
								this.dialog = false; // Close the dialog after editing
								await this.loadSocios(); // Reload the list of socios to reflect changes
								this.filterSocios(); // Reapply filters after editing
							}
						);
				}
		},
		watch: {
				"filters.search"() {
						console.log(this.filters.search);
						this.filters.selected = "search"; // This might not be necessary if you handle search within filterSocios
						this.filterSocios();
				},
				"filters.selected"() { // Watch for changes in selected filter as well
						this.filterSocios();
				}
		},
};
</script>

<style scoped>

</style>