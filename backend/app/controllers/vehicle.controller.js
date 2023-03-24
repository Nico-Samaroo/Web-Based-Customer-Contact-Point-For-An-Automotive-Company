const db = require("../models");
const Vehicle = db.vehicles;

// Create and Save a new Vehicle
exports.create = (req, res) => {
  // Validate request
  if (!req.body.license_no) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Vehicle
  const vehicle = new Vehicle({
    license_no: req.body.license_no,
    chassis_no: req.body.chassis_no,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    user: req.body.user,
    rental: req.body.rental,
    rental_price: req.body.rental_price
  });

  // Save Vehicle in the database
  vehicle
    .save(vehicle)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vehicle."
      });
    });
};

// Retrieve all Vehicles from the database.
exports.findAll = (req, res) => {
  Vehicle.find()
    .populate('user')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles."
      });
    });
};

// Retrieve all Vehicles by user.
exports.findByUser = (req, res) => {
  const userId = req.params.userId;

  Vehicle.find({user: userId})
    .populate('user')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles."
      });
    });
};

// Find a single Vehicle with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vehicle.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Vehicle with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Vehicle with id=" + id });
    });
};

// Update a Vehicle by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Vehicle.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Vehicle with id=${id}. Maybe Vehicle was not found!`
        });
      } else res.send({ message: "Vehicle was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Vehicle with id=" + id
      });
    });
};

// Delete a Vehicle with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vehicle.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`
        });
      } else {
        res.send({
          message: "Vehicle was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Vehicle with id=" + id
      });
    });
};

// Delete all Vehicles from the database.
exports.deleteAll = (req, res) => {
  Vehicle.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Vehicles were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all vehicles."
      });
    });
};
