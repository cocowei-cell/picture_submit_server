const classes = require("koa-router")();
// 创建班级
classes.post("/create", require("./classes/create"));
classes.post("/add", require("./classes/add"));

classes.get("/getUser", require("./classes/getUser"));



module.exports = classes.routes();
