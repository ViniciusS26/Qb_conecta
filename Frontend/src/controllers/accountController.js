import BaseController from "./baseController";
import { useUserStore } from "@/stores/user.store";

export default class AccountController {
  userStore = useUserStore();
  urlBase = "/accounts/";

  constructor() {
    this.base = new BaseController(this.userStore);
  }

  async createAccount(data) {
    const response = await this.base._post(`${this.urlBase}`, data);
    return response.body;
  }

  async getAccounts() {
    const response = await this.base._get(`${this.urlBase}`);
    return response.body;
  }

  async getAccountById(accountId) {
    const response = await this.base._get(`${this.urlBase}${accountId}`);
    return response.body;
  }

  async deleteAccountById(accountId) {
    const response = await this.base._delete(`${this.urlBase}${accountId}`);
    return response.body;
  }

  async updateAccountById(accountId, data) {
    const response = await this.base._patch(
      `${this.urlBase}${accountId}`,
      data
    );
    return response.body;
  }

  async restartAccount(accountId) {
    const response = await this.base._put(
      `${this.urlBase}/${accountId}restart`
    );
    return response.body;
  }

  async reloadAccount(accountId) {
    const response = await this.base._put(
      `${this.urlBase}/${accountId}reload`
    );
    return response.body;
  }

  async refreshAccount(accountId) {
    const response = await this.base._put(
      `${this.urlBase}/${accountId}refresh`
    );
    return response.body;
  }

  async disconnectAccount(accountId) {
    const response = await this.base._put(
      `${this.urlBase}/${accountId}disconnect`
    );
    return response.body;
  }

  async runCode(accountId, data) {
    const response = await this.base._post(
      `${this.urlBase}/${accountId}run`,
      data
    );
    return response.body;
  }

  async getEvents(accountId, options) {
    const response = await this.base._post(
      `${this.urlBase}/${accountId}/events`,
      options
    );
    return response.body;
  }

  async isRegisteredUserArray(accountId, data) {
    const response = await this.base._post(
      `${this.urlBase}/${accountId}/isRegisteredUserArray`,
      data
    );
    return response.body;
  }

  async getVariables(accountId) {
    const response = await this.base._get(
      `${this.urlBase}/${accountId}/variables`
    );
    return response.body;
  }

  async getVariable(accountId, key, defaultValue) {
    const response = await this.base._get(
      `${this.urlBase}/${accountId}/variables/${key}`,
      { params: { defaultValue } }
    );
    return response.body;
  }

  async createVariable(accountId, key, value) {
    const response = await this.base._post(
      `${this.urlBase}/${accountId}/variables/${key}`,
      { value }
    );
    return response.body;
  }

  async updateVariable(accountId, key, value) {
    const response = await this.base._put(
      `${this.urlBase}/${accountId}/variables/${key}`,
      { value }
    );
    return response.body;
  }

  async deleteVariable(accountId, key) {
    const response = await this.base._delete(
      `${this.urlBase}/${accountId}/variables/${key}`
    );
    return response.body;
  }
}
