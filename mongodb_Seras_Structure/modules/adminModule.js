import mongoose from "mongoose";

const adminLoginSchema=mongoose.Schema({
      email:{
            type:String,
            required:true,
      },
      password:{
            type:String,
            required:true,
      }
});
const adminLoginModel=mongoose.model("adminLoginModel",adminLoginSchema,"adminLogin");

export {adminLoginModel};
