const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.body);
  const token = req.headers.authorization.replace("Bearer ", "");
  // console.log(token);

  if (token) {
    jwt.verify(token, "secret", (err, user) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }

      if(user.customer || user.admin || user.technician){
        next()
      } else {
        return res.status(401).send({ message: "Sorry! Your role doesn't have access to this page. [CUSTOMER]" })
      }
    });
  } else {
    return res.status(403).send({ message: "No token provided!" });
  }
};