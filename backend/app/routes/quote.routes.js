module.exports = app => {
  const quotes = require("../controllers/quote.controller.js");
  const auth = require("../config/auth.config.js");
  const multer = require('multer');
  const upload = multer({dest: 'assets/uploads/quotes/'});

  var router = require("express").Router();

  // Create a new Part
  router.post("/", quotes.create);

  // Upload quote image
  router.post("/upload-image", upload.single('file'), quotes.upload);

  //Retrieve quote image
  router.get("/download-image/:filename", quotes.download);

  // Retrieve all Parts
  router.get("/", quotes.findAll);

  // Retrieve a single Part with id
  router.get("/:id", quotes.findOne);

  // Update a Part with id
  router.put("/:id", quotes.update);

  // Delete a Part with id
  router.delete("/:id", quotes.delete);

  // Create a new Part
  router.delete("/", quotes.deleteAll);

  app.use("/api/quotes", router);
};
