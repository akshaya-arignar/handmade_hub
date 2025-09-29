import mongoose  from "mongoose";

const artSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String},
    imgUrl: {type:String, required:true},
    price: {type:Number, required:true},
    category: {type:String, required:true},
    available: {type:Boolean, default:true},
    date: {type:Date, default:Date.now}
})

export default mongoose.model("Artist", artSchema)