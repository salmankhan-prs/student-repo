const mongoose =require('mongoose')


mongoose.connect('mongodb://localhost:27017/student').then(()=>{
    console.log('CONNECTED to MongoDB')
}).catch(err => {
    console.log('FAILED to connect to MongoDB: ')
})
