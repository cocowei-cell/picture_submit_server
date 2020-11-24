/**
 * @description: 图片上传模块
 * @param {*}
 * @return {*}
 */
const formidable = require("formidable");
const { Picture } = require("../../models/Picture");
const { checkToken } = require("../../utils/token");
const fs = require("fs");
const { User } = require("../../models/User");
/**
 * 异步等待函数
 * @param {*} form form对象
 * @param {*} c 上下文
 */
function Parse(form, c) {
  return new Promise((resolve, reject) => {
    try {
      form.parse(c.req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    } catch (error) {
      reject();
    }
  });
}
module.exports = async (c) => {
  try {
    let token = c.header.token;
    let { stu_name, stu_number, _id } = await checkToken(token);
    let { missionID, num, count } = c.query;
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/img"; //上传路径
    form.keepExtensions = true; //保留文件扩展名
    form.maxFileSize = 1024 * 1024 * 10; //最大文件为10M
    let realPath = "";
    try {
      let files = await Parse(form, c);
      let imgFile = null;
      for (let key in files) {
        if (!files[key].type.includes("image")) {
          return (c.body = { msg: "请上传图片", code: 400 });
        }
        imgFile = files[key];
      }
      let name = `${stu_number}_${stu_name}_${num}.${
        imgFile.type.split("/")[1]
      }`;
      let renamePath = `public/img/${name}`;
      // 删除上一次的文件
      try {
        fs.unlinkSync(renamePath);
      } catch (error) {}
      // 更改姓名和路径
      fs.renameSync(imgFile.path, renamePath);
      realPath = renamePath;
      // 保存之前先查询是否有该图片，如果有就删除数据库中的图片记录 然后再进行保存
      // 防止上传第一张图片之后 刷新页面
      await Picture.deleteOne({
        url: realPath,
      });
      // 保存数据库
      await Picture.create({
        url: realPath,
        along_mission: missionID,
        pic_name: name,
        order: num,
      });
      let isOver = num == count;
      if (isOver) {
        await User.updateOne(
          {
            _id,
          },
          { $set: { isSubmit: true } }
        );
      }
      return (c.body = {
        msg: `上传第${num}张图片成功`,
        code: 200,
        imgURL: realPath,
        isOver,
      });
    } catch (error) {
      return (c.body = { msg: "上传失败", code: 400 });
    }
  } catch (error) {
    return (c.body = { msg: "error", code: 401 });
  }
};
