const express = require('express');
const Student = require('../models/Student')
const router=express.Router();


//###### No Authoraization required for creating a profile ,login and seeing other Students public profile ####
router.post('/student/create',async (req,res)=>{
    const {studentID,name,age,overallPercentage,password}=req.body
    console.log(req.body);
   const student = new Student({
       studentID,name,age,password,overallPercentage
   });
   try{

    await student.save();
    res.send({studentID: student.studentID,name: student.name});
   }catch(err){
       res.send(err);
   }
 

})



router.post('/student/login', async (req, res) => {
    try{
        // demo=await Student.findOne(req.param)
    const student = await Student.findByCredentails(req.body.studentID,req.body.password)
     const token=await student.generateAuthToken();

     res.send({student,token})
}

   catch(e){console.error(e);

  res.send({message: 'Error'});
}



})


router.get('/student/:studentID', async (req, res)=>{
    const student=await Student.findOne({studentID:req.params.studentID});

    console.log(student);
    if(!student){
        res.send({message: 'Student not found'});
    }
    res.send({student_name: student.name});
})
module.exports=router

