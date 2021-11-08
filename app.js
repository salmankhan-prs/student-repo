const express=require('express');
require('./db/connection')

const router = require('./routes/student')
const public = require('./routes/public')
const app=express();
app.use(express.json())
app.use('/api/',public);
app.use('/api/auth',router);



app.listen(3000,()=>{
    console.log("PORT STARTED  AT 3000")
})
