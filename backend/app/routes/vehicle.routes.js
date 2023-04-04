module.exports = app => {
  const vehicles = require("../controllers/vehicle.controller.js");
  const auth = require("../config/auth.config.js");
  const isAdmin = require('../config/roles/isAdmin.js');
  const isTechnician = require('../config/roles/isTechnician.js');
  const isCustomer = require('../config/roles/isCustomer.js');

  var router = require("express").Router();

  // Create a new Vehicle
  router.post("/", [auth, isCustomer], vehicles.create);

  // Retrieve all Vehicles
  router.get("/", [auth, isCustomer], vehicles.findAll);

  // By user
  router.get("/by-user/:userId", [auth, isCustomer], vehicles.findByUser);

  // Retrieve a single Vehicle with id
  router.get("/:id", [auth, isCustomer], vehicles.findOne);

  // Update a Vehicle with id
  router.put("/:id", [auth, isAdmin], vehicles.update);

  // Delete a Vehicle with id
  router.delete("/:id", [auth, isAdmin], vehicles.delete);

  // Create a new Vehicle
  router.delete("/", [auth, isAdmin], vehicles.deleteAll);

  app.use("/api/vehicles", router);
};
