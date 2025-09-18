<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
				<div class="d-flex justify-space-between align-center">
					<div class="d-flex" width="50%">
						<Receita/>
						<Despesa/>
					</div>
				</div>
			</v-col>

			<v-col cols="12">
				<v-card>
					<v-card-title class="d-flex align-center justify-space-between">
						Receitas
						<v-btn append-icon="mdi-plus" color="primary" to="receitas/adicionar" variant="elevated">
							Adicionar Receita
						</v-btn>
					</v-card-title>
					<v-card-text>

						<v-table>
							<thead>
								<tr>
									<th>Origem</th>
									<th>Data</th>
									<th>valor</th>
									<th>Ações</th>
								</tr>
							</thead>
							<tbody>
								<tr
								v-for="(item, index) in ReceitasFiltered"
								:key="item.id"
								:style="{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }"
								>
								<td>{{ item.Origem }}</td>
								<td><DateLabel :date="new Date(item.Data)" /> </td>
								<td>R$ {{ item.Valor.toFixed(2) }}</td>
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
										@click="receitaEdit(item)"
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
										@click="deleteReceita(item)"
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
		</v-card-text>
	</v-card>
			</v-col>
			
		</v-row>
	</v-container>

	<v-dialog v-model="dialog" max-width="1300px">
		<v-card>
			<v-card-title class="headline">Editar Receita</v-card-title>
			<v-card class="align-center justify-center">
					<v-card-text>
							<div class="d-flex align-center justify-center" style="width: 100%;">
								<v-row class="mt-0 ml-0 mr-0 align-start justify-center" :gutter="1">
									<v-col cols="4">
										<span>Valor</span>
										<v-text-field
										variant="outlined"
										v-model="recToEdit.valor"
										type="number"
										:rules="[ruleRequired]"
										></v-text-field>

										<span>Origem</span>
										<v-text-field
										variant="outlined"
										v-model="recToEdit.origem"
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
															v-model="recToEdit.day"
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
															v-model="recToEdit.month"
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
															v-model="recToEdit.year"
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
										<v-btn color="primary" class="ma-2" @click="confirmEdition()" >
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
import Receita from '@/components/ui/Receita.vue';
import Despesa from '@/components/ui/Despesa.vue';
import IncomeController from '@/controllers/incomeControler';
import { ruleRequired } from '@/helpers/RulesHelper';

const incomeController = new IncomeController();

export default {
	name: 'receitas',
	components: {
		DateLabel,
		Receita,
		Despesa,
	},
	data() {
		return {
			message: 'Hello, Vue!',
			Receitas: [],
			ReceitasFiltered: [],
			filters: {
				selected: "all",
				},
			recToEdit: null,
			dialog: false,
			editLoading: false,
			confirmDialog: false,
			recToDelete: null,
			ruleRequired,
		};
	},
	async mounted(){
		await this.loadReceitas();
		this.filterReceitas();
	},
	methods: {
		greet() {
			alert(this.message);
		},
		async loadReceitas() {
			try {
				const response = await incomeController.getIncomes();
				// Verifica se a resposta é bem-sucedida
				if (response.status === 200) {
					this.Receitas = response.body.map(item => ({
						id: item.id,
						Origem: item.origem,
						Data: item.data,
						Valor: item.valor,
					}));
					this.filterReceitas();
				} else {
					console.error('Erro ao carregar receitas:', response.statusText);
				}
			} catch (error) {
				console.error('Erro ao carregar receitas:', error);
			}
		},
		receitaEdit(item) {
			this.editLoading = true;
			const [year, month, day] = item.Data.split('-');
			this.recToEdit = {
				id: item.id,
				valor: item.Valor,
				origem: item.Origem,
				day: day,
				month: month,
				year: year,
			};

			this.dialog = true;
		},

		async confirmEdition() {
			try {
				const payload = {
					valor: parseFloat(this.recToEdit.valor),
					data: `${this.recToEdit.year}-${this.recToEdit.month}-${this.recToEdit.day}`,
					origem: this.recToEdit.origem,
				};
				const response = await incomeController.updateIncome(this.recToEdit.id, payload);
				if (response.status === 200) {
					this.dialog = false;
					this.editLoading = false;
				} else {
					console.error('Erro ao atualizar receita:', response.statusText);
				}
			} catch (error) {
				console.error('Erro ao atualizar receita:', error);
			}
			await this.loadReceitas();
		},
		filterReceitas() {
			switch (this.filters.selected) {
				case "all":
					this.ReceitasFiltered = this.Receitas;
					break;
			}
		},
		deleteReceita(item) {
			this.confirmDialog = true;
			this.projToDelete = item;
		},
		async deleterProjeto(id) {
			try {
				const response = await incomeController.deleteIncome(id);
				if (response.status === 200) {
					this.confirmDialog = false;
					this.loadReceitas();
				} else {
					console.error('Erro ao excluir receita:', response.statusText);
				}
			} catch (error) {
				console.error('Erro ao excluir receita:', error);
			}
		},
	},
};

</script>

<style scoped>

</style>