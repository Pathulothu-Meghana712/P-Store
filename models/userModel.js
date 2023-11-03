const mongoose = require("mongoose");
const { Schema } = mongoose;
// const passportLocalMongoose = require('passport-local-mongoose');

const pstoreSchema = new Schema({

  fName:{
    type:String,
    required:true,
  },
  lName:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: false,
  },
  resetPasswordToken:{
    type: String,
    required: false,
  },
});


module.exports = mongoose.model("User", pstoreSchema);

