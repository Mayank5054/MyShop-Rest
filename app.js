const express=require("express");
const feedRoutes = require("./routes/feed");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/feed",feedRoutes);
app.listen(5354,(req,res,next) => {
    console.log("server started !");
});