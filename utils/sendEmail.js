/*
 * @Descripttion: 
 * @Author: zzz
 * @Date: 2020-09-08 03:38:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-07 17:03:30
 */
const nodemailer = require("nodemailer");
const { emailConfig: config } = require("../config");

/**
 * @description: 发送邮箱函数
 * @param {
      mailOption = {
        from: "2368299717@qq.com", //发件人
        to: "1449723293@qq.com", //收件人
        subject: "李文静", //标题
        text:''
        html: "<b>牛逼plus</b>", //正文，可使用 HTML 格式进行渲染
};
 * } 
 * @return {Promise} 
 */

function sendQQEmail(mailOption) {
  const transport = nodemailer.createTransport(config);
  //返回发送邮箱函数
  mailOption.from = config.auth.user;
  mailOption.subject = "素质分管理系统邮箱验证";
  return transport.sendMail(mailOption);
}

module.exports = sendQQEmail;
