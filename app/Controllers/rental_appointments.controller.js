const db = require("../models");
const Rental_appointments = db.rental_appointments;

// Create and Save a new Rental Car
exports.create = (req, res) => {
  // Validate request
  if (!req.body.first_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Customer
  const rental_appointments = new Rental_appointments({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    make: req.body.make,
    model: req.body.model,
    pickup_day: req.body.pickup_day,
    pickup_time: req.body.pickup_time,
    dropoff_day: req.body.dropoff_day,
    dropoff_time: req.body.dropoff_time,
  });

  // Save Rental Appointment in the database
  rental_appointments
    .save(rental_appointments)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rental appointment."
      });
    });
};

// Retrieve all Rental appointments from the database.
exports.findAll = (req, res) => {
  Rental_appointments.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Rental appointments."
      });
    });
};

// Find a single Rental appointment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Rental_appointments.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Rental appointment with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Rental appointment with id=" + id });
    });
};

// Update a Rental appointments by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Rental_appointments.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Rental appointment with id=${id}. Maybe Rental appointment was not found!`
        });
      } else res.send({ message: "Rental appointment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Rental appointment with id=" + id
      });
    });
};

// Delete a Rental appointment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Rental_appointments.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Rental appointment with id=${id}. Maybe Rental appointment was not found!`
        });
      } else {
        res.send({
          message: "Rental appointment was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Rental appointment with id=" + id
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Rental_appointments.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Rental appointment was deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Rental appointments."
      });
    });
};
