const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    // 学号
    stu_number: {
      type: String,
      unique: true,
      default: "",
    },
    // 姓名
    stu_name: {
      type: String,
      default: "",
    },
    // QQ邮箱
    email: {
      type: String,
      default: "",
    },
    // 密码
    password: {
      type: String,
      default: "",
    },
    // 所属班级ID
    classID: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "class",
    },
    // 学生是否提交
    isSubmit: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};
