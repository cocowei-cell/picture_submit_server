/**
 * @description: 获取班级内成员完成信息情况
 * @param {*}
 * @return {*}
 */
const { checkToken } = require("../../utils/token");
const { Mission } = require("../../models/Mission");
const { User } = require("../../models/User");
module.exports = async (c) => {
  try {
    let token = c.header.token;
    await checkToken(token);
    let classID = c.query.classID;
    // 获取该班级对应的任务
    let mission = await Mission.findOne({ class_id: classID });
    let users = await User.find({ classID, isSubmit: true });
    let obj = {};
    obj.mission = mission;
    obj.y_count = users.length;
    return (c.body = { msg: "get_ok", code: 200, obj });
  } catch (error) {
    return (c.body = { msg: "error", code: 401 });
  }
};
