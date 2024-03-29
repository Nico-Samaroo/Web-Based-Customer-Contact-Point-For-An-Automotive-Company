module.exports = app => {
  const rentals = require("../controllers/rental.controller.js");
  const auth = require("../config/auth.config.js");
  const isAdmin = require('../config/roles/isAdmin.js');
  const isTechnician = require('../config/roles/isTechnician.js');
  const isCustomer = require('../config/roles/isCustomer.js');
  

  var router = require("express").Router();

  // Create a new Rental
  router.post("/", [auth, isCustomer], rentals.create);

  // Retrieve all Rentals
  router.get("/", [auth, isAdmin], rentals.findAll);

  // Retrieve a single Rental with id
  router.get("/:id", [auth, isAdmin], rentals.findOne);

  // Update a Rental with id
  router.put("/:id", [auth, isAdmin], rentals.update);

  // Delete a Rental with id
  router.delete("/:id", [auth, isAdmin], rentals.delete);

  // Create a new Rental
  router.delete("/", [auth, isAdmin], rentals.deleteAll);

  app.use("/api/rentals", router);
};
