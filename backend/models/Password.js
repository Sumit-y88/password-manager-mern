import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    website: String,
    username: String,
    password: String
  },
  { timestamps: true }
);

export default mongoose.model("Password", passwordSchema);
