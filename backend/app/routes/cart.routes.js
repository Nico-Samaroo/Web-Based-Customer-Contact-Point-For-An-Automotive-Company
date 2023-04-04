module.exports = app => {
  const carts = require("../controllers/cart.controller.js");
  const auth = require("../config/auth.config.js");
  const isAdmin = require('../config/roles/isAdmin.js');
  const isTechnician = require('../config/roles/isTechnician.js');
  const isCustomer = require('../config/roles/isCustomer.js');

  var router = require("express").Router();

  // Create a new Cart
  router.post("/", auth, carts.create);

  // Retrieve all Carts
  router.get("/", auth, carts.findAll);

  // Retrieve a single Cart with id
  router.get("/:id", auth, carts.findOne);

  // Retrieve a single Cart with userId
  router.get("/:userId", auth, carts.findByUserId);

  // Update a Cart with id
  router.put("/:id", auth, carts.update);

  // Delete a Cart with id
  router.delete("/:id", auth, carts.delete);

  // Create a new Cart
  router.delete("/", auth, carts.deleteAll);

  app.use("/api/carts", router);
};
