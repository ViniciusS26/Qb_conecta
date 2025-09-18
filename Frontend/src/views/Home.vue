<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
				<span class="ml-4 text-h5">Seus atalhos</span>
				<div>
					<v-hover v-slot:default="{ isHovering, props }">
						<v-btn
							v-bind="props"
							class="ma-4 text-h6"
							prepend-icon="mdi-account-plus"
							:color="isHovering ? 'primary' : ''"
							size="x-large"
							stacked
							to="/socios/adicionar"
						>
							Adicionar sócio
						</v-btn>
					</v-hover>
					<v-hover v-slot:default="{ isHovering, props }">
						<v-btn
							v-bind="props"
							class="ma-4 text-h6"
							prepend-icon="mdi-calendar-month"
							:color="isHovering ? 'primary' : ''"
							size="x-large"
							stacked
							to="/financas"
						>
							Mensalidades
						</v-btn>
					</v-hover>
					<v-hover v-slot:default="{ isHovering, props }">
						<v-btn
							v-bind="props"
							class="ma-4 text-h6"
							prepend-icon="mdi-plus-circle-outline"
							:color="isHovering ? 'primary' : ''"
							size="x-large"
							stacked
							to="/projetos/adicionar"
						>
							Novo Projeto
						</v-btn>
					</v-hover>
				</div>
			</v-col>

			<v-col cols="12">
				<v-card>
					<v-card-title>
						Projetos em andamento
					</v-card-title>
					<v-card-text>

						<v-table>
							<thead>
								<tr>
									<th>Titulo</th>
									<th>Data de Inicio</th>
									<th>Data de Término</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(item, index) in projetosFiltered"
									:key="item.id"
									:style="{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8' }"
								>
									<td>{{ item.titulo }}</td>
									<td><DateLabel :date="new Date(item.dtinicio)" /> </td>
									<td><DateLabel :date="new Date(item.dtfim)" /> </td>
									<td>
										<v-chip
										:color="new Date(item.dtfim) <  new Date() ? 'gray' : 'green'"
										class="chip-size d-flex justify-center"
										variant="outlined"
										>
										Em Andamento
									</v-chip>
									</td>
								</tr>
							</tbody>
						</v-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>	
</template>

<script>
import DateLabel from '@/components/ui/DateLabel.vue';
import ProjectsController from '@/controllers/projectsControler';

const projectsController = new ProjectsController();

export default {
	name: 'projetos',
	components: {
		DateLabel,
	},
	data() {
		return {
			message: 'Hello, Vue!',
			projetos: [],
			projetosFiltered: null,
			filters: {
				selected: "andamento",
				search: "",
				},
		};
	},
	async mounted(){
		await this.loadProjetos();
		this.filterProjetos();
		console.log(this.projetos);
	},
	methods: {
		async loadProjetos() {
			try {
				const response = await projectsController.getProjects();
				this.projetos = response.body;
				this.projetosFiltered = this.projetos; // Initialize with all projects
			} catch (error) {
				console.error("Error loading projects:", error);
			}
		},
		filterProjetos() {
			switch (this.filters.selected) {
				case "andamento":
					this.projetosFiltered = this.projetos.filter((item) => new Date(item.dtfim) > new Date());
					break;
			}
		},
	},
};
</script>

<style scoped>

</style>