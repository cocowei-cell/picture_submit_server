const IO = require("socket.io");
const { User } = require("../models/User");
const { Class } = require("../models/Class");
const { Mission } = require("../models/Mission");
const { Picture } = require("../models/Picture");
const _ = require("lodash");
const socketIO = {};
function getIO(server) {
  let io = IO(server);
  socketIO.io = io;
    io.on("connection", function (socket) {
      // 退出事件
      console.log("加入连接")
      // 监听 我的班级
      socket.on("login_class", async function (data) {
        // 加入班级后
        let classID = data.classID;
        // 先加入班级
        socket.join(classID);
      });
      // 监听到用户加入该班级后广播该用户的信息
      socket.on("add_class", async function (data) {
        // 进行广播
        // 查询用户的信息
        if(!data._id) {
          return;
        }
        let info = await User.findOne({
          _id:data._id
        })
        socket.to(data.classID).emit("new_user",_.pick(info,["stu_number","stu_name","_id"]))
      });
      socketIO.socket = socket;
    });
}
module.exports = {
  socketIO,
  getIO,
};
