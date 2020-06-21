const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Data = mongoose.model("Data")


router.post('/',(req,res) => {
    const {name,email,address,phone,image} = req.body
    if(!email || !name || !phone || !image || !address){
        return res.status(422).json({error:"Please add all the fields"})
    }
    Data.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
            const data = new Data({
                email,
                name,
                phone,
                address,
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
    .catch(err => {
        console.log(err);
        
    })
})

router.get('/all',(req,res) => {
    Data.find()
    .then( data =>{
        res.json({data})
    })
    .catch(err =>{
        console.log(err);
        
    })
})

router.get('/user/:id',(req,res) => {
    Data.findById(req.params.id)
    .then( data =>{
        res.json({data})
    })
    .catch(err =>{
        console.log(err);
        
    })
})

router.post('/user/:id',(req,res) => {
    Data.findById(req.params.id)
    .then( data =>{
        data.name = req.body.name;
        data.email = req.body.email;
        data.phone = req.body.phone;
        data.address = req.body.address;

        data.save()
        .then(() => res.json("updated"))
        .catch(err => res.json(err))
    })
    .catch(err =>{
        console.log(err);
        
    })
})


module.exports = router