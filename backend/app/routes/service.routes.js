module.exports = app => {
  const services = require("../controllers/service.controller.js");
  const auth = require("../config/auth.config.js");

  var router = require("express").Router();

  // Create a new Service
  router.post("/", services.create);

  // Retrieve all Services
  router.get("/", services.findAll);

  // Retrieve a single Service with id
  router.get("/:id", services.findOne);

  // Update a Service with id
  router.put("/:id", services.update);

  // Delete a Service with id
  router.delete("/:id", services.delete);

  // Create a new Service
  router.delete("/", services.deleteAll);

  app.use("/api/services", router);
};
