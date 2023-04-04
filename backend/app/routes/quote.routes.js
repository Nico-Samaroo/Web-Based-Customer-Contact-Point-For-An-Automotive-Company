module.exports = app => {
  const quotes = require("../controllers/quote.controller.js");
  const auth = require("../config/auth.config.js");
  const multer = require('multer');
  const upload = multer({dest: 'assets/uploads/quotes/'});
  const isAdmin = require('../config/roles/isAdmin.js');
  const isTechnician = require('../config/roles/isTechnician.js');
  const isCustomer = require('../config/roles/isCustomer.js');

  var router = require("express").Router();

  // Create a new Quote
  router.post("/", [auth, isCustomer], quotes.create);

  // Upload quote image
  router.post("/upload-image", upload.single('file'), quotes.upload);

  //Retrieve quote image
  router.get("/download-image/:filename", quotes.download);

  // Retrieve all Quotes
  router.get("/", [auth, isTechnician], quotes.findAll);

  // Retrieve a single Quote with id
  router.get("/:id", [auth, isAdmin], quotes.findOne);

  // Update a Quote with id
  router.put("/:id", [auth, isAdmin], quotes.update);

  // Delete a Quote with id
  router.delete("/:id", [auth, isAdmin], quotes.delete);

  // Create a new Quote
  router.delete("/", [auth, isAdmin], quotes.deleteAll);

  app.use("/api/quotes", router);
};
