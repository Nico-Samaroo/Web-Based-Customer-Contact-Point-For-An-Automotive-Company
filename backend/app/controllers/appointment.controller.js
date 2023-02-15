const db = require("../models");
const Appointment = db.appointments;

// Create and Save a new Appointment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.start) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Appointment
  const appointment = new Appointment({
    begin: req.body.begin,
    finish: req.body.finish,
    vehicle: req.body.vehicle,
    services: req.body.services,
    parts: req.body.parts
  });

  // Save Appointment in the database
  appointment
    .save(appointment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Appointment."
      });
    });
};

// Retrieve all Appointments from the database.
exports.findAll = (req, res) => {
  Appointment.find()
    .populate('vehicle')
    .then(data => {
      // console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments."
      });
    });
};

// Find a single Appointment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Appointment.findById(id)
    .populate('vehicle')
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Appointment with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Appointment with id=" + id });
    });
};

// Update a Appointment by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Appointment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found!`
        });
      } else res.send({ message: "Appointment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Appointment with id=" + id
      });
    });
};

// Delete a Appointment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Appointment.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`
        });
      } else {
        res.send({
          message: "Appointment was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Appointment with id=" + id
      });
    });
};

// Delete all Appointments from the database.
exports.deleteAll = (req, res) => {
  Appointment.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Appointments were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all appointments."
      });
    });
};
