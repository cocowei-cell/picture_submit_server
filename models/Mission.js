const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const missionSchema = new Schema(
  {
    // 任务名称
    name: {
      type: "string",
      default: "",
    },
    // 截图数量
    count: {
      type: Number,
      default: 1,
    },
    // 所属班级id
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
    },
    // 过期时间
    time: {
      type: Number,
      default: +new Date(),
    },
    compress: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

const Mission = mongoose.model("mission", missionSchema);

module.exports = {
  Mission,
};
