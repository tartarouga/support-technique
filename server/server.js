var express = require("express");
var db = require("./database/db");
var bodyParser = require("body-parser");

var cors = require("cors");
var authApi = require("./routes/authApi");
var usersApi = require("./routes/userApi");
var clientApi = require('./routes/clientApi');
var reclamApi = require('./routes/reclamApi');
var chatApi = require('./routes/chatApi')
var http = require('http');



var PORT = 3000;
const socketIO = require('socket.io');
var app = express();
//app.use(express.static('/uploads'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auth", authApi);
app.use("/users", usersApi);
app.use("/client", clientApi)
app.use("/reclam", reclamApi)
app.use("/chat", chatApi)

const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io)


io.on('connection', (socket) => {
    console.log('new connection made');



})








server.listen(PORT, function () {
    console.log("server is running on localhost:", PORT);
});
