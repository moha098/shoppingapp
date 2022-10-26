const router=require('express').Router();
const User=require('./models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const checkAuth=require('./middleware/check-auth')
router.post('/signup',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.json({success:false,message:"password issue"})
        }else{
    
    const user=new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hash,
    })
    user.save()
        .then((_)=>{
        res.json({success:true,message:"account has been created"})
    })
    .catch((err)=>{
        res.json({sucess:false,message:"signup failed"})
    })
}
})
});

router.post('/login',(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then((result)=>{
        if(result.length<1){
            res.json({success:true,message:"user not found"})
        }
        const user=result[0];
        bcrypt.compare(req.body.password,user.password,(err,ret)=>{
            if(ret){
                const payload={
                    userId:user._id
                }
                const token=jwt.sign(payload,"Secrett")
                    res.json({success:true,token:token,message:"login successful"})
                
                
            }else {
                        res.json({success:false,message:"password dosent match"})
            }
        })

    }).catch((err)=>{
        res.json({sucess:false,message:"login failed"})
    })
})

router.get('/profile',checkAuth,(res,req)=>{
    const userId=req.userData.userId;
    User.findById(userId)
    .exec()
    .then((result)=>{
         res.json({sucess:true,data:result})
    }).catch((err)=>{
         res.json({sucess:false,message:"server error"})
    })
})
module.exports=router
