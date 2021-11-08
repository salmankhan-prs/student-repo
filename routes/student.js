const express=require('express');
const Student=require('../models/Student')
const auth=require('../middleware/auth');
const router = express.Router();

router.all('*',auth);

//NOTE: STUDENT INFORMATION IS GETTING FROM MIDDLE WARE AUTH 'middleware/auth'

//includes all the information of the student 
//only authenticated users can access the routes and can see he/she profile
router.get('/student/me',(req,res) => {
    res.send(req.student)
});

router.put('/student/me',async(req,res)=>{
    const updates=Object.keys(req.body)
 const allowedUpdates=['name', 'age', 'password', 'overallPercentage'];
 
   
    const student=req.student;
    const isValidOperation=updates.every(u=>allowedUpdates.includes(u))
    if(!isValidOperation){
        return res.send({message: 'Operation not valid'});
    }
     try{
         updates.forEach(u=>student[u]=req.body[u])
         await  student.save()
         res.send({message: 'Success'});
     }
     catch(e){
         console.error(e);
         res.send(e)
     }

})




router.delete('/student/me',async(req,res)=>{
 
 
    const student=req.student

    console.log(student);
    if(!student){
        res.send({message: 'Student not found'});
    }
   
     try{
        student.deleteOne({studentID:student.studentID})
         res.send({message: 'Success'});
     }
     catch(e){
         console.error(e);
         res.send(e)
     }

})


module.exports=router;

///##########  WITHOUT AUTH MIDDLEWARE USING PARAMS ##################///

// router.put('/student/:studentID',async(req,res)=>{
//     const updates=Object.keys(req.body)
//  const allowedUpdates=['name', 'age', 'password', 'overallPercentage'];
 
//     const student=await Student.findOne({studentID:req.params.studentID});

//     console.log(student);
//     if(!student){
//         res.send({message: 'Student not found'});
//     }
//     const isValidOperation=updates.every(u=>allowedUpdates.includes(u))
//     if(!isValidOperation){
//         return res.send({message: 'Operation not valid'});
//     }
//      try{
//          updates.forEach(u=>student[u]=req.body[u])
//          await  student.save()
//          res.send({message: 'Success'});
//      }
//      catch(e){
//          console.error(e);
//          res.send(e)
//      }

// })




// router.delete('/student/:studentID',async(req,res)=>{
 
 
//     const student=await Student.findOne({studentID:req.params.studentID});

//     console.log(student);
//     if(!student){
//         res.send({message: 'Student not found'});
//     }
   
//      try{
//         student.deleteOne({studentID:student.studentID})
//          res.send({message: 'Success'});
//      }
//      catch(e){
//          console.error(e);
//          res.send(e)
//      }

// })





















