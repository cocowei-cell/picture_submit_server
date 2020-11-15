// session的配置文件
const config = {
  key: "ses", // 默认,
  maxAge: 85666, // 过期时间
  overwrite: true,
  httpOnlytrue: true, // 只有在服务端才能获取
  signed: true,
  rolling: false, // 每次请求强制设置session 重新设置session
  renew: true, // 快过期时候重新设置
};
//QQ邮箱配置文件
const emailConfig = {
  host: "smtp.qq.com", //QQ邮箱的 smtp 服务器地址
  secure: true, //使用 SSL 协议
  secureConnection: false, //是否使用对 https 协议的安全连接
  port: 465, //QQ邮件服务所占用的端口
  auth: {
    user: "xxxx", //开启 smtp 服务的发件人邮箱，用于发送邮件给其他人
    pass: "xxxx", //SMTP 服务授权码
  },
};
const URL = "xxxx"
module.exports = {
  config,
  emailConfig,
  URL
};
