const others = require("koa-router")();

others.get("/getuserinfo", require("./others/getuserinfo"));
others.post("/upload", require("./others/upload"));
others.post("/download", require("./others/download"));
others.get("/getuser", require("./others/getoneuser"));
others.delete("/deleteuser/:_id", require("./others/modifyuser"));

module.exports = others.routes();
