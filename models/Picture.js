const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const pictureSchema = new Schema(
  {
    // 图片地址
    url: {
      type: String,
      default: "",
    },
    // 属于的任务
    along_mission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mission",
      default: null,
    },
    pic_name: {
      type: String,
      default: "",
    },
    // 图片顺序
    order: {
      type: Number,
      default: 1,
      enum: [1, 2],
    },
  },
  { versionKey: false }
);

const Picture = mongoose.model("picture", pictureSchema);

module.exports = {
  Picture,
};
