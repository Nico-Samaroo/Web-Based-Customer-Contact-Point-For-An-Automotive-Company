import http from "../http-common";

class AppointmentDataService {
  getAll() {
    return http.get("/appointments");
  }

  get(id) {
    return http.get(`/appointments/${id}`);
  }

  getByVehicleId(vehicleId) {
    return http.get(`/appointments/by-vehicle/${vehicleId}`);
  }

  create(data) {
    return http.post("/appointments", data);
  }

  update(id, data) {
    return http.put(`/appointments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/appointments/${id}`);
  }

  deleteAll() {
    return http.delete(`/appointments`);
  }

  findByStartDate(start) {
    return http.get(`/appointments?start=${start}`);
  }
}

export default new AppointmentDataService();