import http from "../http-common";

class PartDataService {
  getAll() {
    return http.get("/parts");
  }

  get(id) {
    return http.get(`/parts/${id}`);
  }

  create(data) {
    return http.post("/parts", data);
  }

  update(id, data) {
    return http.put(`/parts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/parts/${id}`);
  }

  deleteAll() {
    return http.delete(`/parts`);
  }

  findByFirstName(licenseNo) {
    return http.get(`/parts?license_no=${licenseNo}`);
  }
}

export default new PartDataService();