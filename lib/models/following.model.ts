import mongoose from "mongoose";

const objectType = mongoose.Schema.Types.ObjectId;

const followingSchema = new mongoose.Schema({
  user: { type: objectType, ref: "User" },
  following: [{ type: objectType, ref: "User" }],
  followers: [{ type: objectType, ref: "User" }],
});

const Following =
  mongoose.models.Following || mongoose.model("Following", followingSchema);

export default Following;
