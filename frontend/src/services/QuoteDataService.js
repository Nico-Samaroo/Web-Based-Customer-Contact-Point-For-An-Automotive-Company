import http from "../http-common";

class QuoteDataService {
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

  findByCode(code) {
    return http.get(`/quotes?code=${code}`);
  }
}

export default new QuoteDataService();