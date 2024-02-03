import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
/* 
    `mongoose.models.User` will not exist in DB in the first run hence it will call
    `mongoose.model('User',userSchema)` to creacte the schema
    and from the next run onwards the `mongoose.modles.User` will be used.
*/
