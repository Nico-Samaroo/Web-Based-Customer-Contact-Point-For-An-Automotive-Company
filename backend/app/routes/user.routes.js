

module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const auth =  require("../config/auth.config.js");
  const isAdmin = require('../config/roles/isAdmin.js');
  const isTechnician = require('../config/roles/isTechnician.js');
  const isCustomer = require('../config/roles/isCustomer.js');

  var router = require("express").Router();

  // Create a new User
  router.post("/", [auth, isAdmin], users.create);

  // Retrieve all Users
  router.get("/", [auth, isCustomer], users.findAll);

  // Retrieve a single User with id
  router.get("/:id", [auth, isAdmin], users.findOne);

  // Update a User with id
  router.put("/:id", [auth, isAdmin], users.update);

  // Delete a User with id
  router.delete("/:id", [auth, isAdmin], users.delete);

  // Create a new User
  router.delete("/", [auth, isAdmin], users.deleteAll);

  // Email User
  router.post("/email/", [auth, isTechnician], users.sendMail);


  //AUTHENTICATION
  router.post("/register", users.registerNewUser);
  router.post("/login", users.loginUser);

  app.use("/api/users", router);
};
