module.exports = app => {
  const quotes = require("../controllers/quote.controller.js");
  const auth = require("../config/auth.config.js");
  const multer = require('multer');
  const upload = multer({dest: 'assets/uploads/quotes/'});

  var router = require("express").Router();

  // Create a new quotes
  router.post("/", quotes.create);

  // Upload quote image
  router.post("/upload-image", upload.single('file'), quotes.upload);

  //Retrieve quote image
  router.get("/download-image/:filename", quotes.download);

  // Retrieve all quotes
  router.get("/", quotes.findAll);

  // Retrieve a single quote with id
  router.get("/:id", quotes.findOne);

  // Update a quote with id
  router.put("/:id", quotes.update);

  // Delete a quote with id
  router.delete("/:id", quotes.delete);

  // Create a new quotes
  router.delete("/", quotes.deleteAll);

  app.use("/api/quotes", router);
};
