import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
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

UserSchema.pre("save", function (next) {
  const dob = new Date(this.dob);
  //calculate month difference from current date in time
  const month_diff = Date.now() - dob.getTime();
  //convert the calculated difference in date format
  const age_dt = new Date(month_diff);
  //extract year from date
  const year = age_dt.getUTCFullYear();
  //now calculate the age of the user
  this.age = Math.abs(year - 1970);
  next();
});

UserSchema.pre(/^find/, function (next) {
  const dob = new Date(this.dob);
  //calculate month difference from current date in time
  const month_diff = Date.now() - dob.getTime();
  //convert the calculated difference in date format
  const age_dt = new Date(month_diff);
  //extract year from date
  const year = age_dt.getUTCFullYear();
  //now calculate the age of the user
  this.age = Math.abs(year - 1970);
  next();
});

UserSchema.pre("save", async function (next) {
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model("User", UserSchema);

export default User;
