require('dotenv').config();
let express = require('express');
let app = express();

// MIDDLEWARE
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

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





module.exports = app;
