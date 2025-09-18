import BaseController from "./baseController";

export default class MonthlyController {
	urlBase = "/mensalidades/";

	constructor() {
		this.base = new BaseController(this.userStore);
	}

	async addMonthly(body) {
		return await this.base._post(`${this.urlBase}`, body);
	}

	async getMonthlys() {
		return await this.base._get(`${this.urlBase}`);
	}

	async getMonthly(id) {
		return await this.base._get(`${this.urlBase}${id}`);
	}

	async updateMonthly(id, body) {
		return await this.base._put(`${this.urlBase}${id}`, body);
	}

	async deleteMonthlyt(id) {
		return await this.base._delete(`${this.urlBase}${id}`);
	}
}