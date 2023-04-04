module.exports = app => {
  const appointments = require("../controllers/appointment.controller.js");
  const auth = require("../config/auth.config.js");
  const isAdmin = require('../config/roles/isAdmin.js');
  const isTechnician = require('../config/roles/isTechnician.js');
  const isCustomer = require('../config/roles/isCustomer.js');
  

  var router = require("express").Router();

  // Create a new Appointment
  router.post("/", isCustomer, appointments.create);

  // Retrieve all Appointments
  router.get("/", isCustomer, appointments.findAll);

  // By vehicle
  router.get("/by-vehicle/:vehicleId", isCustomer, appointments.findByVehicle);

  // Retrieve a single Appointment with id
  router.get("/:id", isCustomer, appointments.findOne);

  // Update a Appointment with id
  router.put("/:id", isTechnician, appointments.update);

  // Delete a Appointment with id
  router.delete("/:id", isAdmin, appointments.delete);

  // Create a new Appointment
  router.delete("/", isAdmin, appointments.deleteAll);

  app.use("/api/appointments", router);
};
