const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");
const app = express();

//creates server.
const server = http.createServer(app);
module.exports.io = socketIO(server);
require("./sockets/socket");

//specify where the server broadcasts and under which port
const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//checks for errors within server, if not notifies of the port on which it is running
server.listen(port, (err) => {
    if (err) throw new Error(err);

    console.log("Server running at ${ port }");
});