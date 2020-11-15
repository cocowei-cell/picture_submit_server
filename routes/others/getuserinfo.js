/**
 * @description: 获取用户信息
 * @param {*}
 * @return {*}
 */
const { checkToken } = require("../../utils/token");
const { User } = require("../../models/User");
module.exports = async (c) => {
  try {
    const token = c.header.token;
    // 验证token是否合法
    let userinfo = await checkToken(token);
    let info = await User.findOne({
      _id: userinfo._id,
    });
    userinfo.classID = info.classID;
    return (c.body = { msg: "获取成功", code: 200, userinfo });
  } catch (error) {
    console.log(error.message);
    return (c.body = { msg: "token非法", code: 401 });
  }
};
