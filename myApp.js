require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// MIDDLEWARE
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(__dirname + "/public"));

// ENDPOINTS
app.get("/", function(req, res) {
  // res.send("Hello Express");
  absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

app.get("/json", function(req, res) {
  mess = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase")
    mess = mess.toUpperCase();
  res.json({ message: mess });
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

app.get("/:word/echo", function(req, res) {
  res.json({ echo: req.params.word });
});

app.route("/name")
  .get(function(req, res) {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post(function(req, res) {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });






module.exports = app;
