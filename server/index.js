import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoutes from './router/student.js';
import mongoURI from './config/env.js';


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
mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true})
       .then(()=> app.listen(port,() => 
           console.log(`connection is established and running on port ${port}`)
        )).catch((err)=> console.log(err.message));
// mongoose.set(`useFindAndModify`,false);        

import amqp from 'amqplib';


const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost:5672/');
        const channel = await connection.createChannel();

        // Now you can use the channel to send and receive messages
        sendMessage(channel, 'myQueue', 'Hello RabbitMQ!'+Date());
        consumeMessage(channel, 'myQueue');


    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}
const sendMessage = async (channel, queueName, message) => {
    try {
        await channel.assertQueue(queueName);
        await channel.sendToQueue(queueName, Buffer.from(message));
        console.log('Message sent:', message);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Call sendMessage function after the channel is created
const consumeMessage = async (channel, queueName) => {
    try {
        await channel.assertQueue(queueName);
        channel.consume(queueName, (message) => {
            if (message !== null) {
                console.log('Received message:', message.content.toString());
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('Error consuming message:', error);
    }
}

// Call consumeMessage function after the channel is created


connectToRabbitMQ();