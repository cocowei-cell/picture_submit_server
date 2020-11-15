/*
 * @Descripttion: 
 * @Author: zzz
 * @Date: 2020-09-08 02:51:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-01 21:03:13
 */

const jwt = require("jsonwebtoken");
// const time = 60*60*24; //token过期时间 24小时有效
const secret = "asdasd5a456+.a1s1d54q5sda0.344$%*6wdqwsdfsdfgugugfugu1651--ds454.5*dqqasflol*-+#$&^#@&*$^*!&#@asf"; //签名

/**
 * @description: 创建token
 * @param {Object} 
 * @return {String} 
 */

function createToken(payload) {
  return jwt.sign(payload, secret);
}


/**
 * @description: 验证token
 * @param {String} 
 * @return {Promise} 
 */
function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}



module.exports = { createToken, checkToken };
