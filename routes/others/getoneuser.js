/**
 * @description: 获取单个人
 * @param {*}
 * @return {*}
 */

const { User } = require("../../models/User");
const _ = require("lodash");
module.exports = async (c) => {
  try {
    const { stu_number } = c.query;
    let info = await User.findOne({
      stu_number,
    });
    if (!info) {
      return (c.body = { msg: "没有该People,请核对后再输入", code: 400 });
    } else {
      if (info.classID != null) {
        return (c.body = { msg: "已存在班级ID，不可以删除" });
      }
      return (c.body = {
        msg: "查询成功",
        code: 200,
        userdata: _.pick(info, ["stu_number", "stu_name", "_id"]),
      });
    }
  } catch (error) {
    return (c.body = { msg: "error", code: 401 });
  }
};
