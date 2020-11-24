/**
 * @description: 获取任务列表
 * @param {*}
 * @return {*}
 */
const { checkToken } = require("../../utils/token");
const { Mission } = require("../../models/Mission");
const { User } = require("../../models/User");
module.exports = async (c) => {
  try {
    let token = c.header.token;
    let { _id } = await checkToken(token);
    let { classId } = c.query;
    if (classId == "" || classId.length == 0) {
      return (c.body = { msg: "请先加入班级", code: 401 });
    }
    let mission = await Mission.findOne({
      class_id: classId,
    });
    if (mission) {
      if (mission.time >= +new Date()) {
        // 查询该用户是否完成
        let { isSubmit } = await User.findOne({ _id });
        return (c.body = {
          msg: "ok",
          code: 200,
          url: mission._id,
          mission,
          is_submit: isSubmit,
        });
      } else {
        return (c.body = { msg: "任务已过期", code: 402 });
      }
    } else {
      return (c.body = { code: 403, msg: "暂无任务" });
    }
  } catch (error) {
    return (c.body = { msg: "error", code: 401 });
  }
};
/* 
get请求  ： url:/user/getIDname=zzz&sex=male&email=xxx

/user/getID?name=zzz
/user/getID?name=zzz&sex=male
/user/getID?sex=male&email=xxx */