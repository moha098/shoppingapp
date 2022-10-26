const mongoose=require('mongoose');

const schema=mongoose.Schema;

const shoppingSchema=new schema({
 name:{type:String},
 price:{type:String},
 description:{type:String},
 units:{type:String},
 created_at:{type:Number,default:Date.now().valueOf()},
 updated_at:{type:Number,default:Date.now().valueOf()}
})

module.exports=mongoose.model("Shopping",shoppingSchema);