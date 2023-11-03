
const mongoose = require("mongoose");

const { Schema } = mongoose;

 

 

const sellSchema = new Schema({
    title:{

      type:String,

      required:true,

    },

    description:{

        type:String,

        required:true,

      },

    price:{

      type:Number,

      required:true,

    },

    contact:{

        type:Number,

        required:true,

    },

    img:{

      type:String,

      required:true,

    },

    user_id:{

      type:String,

      required:true,

    },

    area:{

      type:String,

      required:true,

    }

 

  })

 

  module.exports = mongoose.model("sell", sellSchema);

 