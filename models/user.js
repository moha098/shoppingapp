const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({
    displayName:{type:String},
    email:{type:String,unique:true,require:true},
    password:{type:String,unique:true}
  
})



module.exports=mongoose.model('User',userSchema);