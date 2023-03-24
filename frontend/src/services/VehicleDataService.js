import http from "../http-common";

class VehicleDataService {
  getAll() {
    return http.get("/vehicles");
  }

  get(id) {
    return http.get(`/vehicles/${id}`);
  }

  getByCustomerId(userId) {
    return http.get(`/vehicles/by-user/${userId}`);
  }

  create(data) {
    return http.post("/vehicles", data);
  }

  update(id, data) {
    return http.put(`/vehicles/${id}`, data);
  }

  delete(id) {
    return http.delete(`/vehicles/${id}`);
  }

  deleteAll() {
    return http.delete(`/vehicles`);
  }

  findByFirstName(licenseNo) {
    return http.get(`/vehicles?license_no=${licenseNo}`);
  }
}

export default new VehicleDataService();