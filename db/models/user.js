import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    require: [true, "User must have a email"],
  },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
  },
  todos: {
    type: [String],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth required"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  age: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  password: {
    type: String,
    required: [true, "User must provide password"],
  },
});

tourSchema.pre("save", function (next) {
  var diff_ms = Date.now() - this.dob.getTime();
  var age_dt = new Date(diff_ms);
  this.age = Math.abs(age_dt.getUTCFullYear() - 1970);
  next();
});

const User = model("User", UserSchema);

export default User;
