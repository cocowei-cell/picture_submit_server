/**
 * @description: 注册路由
 * @param {*}
 * @return {*}
 */
const { User } = require("../../models/User");
const { validateRegester } = require("../../utils/validateForm");
module.exports = async (c) => {
  try {
    // 获取学号  qq号码  密码
    let { username, password, qq, stu_name } = c.request.body;
    if (!validateRegester(username, password, qq, stu_name)) {
      return (c.body = { msg: "注册格式错误", code: 400 });
    }
    // 验证学号是否存在
    let info = await User.findOne({ stu_number:username });
    if (info) {
      return (c.body = { msg: "该学号已存在", code: 400 });
    }
    qq = `${qq}@qq.com`;
    // 注册
    await User.create({
      email: qq,
      stu_number: username,
      stu_name: stu_name,
      password,
    });
    return (c.body = { msg: "注册成功", code: 200 });
  } catch (error) {
    return (c.body = { msg: "注册失败", code: 400 });
  }
};
