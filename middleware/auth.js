const jwt=require('jsonwebtoken')
const Student = require('../models/Student')

const auth=async(req,res,next)=>{

    try{

      const token=req.header('Authorization').replace('Bearer ','')
     
        const decoded=jwt.verify(token,'salman')
        const student=await Student.findOne({studentID: decoded.studentID,'tokens.token':token})
        if(!student){
         
            throw new Error('Student not found')
          
        }
        req.token=token;
        req.student=student;
        next();
    }catch(e){
        res.send('NOt valid token found')
      console.log(e)
    }
};
module.exports=auth;