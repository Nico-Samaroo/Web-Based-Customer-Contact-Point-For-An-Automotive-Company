module.exports = app => {
  const services = require("../controllers/service.controller.js");
  const auth = require("../config/auth.config.js");
  const isAdmin = require('../config/roles/isAdmin.js');
  const isTechnician = require('../config/roles/isTechnician.js');
  const isCustomer = require('../config/roles/isCustomer.js');

  var router = require("express").Router();

  // Create a new Service
  router.post("/", [auth, isAdmin], services.create);

  // Retrieve all Services
  router.get("/", [auth, isCustomer], services.findAll);

  // Retrieve a single Service with id
  router.get("/:id", [auth, isTechnician], services.findOne);

  // Update a Service with id
  router.put("/:id", [auth, isAdmin], services.update);

  // Delete a Service with id
  router.delete("/:id", [auth, isAdmin], services.delete);

  // Create a new Service
  router.delete("/", [auth, isAdmin], services.deleteAll);

  app.use("/api/services", router);
};
