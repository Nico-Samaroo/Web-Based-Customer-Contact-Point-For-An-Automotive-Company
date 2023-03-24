const db = require("../models");
const Rental = db.rentals;

// Create and Save a new Rental
exports.create = (req, res) => {
  // Validate request
  if (!req.body.begin) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Rental
  const rental = new Rental({
    vehicle: req.body.vehicle,
    begin: req.body.begin,
    end: req.body.end,
  });

  // Save Rental in the database
  rental
    .save(rental)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rental."
      });
    });
};

// Retrieve all Rentals from the database.
exports.findAll = (req, res) => {
  Rental.find()
    .populate("vehicle")
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rentals."
      });
    });
};

// Find a single Rental with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Rental.findById(id)
    .populate('vehicle')
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Rental with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Rental with id=" + id });
    });
};

// Update a Rental by the id in the request
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
          message: `Cannot update Rental with id=${id}. Maybe Rental was not found!`
        });
      } else res.send({ message: "Rental was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Rental with id=" + id
      });
    });
};

// Delete a Rental with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Rental.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Rental with id=${id}. Maybe Rental was not found!`
        });
      } else {
        res.send({
          message: "Rental was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Rental with id=" + id
      });
    });
};

// Delete all Rentals from the database.
exports.deleteAll = (req, res) => {
  Rental.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Rentals were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rentals."
      });
    });
};
