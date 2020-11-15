const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const classSchema = new Schema(
  {
    // 班级邀请码
    invitation_code: {
      type: String,
      default: "",
    },
    // 创建人
    along_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    class_name:{
      type:String,
      default:"",
      require:true
    }
  },
  { versionKey: false }
);

const Class = mongoose.model("class", classSchema);

module.exports = {
  Class,
};
