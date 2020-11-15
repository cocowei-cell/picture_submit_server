const Koa = require("koa");
const app = new Koa();
const koaRouter = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const path = require("path");
const session = require("koa-session");
const server = require("http").createServer(app.callback());
const mongoose = require("mongoose");
const URL = require("url");
const { getIO } = require("./utils/socketio");
// 加载session配置文件
const { config } = require("./config");
// 开放静态资源文件
app.use(static(path.join(__dirname, "public")));
app.use(bodyParser({ extended: true }));
app.keys = ["sadasfasfasfa++asfasasfasfasf"];
// 挂载中间件
app.use(session(config, app));
app.use(async (c, next) => {
  let refer = c.headers.referer;
  //当不是在服务器上请求时，设置为默认，去掉后当用浏览器的URL发送请求时会
  //得到refer为undefined，造成客户端返回500的错误
  if (!refer) {
    return c.body = { msg: "获取失败", code: 400 };
  }
  let url = URL.parse(refer);
  // 转换为源地址，不req.headers.referer任何参数
  let finalUrl = `${url.protocol}//${url.host}`;
  // let finalUrl = "http://localhost:8080";
  c.set("Access-Control-Allow-Origin", finalUrl); //设置跨域请求源
  c.set(
    "Access-Control-Allow-Headers",
    "content-type,Content-Length, Authorization,token, Accept,Access-Token,X-Requested-With"
  );
  c.set("Access-Control-Allow-Methods", "GET,DELETE,PUT,POST");
  // 跨域携带cookie
  c.set("Access-Control-Allow-Credentials", true);
  // 设置get请求缓存 300s
  // res.header('cache-control','max-age=300')
  await next();
});
getIO(server);
require("./routes")(koaRouter);
// 配置路由中间件
app.use(koaRouter.routes());
app.use(koaRouter.allowedMethods());
// 链接数据库
mongoose
  .connect("mongodb://localhost:27017/picture", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful"))
  .catch(() => console.log("Database connection failed"));

// 监听3000端口
server.listen(3000, () => console.log("Service listening on port 3000"));
