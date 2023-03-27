import http from "../http-common";

class PartDataService {
  getAll() {
    return http.get("/quotes");
  }

  get(id) {
    return http.get(`/quotes/${id}`);
  }

  create(data) {
    return http.post("/quotes", data);
  }

  update(id, data) {
    return http.put(`/quotes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/quotes/${id}`);
  }

  deleteAll() {
    return http.delete(`/quotes`);
  }

  findByDescription(description) {
    return http.get(`/quotes?description=${description}`);
  }
}

export default new PartDataService();