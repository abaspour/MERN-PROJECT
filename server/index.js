import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoutes from './router/student.js';

const app=express();
app.use(cors());
app.use(express.json()); // This middleware parses JSON data in requests

app.use(bodyParser.json({limit:"20mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"20mb",extended:true}));

app.use('/students',studentRoutes);
app.use('/test',(req,res)=>{
    console.log(req.body);
    console.log(req.params);
    res.status(200). send("aa"+req.body+"aa"+req.params)
});


const db_url="mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/?retryWrites=true&w=majority";
const port=process.env.port || 5000;
mongoose.connect(db_url,{useNewUrlParser:true,useUnifiedTopology:true})
       .then(()=> app.listen(port,() => 
           console.log(`connection is established and running on port ${port}`)
        )).catch((err)=> console.log(err.message));
// mongoose.set(`useFindAndModify`,false);        