/**
 * @description: 获取随机邀请码
 * @param {*}
 * @return {*}
 */
const uuid = require("uuid");

function getInvitationCode() {
  let codeTemp = "";
  let code = "";
  function getRandom(left, right) {
    return Math.ceil(Math.random() * (right - left)) + left;
  }
  function getInvitation() {
    return Math.random().toString(24).substr(2, 10) + Date.now().toString(24);
  }
  let current = uuid.v1().split("-");
  let uuids = current[4] + current[0] + current[2] + current[1];
  codeTemp = uuids + getInvitation();
  for (let i = 0, len = codeTemp.length; i < 6; i++) {
    code += codeTemp[getRandom(0, len - 1)];
  }
  return code;
}

module.exports = getInvitationCode;
