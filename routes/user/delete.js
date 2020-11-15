/**
 * @description: 删除用户
 * @param {*}
 * @return {*}
 */
const { User } = require("../../models/User");
const { checkToken } = require("../../utils/token");
const fs = require("fs");
const { Picture } = require("../../models/Picture");
module.exports = async (c) => {
  try {
    let token = c.header.token;
    let { classID, stu_name, stu_number } = await checkToken(token);
    let id = c.params.id;
    await User.updateOne(
      {
        _id: id,
      },
      { $set: { classID: null } }
    );
    // 将用户下的所有图片全部删除
    if (classID) {
      // 包含该学号的都删除
      let reg = new RegExp(stu_number);
      let Pictures = await Picture.find({ url: reg });
      await Picture.deleteMany({ url: reg });
      // 删除上次任务的所有图片
      Pictures.forEach((picture) => {
        fs.unlinkSync(picture.url);
      });
    }
    return (c.body = { msg: "删除成功", code: 200 });
  } catch (error) {
    console.log(error.message);
    return (c.body = { msg: "error", code: 401 });
  }
};
