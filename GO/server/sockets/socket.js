const { io } = require("../server");

io.on("connection", (client) => {
    console.log("User connected");

    //notify if admin accesses the app
    client.emit("sendMessage", {
        user: "Admin",
        message: "Welcome to this app"
    });

    // notify if client disconnected
    client.on("disconnect", () => {
        console.log("User disconnected");
    });

    // when a move is received by the server, it is then broadcst 
    //to all connected instances
    client.on("move", (data, callback) => {
        console.log(data);

        client.broadcast.emit("move", data);
    });
});