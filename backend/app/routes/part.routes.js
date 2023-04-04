module.exports = app => {
  const parts = require("../controllers/part.controller.js");
  const auth = require("../config/auth.config.js");
  const multer = require('multer');
  const upload = multer({dest: 'assets/uploads/parts/'});
  const isAdmin = require('../config/roles/isAdmin.js');
  const isTechnician = require('../config/roles/isTechnician.js');
  const isCustomer = require('../config/roles/isCustomer.js');

  var router = require("express").Router();

  // Create a new Part
  router.post("/", [auth, isAdmin], parts.create);

  // Upload part image
  router.post("/upload-image", upload.single('file'), parts.upload);

  //Retrieve part image
  router.get("/download-image/:filename", parts.download);

  // Retrieve all Parts
  router.get("/", [auth, isCustomer], parts.findAll);

  // Retrieve a single Part with id
  router.get("/:id", [auth, isAdmin], parts.findOne);

  // Update a Part with id
  router.put("/:id", [auth, isAdmin], parts.update);

  // Delete a Part with id
  router.delete("/:id", [auth, isAdmin], parts.delete);

  // Create a new Part
  router.delete("/", [auth, isAdmin], parts.deleteAll);

  app.use("/api/parts", router);

  // app.get('/file/:name', function (req, res, next) {
  //   var options = {
  //     root: path.join(__dirname, 'public'),
  //     dotfiles: 'deny',
  //     headers: {
  //       'x-timestamp': Date.now(),
  //       'x-sent': true
  //     }
  //   }
  
  //   var fileName = req.params.name
  //   res.sendFile(fileName, options, function (err) {
  //     if (err) {
  //       next(err)
  //     } else {
  //       console.log('Sent:', fileName)
  //     }
  //   })
  // })
};
