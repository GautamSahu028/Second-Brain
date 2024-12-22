import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const userModel = mongoose.model("user", userSchema);

export { userModel };
