module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
  const auth = require("../config/auth.config.js");
  const isAdmin = require('../config/roles/isAdmin.js');
  const isTechnician = require('../config/roles/isTechnician.js');
  const isCustomer = require('../config/roles/isCustomer.js');

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", [auth, isAdmin], customers.create);

  // Retrieve all Customers
  router.get("/", [auth, isAdmin], customers.findAll);

  // Retrieve a single Customer with id
  router.get("/:id", [auth, isAdmin], customers.findOne);

  // Update a Customer with id
  router.put("/:id", [auth, isAdmin], customers.update);

  // Delete a Customer with id
  router.delete("/:id", [auth, isAdmin], customers.delete);

  // Create a new Customer
  router.delete("/", [auth, isAdmin], customers.deleteAll);

  app.use("/api/customers", router);
};
