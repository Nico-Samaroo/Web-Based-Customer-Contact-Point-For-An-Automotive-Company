module.exports = app => {
  const carts = require("../controllers/cart.controller.js");
  const auth = require("../config/auth.config.js");

  var router = require("express").Router();

  // Create a new Cart
  router.post("/", carts.create);

  // Retrieve all Carts
  router.get("/", carts.findAll);

  // Retrieve a single Cart with id
  router.get("/:id", carts.findOne);

  // Retrieve a single Cart with customerId
  router.get("/:customerId", carts.findByCustomerId);

  // Update a Cart with id
  router.put("/:id", carts.update);

  // Delete a Cart with id
  router.delete("/:id", carts.delete);

  // Create a new Cart
  router.delete("/", carts.deleteAll);

  app.use("/api/carts", router);
};
