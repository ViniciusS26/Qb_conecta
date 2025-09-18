import BaseController from "./baseController";

export default class CostController {
	urlBase = "/despesas/";

	constructor() {
		this.base = new BaseController(this.userStore);
	}

	async addCost(body) {
		return await this.base._post(`${this.urlBase}`, body);
	}

	async getCosts() {
		return await this.base._get(`${this.urlBase}`);
	}

	async getCost(id) {
		return await this.base._get(`${this.urlBase}${id}`);
	}

	async updateCost(id, body) {
		return await this.base._put(`${this.urlBase}${id}`, body);
	}

	async deleteCost(id) {
		return await this.base._delete(`${this.urlBase}${id}`);
	}
}