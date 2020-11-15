/**
 * @description: 创建班级
 * @param {*}
 * @return {*}
 */

const { Class } = require("../../models/Class");
const { User } = require("../../models/User");
const getInvitationCode = require("../../utils/getinvation");
const { checkToken } = require("../../utils/token");
module.exports = async (c) => {
  try {
    let token = c.header.token;
    let { _id } = await checkToken(token);
    // 获取班级名字 class_name
    let { classes } = c.request.body;
    let tag = await User.findOne({
      _id,
    });
    // 如果存在班级
    if (tag.classID) {
      return (c.body = { msg: "您已加入过班级 不能再创建", code: 400 });
    }
    // 判断该班级是否存在
    let classInfo = await Class.findOne({ class_name: classes });
    if (classInfo) {
      return (c.body = { msg: "该班级已经存在！", code: 400 });
    }
    // 获取班级邀请码
    let code = getInvitationCode();
    // 保存数据库
    let info = await Class.create({
      along_user: _id,
      class_name: classes,
      invitation_code: code,
    });
    // 保存到用户表中
    await User.updateOne(
      {
        _id,
      },
      { $set: { classID: info._id } }
    );
    return (c.body = {
      msg: "创建成功",
      code: 200,
      inv_code: code,
      classID: info._id,
    });
  } catch (error) {
    console.log(error.message);
    return (c.body = { msg: "错误", code: 401 });
  }
};
