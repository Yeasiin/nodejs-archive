import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is Required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required"],
  },
  email: {
    type: String,
    // unique: [true, "Email must be unique"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password field can't be empty"],
  },
  avatar: String,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
