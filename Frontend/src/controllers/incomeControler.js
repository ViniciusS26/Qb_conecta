import BaseController from "./baseController";

export default class IncomeController {
	urlBase = "/receitas/";

	constructor() {
		this.base = new BaseController(this.userStore);
	}

	async addIncome(body) {
		return await this.base._post(`${this.urlBase}`, body);
	}

	async getIncomes() {
		return await this.base._get(`${this.urlBase}`);
	}

	async getIncome(id) {
		return await this.base._get(`${this.urlBase}${id}`);
	}

	async updateIncome(id, body) {
		return await this.base._put(`${this.urlBase}${id}`, body);
	}

	async deleteIncome(id) {
		return await this.base._delete(`${this.urlBase}${id}`);
	}
}