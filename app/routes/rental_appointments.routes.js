module.exports = app => {
    const rental_appointments = require("../controllers/rental_appointments.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Rental Appointment
    router.post("/", rental_appointments.create);
  
    // Retrieve all Rental Appointments
    router.get("/", rental_appointments.findAll);
  
    // Retrieve a single Rental Appointment with id
    router.get("/:id", rental_appointments.findOne);
  
    // Update a Rental Appointment with id
    router.put("/:id", rental_appointments.update);
  
    // Delete a Rental Appointments with id
    router.delete("/:id", rental_appointments.delete);
  
    // Delete all Rental Appointments
    router.delete("/", rental_appointments.deleteAll);
  
    app.use("/api/rental_appointments", router);
  };
  