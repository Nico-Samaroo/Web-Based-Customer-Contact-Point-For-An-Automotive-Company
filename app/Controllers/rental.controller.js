const db = require("../models");
const Rental = db.rentals;

// Create and Save a new Rental Car
exports.create = (req, res) => {
  // Validate request
  if (!req.body.license_no) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Rental Car
  const rental = new Rental({
    license_no: req.body.license_no,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    cost: req.body.cost,
  });

  // Save Rental Car in the database
  rental
    .save(rental)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rental Car."
      });
    });
};

// Retrieve all Rental Cars from the database.
exports.findAll = (req, res) => {
  Rental.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Rental Cars."
      });
    });
};

// Find a single Rental Car with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Rental.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Rental Car with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Rental Car with id=" + id });
    });
};

// Update a Rental Car by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Rental.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Rental car with id=${id}. Maybe Rental Car was not found!`
        });
      } else res.send({ message: "Rental Car was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Rental Car with id=" + id
      });
    });
};

// Delete a Rental Car with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Rental.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Rental Car with id=${id}. Maybe Rental Car was not found!`
        });
      } else {
        res.send({
          message: "Rental Car was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Rental Car with id=" + id
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Rental.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Rental Cars were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Rental Cars."
      });
    });
};
