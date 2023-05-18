import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      min: [3, "Name is too Short"],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (email: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      required: [true, "Password Is required"],
      min: [6, "Password Is too short"],
      select: false,
    },
    avatar: String,
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    // methods can also be defined by userSchema.methods.property = function
    // but typescript keep showing error and by defining inside schema error goes way
    methods: {
      isPasswordMatch: async function (candidatePass: string) {
        return await bcrypt.compare(candidatePass, this.password);
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
