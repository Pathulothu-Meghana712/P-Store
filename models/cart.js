const mongoose = require("mongoose");
const { Schema } = mongoose;


const cartSchema = new Schema({

    user_id:{
        type:String,
        required:true,
    },
    cartProducts:{
        type:Array,
        required:true,
    }

  })
  
  module.exports = mongoose.model("cart", cartSchema);
  