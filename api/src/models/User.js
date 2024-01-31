import mongoose from 'mongoose';
import validator  from 'validator';
import bcrypt from 'bcryptjs';



const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "This email address are exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    picture: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Provide your password"],
    },
  },
  { timestamps: true, collection: "users" }
);
userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(this.password, salt);
      this.password = hashPassword;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);


  export default UserModel