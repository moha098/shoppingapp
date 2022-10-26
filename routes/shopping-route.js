const router=require('express').Router();
const Shopping=require('./models/shopping');
router.post('/',(req,res)=>{
    const shopping=new Shopping({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        units:req.body.units,
    })
    shopping.save()
    .then(result=>{
        res.json({success:true,message:"data has been created sucessfully"});
    })
    .catch(err=>{
        res.json({success:false,message:"error in data creation"});
    })
})

router.get('/',(req,res)=>{
    Shopping.find({})
    .exec()
    .then((result=>{
        res.json({success:true,data:result});
    })

    )
    .catch((err)=>{
        res.json({success:false,message:"error in getting data"})
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id;
    Shopping.findOne({_id:id})
    .exec()
    .then((result=>{
        res.json({success:true,data:result});
    })

    )
    .catch((err)=>{
        res.json({success:false,message:"error in getting data by id"})
    })

})

router.patch('/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id);
    console.log(req.body);
    Shopping.updateOne({_id:id},{$set:req.body})
    .exec()
    .then((_)=>{
        res.json({success:true,message:"updated data successfully"})
    }).catch((err)=>{
        res.json({success:false,message:"error in updating"});
    })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    Shopping.deleteOne({_id:id})
    .exec()
    .then((_)=>{
        res.json({success:true,message:"Data deleted successfullys"})
    })
    .catch((err)=>{
        res.json({success:true,message:"error in deleting data"});
  
    })


})
module.exports=router;