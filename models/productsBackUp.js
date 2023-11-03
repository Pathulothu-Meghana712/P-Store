const mongoose = require("mongoose");
const { Schema } = mongoose;


const productsBackUpSchema = new Schema({
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
    },
    Original_product_id:{
      type:String,
      required:true,
  },

  
  })
  
  module.exports = mongoose.model("productsBackUp", productsBackUpSchema);
  