module.exports = app => {
  const parts = require("../controllers/part.controller.js");
  const auth = require("../config/auth.config.js");
  const multer = require('multer');
  const upload = multer({dest: 'uploads/'});

  var router = require("express").Router();

  // Create a new Part
  router.post("/", parts.create);

  // Create a new Part
  router.post("/upload-image", upload.single('file'), parts.upload);

  // Retrieve all Parts
  router.get("/", parts.findAll);

  // Retrieve a single Part with id
  router.get("/:id", parts.findOne);

  // Update a Part with id
  router.put("/:id", parts.update);

  // Delete a Part with id
  router.delete("/:id", parts.delete);

  // Create a new Part
  router.delete("/", parts.deleteAll);

  app.use("/api/parts", router);
};
