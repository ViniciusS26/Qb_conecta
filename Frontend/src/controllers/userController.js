import BaseController from "./baseController";
import { useUserStore } from "@/stores/user.store";

export default class UserController {
	userStore = useUserStore();
	urlBase = "/users/";

	constructor() {
		this.base = new BaseController(this.userStore);
	}

	async registerUser(body) {
		return await this.base._post(`${this.urlBase}`, body);
	}

	async getUsers() {
    return await this.base._get(`${this.urlBase}`);
  }

  async getUser(id) {
    return await this.base._get(`${this.urlBase}${id}`);
  }

  async updateUser(id, body) {
    return await this.base._put(`${this.urlBase}${id}`, body);
  }

  async deleteUser(id) {
    return await this.base._delete(`${this.urlBase}${id}`);
  }

  async generateApiKey() {
    return await this.base._post(`${this.urlBase}/me/apikey`);
  }

  async getApiKey() {
    return await this.base._get(`${this.urlBase}/me/apikey`);
  }

	async getApiCurrent(){
		return await this.base._get(`${this.urlBase}/me/apikey/history/current`);
	}

	async getApiHistory(){
		return await this.base._get(`${this.urlBase}/me/apikey/history`);
	}
}