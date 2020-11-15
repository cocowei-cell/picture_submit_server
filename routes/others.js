const others = require("koa-router")();

others.get("/getuserinfo", require("./others/getuserinfo"));
others.post("/upload", require("./others/upload"));
others.post("/download", require("./others/download"));

module.exports = others.routes();
