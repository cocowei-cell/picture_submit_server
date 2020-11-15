/**
 * @description: 获取同班级用户数据
 * @param {*}
 * @return {*}
 */
const { User } = require("../../models/User");
const { Class } = require("../../models/Class");
const { checkToken } = require("../../utils/token");
const _ = require("lodash");
module.exports = async (c) => {
  try {
    let token = c.header.token;
    let { _id } = await checkToken(token);
    let info = {},
      temp1,
      temp2;
    let { classID } = c.query;
    // 查询该班级中的所有人
    if (classID) {
      // 查询出班级
      temp1 = await Class.findOne({
        _id: classID,
      });
      // 查询该班级对应的所有人
      temp2 = await User.find({
        classID,
      }).sort("stu_number");
      info.user_info = [];
      // 将信息塞到数组中去
      temp2.forEach((user) => {
        info.user_info.push(_.pick(user, ["stu_name", "stu_number", "_id"]));
      });
      info.class_info = temp1;
      return (c.body = { msg: "ok", code: 200, info: info });
    } else {
      return (c.body = { msg: "error", code: 404 });
    }
  } catch (error) {
    console.log(error.message);
    c.body = { msg: "error", code: 401 };
  }
};
