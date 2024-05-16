import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 6
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  mssv: {
    type: String,
    minLength: 8,
    maxLength: 8,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    minLength: 6
  },

  authType: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
  },

  authGoogleId: {
    type: String,
    default: null,
  },

  role: [{
    type: String,
    enum: ["User", "Leader", "Mod"],
    default: "User",
  }],

  books: [{
    type: Schema.Types.ObjectId,
    ref: "Book"
  }],

  score: {
    type: Number,
    required: true,
  }
});

userSchema.pre("save", async function (next) {
  try {
    if (this.authType !== "local") next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
}

const User = mongoose.model("User", userSchema);
export default User;