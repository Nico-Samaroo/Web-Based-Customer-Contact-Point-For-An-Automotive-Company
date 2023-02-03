const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./customer.model.js")(mongoose);
db.rentals = require("./rental.model.js")(mongoose);
db.rental_appointments = require("./rental_appointments.model.js")(mongoose);
module.exports = db;
