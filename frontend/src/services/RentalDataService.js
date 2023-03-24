import http from "../http-common";

class RentalDataService {
  getAll() {
    return http.get("/rentals");
  }

  get(id) {
    return http.get(`/rentals/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/rentals", data);
  }

  update(id, data) {
    return http.put(`/rentals/${id}`, data);
  }

  delete(id) {
    return http.delete(`/rentals/${id}`);
  }

  deleteAll() {
    return http.delete(`/rentals`);
  }

  findByStartDate(begin) {
    return http.get(`/rentals?begin=${begin}`);
  }
}

export default new RentalDataService();