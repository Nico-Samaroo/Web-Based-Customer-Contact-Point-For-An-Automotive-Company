const db = require("../models");
const Part = db.parts;

// Create and Save a new Part
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Part
  const part = new Part({
    name: req.body.name,
    code: req.body.code,
    amount: req.body.amount
  });

  // Save Part in the database
  part
    .save(part)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Part."
      });
    });
};

// Retrieve all Parts from the database.
exports.findAll = (req, res) => {
  Part.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving parts."
      });
    });
};

// Find a single Part with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Part.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Part with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Part with id=" + id });
    });
};

// Update a Part by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Part.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Part with id=${id}. Maybe Part was not found!`
        });
      } else res.send({ message: "Part was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Part with id=" + id
      });
    });
};

// Delete a Part with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Part.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Part with id=${id}. Maybe Part was not found!`
        });
      } else {
        res.send({
          message: "Part was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Part with id=" + id
      });
    });
};

// Delete all Parts from the database.
exports.deleteAll = (req, res) => {
  Part.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Parts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all parts."
      });
    });
};
