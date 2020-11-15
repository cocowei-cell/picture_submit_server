/**
 * @description: 加入班级
 * @param {*}
 * @return {*}
 */

const { Class } = require("../../models/Class");
const { User } = require("../../models/User");
const { checkToken } = require("../../utils/token");

module.exports = async (c) => {
  try {
    let token = c.header.token;
    let { inviCode } = c.request.body;
    let { _id } = await checkToken(token);
    let info = await User.findOne({
      _id,
    });
    // 如果classID有值 说明已经加入过班级
    if (info.classID) {
      return (c.body = { msg: "您已加入过班级，不可以重复加入哦", code: 400 });
    }
    // 不存在classID
    // 获取邀请码对应的班级ID
    let classIDs = await Class.findOne({
      invitation_code: inviCode,
    });
    if (!classIDs) {
      return (c.body = { msg: "邀请码不存在", code: 400 });
    }
    // 存在邀请码
    await User.updateOne({ _id }, { $set: { classID: classIDs._id } });
    return (c.body = { msg: "加入成功", code: 200, classID: classIDs._id });
  } catch (error) {
    console.log(error.message);
    c.body = { msg: "error", code: 401 };
  }
};
