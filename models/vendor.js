import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    name:{
        type:String
    },
    addrs:{
        type:String,
    },
    contact:{
        type:Number
    }
});

export const Vendors = mongoose.model("Vendors", vendorSchema);

