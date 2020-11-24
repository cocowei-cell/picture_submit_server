/**
 * @description: 删除该用户
 * @param {*}
 * @return {*}
 */

const { User } = require("../../models/User");
const _ = require("lodash");
module.exports = async (c) => {
  try {
    // 获取id值
    const { _id } = c.request.params;
    await User.deleteOne({ _id });
    return (c.body = { msg: "删除成功", code: 200 });
  } catch (error) {
    return (c.body = { msg: "error", code: 401 });
  }
};
