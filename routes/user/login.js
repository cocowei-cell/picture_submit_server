/**
 * @description: 登录页面
 * @param {*}
 * @return {*}
 */
const { User } = require("../../models/User");
const { validateLogin } = require("../../utils/validateForm");
const { createToken } = require("../../utils/token");
const _ = require("lodash");
module.exports = async (c) => {
  try {
    let { username, password } = c.request.body;
    // 验证用户名和密码的合法性
    username = username.trim();
    password = password.trim();
    if (!validateLogin(username, password)) {
      return (c.body = { msg: "用户名或密码不正确", code: 400 });
    }
    // 查询数据库
    let stu = await User.findOne({ stu_number: username });
    if (!stu) {
      return (c.body = { msg: "用户不存在", code: 400 });
    }
    // 当用户存在时
    let pass = stu.password;
    if (pass === password) {
      // 如果密码正确 创建token返回
      let userinfo = _.pick(stu, ["stu_number", "_id", "stu_name","classID"]);
      let token = createToken({
        ...userinfo
      });
      return (c.body = { msg: "登录成功", code: 200, token: token, userinfo });
    } else {
      return (c.body = { msg: "用户名或密码不正确", code: 400 });
    }
  } catch (error) {
    return (c.body = { msg: "用户名或密码不正确", code: 400 });
  }
};
