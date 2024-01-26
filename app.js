const express=require("express");
const feedRoutes = require("./routes/feed");
const app = express();
const bodyParser = require("body-parser");
 // This creates a connection to the Socket.IO server
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
})
app.use("/feed",feedRoutes);

const server = app.listen(5354,(req,res,next) => {
    console.log("server started !");
    const io = require("socket.io")(server);

io.on("connection",socket => {
    console.log(socket);
})
const io1 = require("socket.io-client");
const socketio = io1("http://localhost:5354"); 
// socketio.on("server-event",(data) => {

// })
// openSocket("http://localhost:5354");
});

