import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: { type: String, required: false },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bookmark: [
    {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: "User",
    },
  ],
  deleted: { type: Boolean, required: false, default: false },
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);

export default Thread;
