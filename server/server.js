var express = require("express");
var db = require("./database/db");
var bodyParser = require("body-parser");

var cors = require("cors");
var authApi = require("./routes/authApi");
var usersApi = require("./routes/userApi");
var clientApi = require('./routes/clientApi');


var PORT = 3000;

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auth", authApi);
app.use("/users", usersApi);
app.use("/client", clientApi)

app.listen(PORT, function () {
    console.log("server is running on localhost:", PORT);
});
