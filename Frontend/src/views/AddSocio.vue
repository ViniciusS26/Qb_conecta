<template>
	<v-container class="ma-0 fill-height align-start" max-width="100%">
		<v-row class="mt-0 ml-0 mr-0" :gutter="1">
			<v-col cols="12">
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
										v-model="data.name"
										:rules="[ruleRequired, ruleFullName]"
										size="compact"
										></v-text-field>
										
										<span>CPF</span>
										<v-text-field
											variant="outlined"
											v-model="data.cpf"
											:rules="[ruleRequired]"
											size="compact"
										></v-text-field>
										
										<span>Mantem atividade agrícola, artesanal ou cultural na cominidade</span>
										<v-combobox
											width="20%"
											v-model="data.atvNaComunidade"
											:items="atividadeAgricola.map(item => item.text)"
											variant="outlined"
											:rules="[ruleRequired]"
										></v-combobox>

									</v-col>

									<v-col cols="4">
										<span>Email</span>
										<v-text-field
											variant="outlined"
											v-model="data.email"
											:rules="[ruleRequired, ruleEmail]"
										></v-text-field>
										
										<div class="d-flex align-center justify-center" style="width: 100%;">
											<div class="mr-3" style="width: 50%;">
												<span>Cargo</span>
												<v-combobox
												v-model="data.cargo"
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
												v-model="data.familia"
												:rules="[ruleRequired]"
												></v-text-field>
											</div>
										</div>

										<div class="d-flex align-center justify-center" style="width: 100%;">
											<div class="mr-3" style="width: 50%;">
												<span>sexo</span>
												<v-checkbox class="my-0" value="homem" label="Homem" v-model="data.sexo"></v-checkbox>
												<v-checkbox class="my-0" value="mulher" label="Mulher" v-model="data.sexo"></v-checkbox>
											</div>
											
											<div class="ml-3" style="width: 50%;">
												<span>Data de nascimento</span>
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
															size="compact"
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
															size="compact"
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
															size="compact"
														>
														</v-text-field>
													</v-col>
												</v-row>
											</div>
										</div>

									</v-col>
									<v-col class="d-flex align-center justify-center" cols="8">
										<v-btn color="primary" class="ma-2" @click="addSocios" >
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
import { ruleRequired, ruleEmail, ruleFullName} from '@/helpers/RulesHelper';
import UserController from '@/controllers/userController';
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
			data: {
				name: '',
				email: '',
				cpf: '',
				day: '',
				month: '',
				year: '',
				birthDate: '',
				cargo: '',
				familia: '',
				atvNaComunidade: '',
				sexo: '',
			},
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
	methods: {
		addSocios() {
			try{
				const data_modificada = `${this.data.year}-${String(this.data.month).padStart(2, '0')}-${String(this.data.day).padStart(2, '0')}`;
				//pegar data atual no formato YYYY-MM-DD
				console.log("Data modificada:", data_modificada);
				const data_nascimento = `${this.data.year}-${String(this.data.month).padStart(2, '0')}-${String(this.data.day).padStart(2, '0')}`;
				const hoje = new Date();
				const dtassociacao = hoje.toISOString().split('T')[0]; // formato YYYY-MM-DD

				const payload = {
					name: this.data.name,
					email: this.data.email,
					cpf: this.data.cpf,
					data_nascimento: data_modificada,
					senha: this.data.cpf, // ou outro campo de senha, se houver
					quantidade: Number(this.data.familia) || 1, // valor padrão 1 se não informado
					cargo: this.data.cargo,
					dtassociacao: dtassociacao
				};

			
				userController.registerUser(payload)
				.then(response => {
						statusCode.toastSuccess({
							status: response.status,
							statusText: "Associado adicionado com sucesso",
						});
						window.location.href = "/socios";
				})
			} catch (error) {
				statusCode.toastError(error);
			}
		}
	},
};
</script>

<style scoped>

</style>