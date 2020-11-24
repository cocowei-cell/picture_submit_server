/**
 * @description: 删除截图选项
 * @param {*}
 * @return {*}
 */
const { User } = require("../../models/User");
const { checkToken } = require("../../utils/token");
module.exports = async (c) => {
  try {
    let token = c.headers.token;
    await checkToken(token);
    let { _id } = c.request.params;
    await User.updateOne(
      {
        _id,
      },
      {
        $set: {
          isSubmit: false,
        },
      }
    );
    return (c.body = { msg: "删除成功", code: 200 });
  } catch (error) {
    return (c.body = { msg: "删除失败", code: 401 });
  }
};
