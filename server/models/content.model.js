import mongoose, { Schema } from "mongoose";

const contentTypes = ["image", "video", "article", "audio", "tweet"];

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  date: { type: String, default: Date.now },
});

const contentModel = mongoose.model("content", contentSchema);

export { contentModel };
