// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var responseTime = require("response-time");
var timeout = require("connect-timeout");
const cookieParser = require("cookie-parser");
const session = require("express-session");


app.use(timeout("10s"));

app.use(bodyParser())
//app.use(haltOnTimedout)
app.use(cookieParser())
//app.use(haltOnTimedout)

/*

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.listen(3000);
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

mongoose.connect("mongodb://localhost/my-database", {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
  })
);
*/
// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(responseTime());

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

app.post("/add", bodyParser.json(), (request, response) => {
  dreams.push(request.body.dream);
  response.json(request.body);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
