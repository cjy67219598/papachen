let express = require("express");
let path = require("path");
let open = require("open");
let app = express();
app.use("/dev",express.static(path.join(__dirname,"dev")));
app.use("/dist",express.static(path.join(__dirname,"dist")));
app.listen(23333,() => {
    console.log("服务开启 @23333");
    console.log((new Date()).toLocaleString());
});
open("http://localhost:23333/dev/");