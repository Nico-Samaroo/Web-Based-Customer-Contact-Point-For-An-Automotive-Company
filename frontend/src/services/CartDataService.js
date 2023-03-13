import http from "../http-common";

class CartDataService {
  getAll() {
    return http.get("/carts");
  }

  get(id) {
    return http.get(`/carts/${id}`);
  }

  getByCustomer(customerId) {
    return http.get(`/carts?customerId=${customerId}`);
  }

  create(data) {
    return http.post("/carts", data);
  }

  update(id, data) {
    return http.put(`/carts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/carts/${id}`);
  }

  deleteAll() {
    return http.delete(`/carts`);
  }

  findByCode(code) {
    return http.get(`/carts?code=${code}`);
  }
}

export default new CartDataService();