import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    const server = app.listen(process.env.PORT || 8000,()=>{
        console.log(`Listening to PORT : ${process.env.PORT}`);
    })

    server.on('error',(err)=>{
        console.log('Unable to use Express',err);
        throw err
    })
})
.catch(err =>{
    console.log(`MongoDB connection FAILED!! ${err}`);
})



/*
Approach - 1
========================================
import express from 'express'
const app = express()
( async () =>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
       app.on('error',(err)=>{
        console.log('Unable to use Express',err);
        throw err
       })
    }
    app.listen(process.env.PORT,()=>{
        console.log(`Listening on port ${process.env.PORT}`);
    })
    catch (error) {
        console.error('Error connecting to Database',error)
        throw error
    }
})()
*/