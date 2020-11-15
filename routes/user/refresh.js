/**
 * @description: 重置密码
 * @param {*}
 * @return {*}
 */
const { User } = require("../../models/User");
const { checkToken } = require("../../utils/token");
module.exports = async (c) => {
  try {
    let token = c.header.token;
    await checkToken(token);
    let _id = c.request.body._id;
    await User.updateOne({ _id }, { $set: { password: 123456 } });
    return (c.body = { msg: "修改成功", code: 200 });
  } catch (error) {
    console.log(error.message);
    return (c.body = { msg: "error", code: 401 });
  }
};
