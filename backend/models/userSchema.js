const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    aadharCardNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    role:{
        type:String,
        enum:['voter' , 'admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next()
    this.password= await bcrypt.hash(this.password , 10)
  next();
})

userSchema.methods.comparePassword =(function(pass){
  return bcrypt.compare(pass , this.password);
})

module.exports = mongoose.model("User", userSchema);
