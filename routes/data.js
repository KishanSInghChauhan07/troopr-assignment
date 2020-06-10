const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Data = mongoose.model("Data")
const bcrypt = require('bcryptjs');


router.post('/',(req,res) => {
    const {name,email,password,phone,image} = req.body
    if(!email || !password || !name || !phone || !image){
        return res.status(422).json({error:"Please add all the fields"})
    }
    Data.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,12)
        .then( hashedPassword => {
            const data = new Data({
                email,
                name,
                phone,
                password:hashedPassword,
                image
            })
            data.save()
            .then( data =>{
                res.json({message:"saved succesfully"})
            })
        .   catch( err => {
                console.log(err);

            })
        })
        
    })
    .catch(err => {
        console.log(err);
        
    })
})


module.exports = router