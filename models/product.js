const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
    product_name:{
      type:String,
      required:true,
    },
    price:{
      type:Number,
      required:true,
    },
    description:{
      type:String,
      required:true,
    },
    img_url:{
      type:String,
      required:true,
    },
    category:{
      type:String,
      required:true,
    }
  
  })
  
  module.exports = mongoose.model("products", productSchema);
  
