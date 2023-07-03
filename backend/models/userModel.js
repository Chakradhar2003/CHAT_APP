const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: "String", required: true },
  pic: {
    type: "String",

    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
},
  { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

//pre means before saving data
userSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10); //more number more stronger
  this.password = await bcrypt.hash(this.password, salt)

})

//npm i bcryptjs
const User = mongoose.model("User", userSchema);

module.exports = User;