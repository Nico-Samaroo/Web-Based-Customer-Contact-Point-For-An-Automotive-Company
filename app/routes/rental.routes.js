module.exports = app => {
    const rentals = require("../controllers/rental.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Rental Cars
    router.post("/", rentals.create);
  
    // Retrieve all Rental Cars
    router.get("/", rentals.findAll);
  
    // Retrieve a Rental Carr with id
    router.get("/:id", rentals.findOne);
  
    // Update a Rental Cars with id
    router.put("/:id", rentals.update);
  
    // Delete a Rental Cars with id
    router.delete("/:id", rentals.delete);
  
    // Delete all Rental Cars
    router.delete("/", rentals.deleteAll);
  
    app.use("/api/rentals", router);
  };
  