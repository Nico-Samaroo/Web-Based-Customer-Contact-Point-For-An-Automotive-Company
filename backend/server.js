const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use(bodyParser.json());

//for logging server requests
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my automotive application." });
});

require("./app/routes/customer.routes")(app);
require("./app/routes/vehicle.routes")(app);
require("./app/routes/appointment.routes")(app);
require("./app/routes/part.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/cart.routes")(app);

// set port, listen for requests
// node server.js
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
