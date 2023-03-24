const db = require("../models");
const Quote = db.quotes;

// Create and Save a new quote
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a quote
  const quote = new Quote({
    name: req.body.name,
    code: req.body.code,
    amount: req.body.amount,
    price: req.body.price
  });

  // Save quote in the database
  quote
    .save(quote)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the quote."
      });
    });
};

exports.upload = (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true,
      file: req.file
    })
  }
};

exports.download = (req, res) => {
  const filename = req.params.filename;
  const path = "/assets/uploads/quotes/" + filename;

  res.sendFile(path);
}

// Retrieve all Parts from the database.
exports.findAll = (req, res) => {
  Quote.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving quotes."
      });
    });
};

// Find a single Part with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Quote.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found quote with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving quote with id=" + id });
    });
};

// Update a quote by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Quote.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update quote with id=${id}. Maybe quote was not found!`
        });
      } else res.send({ message: "Quote was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating quote with id=" + id
      });
    });
};

// Delete a quote with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Quote.findByIdAndRemove(id, { useFindAndModify: false })
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

// Delete all quotes from the database.
exports.deleteAll = (req, res) => {
  Quote.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Quotes were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all quotes."
      });
    });
};
