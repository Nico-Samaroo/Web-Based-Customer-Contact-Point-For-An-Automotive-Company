import http from "../http-common";

class UserDataService {
  register(data) {
    return http.post("/users/register", data);
  }
  login(data) {
    return http.post("/users/login", data);
  }
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findByFirstName(FirstName) {
    return http.get(`/users?first_name=${FirstName}`);
  }

  sendEmail(data) {
    return http.post(`/users/email`, data);
  }
}

export default new UserDataService();