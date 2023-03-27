

module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const auth =  require("../config/auth.config.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // Create a new User
  router.delete("/", users.deleteAll);

  // Email User
  router.post("/email/", users.sendMail);


  //AUTHENTICATION
  router.post("/register", users.registerNewUser);
  router.post("/login", users.loginUser);

  app.use("/api/users", router);
};
