import mongoose from "mongoose";

const orderScehma=new mongoose.Schema({
    
      orderDate: {
        type: Date,
        required: true,
        default: Date.now,
      },
      approvedDate: {
        type: Date,
      },
      
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      ordertype:{
        type:String,
        enum:["Supplies","Repair","ExternalService","Equipment"],
        default:"Supplies",
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', 
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', 
      },
      orderStatus:{
        type:String,
       
      }


      //When order is passed then make product  from it
      //break item to get name of product and the category
})

export const Orders=mongoose.model("Orders",orderScehma) 