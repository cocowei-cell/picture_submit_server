/**
 * @description: 任务添加模块
 * @param {*}
 * @return {*}
 */
const { Mission } = require("../../models/Mission");
const { User } = require("../../models/User");
const sendQQEmail = require("../../utils/sendEmail");
const { checkToken } = require("../../utils/token");
const { Picture } = require("../../models/Picture");
const fs = require("fs");
module.exports = async (c) => {
  try {
    let token = c.header.token;
    await checkToken(token);
    let { time, name, classID, count, checked } = c.request.body;
    // 创建之前，清空上一次的，确保该班级任务列表只出现一次
    let preMissionID = await Mission.findOne({ class_id: classID });
    await Mission.deleteOne({
      class_id: classID,
    });
    // 删除上次的所有图片 如果id存在
    if (preMissionID) {
      let Pictures = await Picture.find({ along_mission: preMissionID });
      await Picture.deleteMany({ along_mission: preMissionID });
      // 删除上次任务的所有图片
      Pictures.forEach((picture) => {
        fs.unlinkSync(picture.url);
      });
    }
    // 保存到数据库中去
    if (Number(time).toString() == "NaN") {
      time = 7;
    } else {
      time = Math.abs(Number(time) * 24 * 60 * 60 * 1000) + Date.now();
    }
    if (+count <= 0 || +count > 2) {
      count = 1;
    }
    let info = await Mission.create({
      name,
      count,
      class_id: classID,
      time: time,
    });
    let user = await User.find({
      classID,
    });
    if (checked === "true") {
      // 取出班级中的所有人 遍历发送邮箱
      for (let i = 0, len = user.length; i < len; i++) {
        await sendQQEmail({
          to: user[i].email,
          html: `您好 ${user[i].stu_name},${name}开始啦，请在 <span style="color:red;font-size:18px;">${count}</span> 日之内学习并提交完毕，提交通道为： <a href="http://182.92.120.217:6197/#/index/mission">${name}</a>`,
        });
      }
    }
    // 将本班级所有人的提交改为false
    await User.updateMany(
      {
        classID,
      },
      { $set: { isSubmit: false } }
    );
    return (c.body = { msg: "创建成功", code: 200, id: info._id });
  } catch (error) {
    console.log(error.message);
    return (c.body = { msg: "error", code: 401 });
  }
};
