import BaseController from "./baseController";

export default class ProjectsController {
  urlBase = "/projetos/";

  constructor() {
    this.base = new BaseController(this.userStore);
  }

  async addProject(body) {
    return await this.base._post(`${this.urlBase}`, body);
  }

  async getProjects() {
    return await this.base._get(`${this.urlBase}`);
  }

  async getProject(id) {
    return await this.base._get(`${this.urlBase}${id}`);
  }

  async updateProject(id, body) {
    return await this.base._put(`${this.urlBase}${id}`, body);
  }

  async deleteProject(id) {
    return await this.base._delete(`${this.urlBase}${id}`);
  }
}