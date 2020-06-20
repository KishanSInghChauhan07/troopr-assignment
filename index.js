const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Port = 7000;

const {mongoUrl} = require('./config/keys')

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected', () =>{
    console.log("connected to the mongodb");
})
mongoose.connection.on('error', (error) =>{
    console.log("error connecting to the mongodb",err);
})

require('./models/data');
app.use(express.json())
app.use(require('./routes/data'));

app.listen(Port,() => {
    console.log("server is running on :", Port);
    
})


