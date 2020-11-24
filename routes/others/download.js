/**
 * @description: 下载打包为zip格式文件
 * @param {*}
 * @return {*}
 */
const { Picture } = require("../../models/Picture");
const { checkToken } = require("../../utils/token");
// const { Mission } = require("../../models/Mission");
const fs = require("fs");
const JSZip = require("jszip");
const { URL } = require("../../config");
/* function copyTo(pictureFir, pic) {
  pictureFir.forEach((item) => {
    fs.copyFileSync(`public/img/${item.pic_name}`, `${pic}/${item.pic_name}`);
  });
} */

async function toZIP(arr = [], className, dir, files) {
  let zip = new JSZip();
  arr.forEach((item, index) => {
    // 遍历文件
    files[index].forEach((file) => {
      zip.file(item.name + "/" + file.pic_name, fs.readFileSync(file.url));
    });
  });
  let content = await zip.generateAsync({
    type: "nodebuffer",
    // 压缩算法
    compression: "DEFLATE",
    compressionOptions: {
      level: 9,
    },
  });
  let zipPath = dir + className + ".zip";
  // 写入磁盘 同步写入
  fs.writeFileSync(zipPath, content);
}

module.exports = async (c) => {
  try {
    let token = c.header.token;
    await checkToken(token);
    // 获取missionID值
    let { missionID, count, class_name } = c.request.body;
    // 查询第一张图片
    let pictureFir = await Picture.find({
      along_mission: missionID,
      order: 1,
    }).select("url pic_name");
    let fileArray = [];
    fileArray.push(pictureFir);
    let dir = "public/compress/";
    // 删除该文件，避免有重复的文件造成下载上一次的压缩包
    try {
      fs.unlinkSync(`${dir}${class_name}截图.zip`);
    } catch (error) {}
    let pictureSec = [];
    let arr = [{ name: `${class_name}截图1` }];
    if (count == 1) {
      // 只用打包一张截图就可以了
      // 打包
      await toZIP(arr, `${class_name}截图`, dir, fileArray);
    } else {
      pictureSec = await Picture.find({
        along_mission: missionID,
        order: 2,
      }).select("url pic_name");
      // 开始压缩为一个zip文件
      arr.push({ name: `${class_name}截图2` });
      fileArray.push(pictureSec);
      await toZIP(arr, `${class_name}截图`, dir, fileArray);
    }
    // 下载文件
    let name = class_name + "截图.zip";
    return (c.body = { msg: "ok", code: 200, url: URL + name });
  } catch (error) {
    return (c.body = { msg: "error", code: 401 });
  }
};
