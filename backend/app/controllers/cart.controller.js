const db = require("../models");
const Cart = db.carts;

// Create and Save a new Cart
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Cart
  const part = new Cart({
    name: req.body.userId,
    code: req.body.code,
    amount: req.body.amount,
    price: req.body.price
  });

  // Save Cart in the database
  part
    .save(part)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cart."
      });
    });
};

// Retrieve all Carts from the database.
exports.findAll = (req, res) => {
  Cart.find()
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

// Find a single Cart with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cart.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Cart with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Cart with id=" + id });
    });
};

// Update a Cart by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cart with id=${id}. Maybe Cart was not found!`
        });
      } else res.send({ message: "Cart was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cart with id=" + id
      });
    });
};

// Delete a Cart with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
        });
      } else {
        res.send({
          message: "Cart was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cart with id=" + id
      });
    });
};

// Delete all Carts from the database.
exports.deleteAll = (req, res) => {
  Cart.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Carts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all parts."
      });
    });
};
