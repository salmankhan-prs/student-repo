const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')
const studentSchema= new mongoose.Schema({
  studentID:{
      type: 'string',
      unique: true,
      required: true,
  },
   name:{
       type: 'string',
       min: 6,
       required: true,
       max: 20

   },

   age: 
   { type: 'number', 
      
     default: 0
   },

   overallPercentage:'number',
   password:{
       type: 'string',
       required: true,
       min:6,
       max: 20
   },
   tokens:[{
       token:{ 
           type: String, 
           required: true,
       }
   }]   




},{
    timestamps: true
})


studentSchema.statics.findByCredentails=async (studentID,password)=>{
    const student= await Student.findOne({studentID});
    if(!student){
        throw new Error(`Student  does not exist`);
    }
    const isMatch=await bcrypt.compare(password,student.password);
  if(!isMatch){
      throw new Error(`password not matched`);
  }
  return student;

}



studentSchema.methods.generateAuthToken=async function(){
const student=this;
const token=jwt.sign({studentID:student.studentID},'salman')
student.tokens=student.tokens.concat({token})
await student.save()
return token;

}
studentSchema.pre('save',async function(next){
    const student=this;
    console.log(student);
    if(student.isModified('password')){ 
        student.password=await bcrypt.hash(student.password,8);
    }
    next()
})

const Student=mongoose.model('Student',studentSchema);


module.exports = Student;