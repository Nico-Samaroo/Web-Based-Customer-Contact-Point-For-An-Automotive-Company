const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.customers = require("./customer.model.js")(mongoose);
db.vehicles = require("./vehicle.model.js")(mongoose);
db.appointments = require("./appointment.model.js")(mongoose);
db.parts = require("./part.model.js")(mongoose);
db.services = require("./service.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.carts = require("./cart.model.js")(mongoose);
db.sales = require("./sale.model.js")(mongoose);
db.rentals = require("./rental.model.js")(mongoose);
db.quotes = require("./quote.model.js")(mongoose);

module.exports = db;
