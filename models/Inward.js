import mongoose from "mongoose";

const inwardSchema=new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:["Waiting","Received"],
        default:"Waiting",
    }
})

export const Inward=mongoose.model("Inward",inwardSchema)