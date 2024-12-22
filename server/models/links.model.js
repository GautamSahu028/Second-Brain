import mongoose, { Schema } from "mongoose";

const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const linkModel = mongoose.model("link", linkSchema);

export { linkModel };
