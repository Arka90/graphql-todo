import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { calculateDOB } from "../../utils/helper";

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
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
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

UserSchema.pre(/^find/, function (next) {
  this.populate("todos");
  next();
});

// Calculating the age before saving to DB
UserSchema.pre("save", function (next) {
  this.age = calculateDOB(this.dob);
  next();
});

// Calculating and saving the age before any find quries so that user can read updated age every time
UserSchema.pre(/^find/, function (next) {
  this.age = calculateDOB(this.dob);
  next();
});

// This hashed the password before saving to the DB
UserSchema.pre("save", async function (next) {
  //Hash the password with cost of 12
  if (this.createdAt - this.updatedAt == 0) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Method to compare the hashed password and the password pass by the user
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model("User", UserSchema);

export default User;
