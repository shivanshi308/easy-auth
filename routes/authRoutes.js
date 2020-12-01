const express= require('express')

const {check, validationResult}= require('express-validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require('../models/User')

router.post('/signup', 
    [check("username", "Please enter valid username")
    .not()
    .isEmpty(),
    check("email", "Please enter valid email").isEmail(),
    check("password", "Please enter valid password").isLength({
        min: 6
    })],
    async (req,res)=>{
        const err= validationResult(req)
        if(!err.isEmpty()){
            return res.status(400).json({
                err: err.array()
            })
        }
        const {username,email,password}= req.body
        try{
            let user= await User.findOne({email})
            if(user){
                return res.status(400).json({
                    msg:'User already exists'
                })
            }
            user= new User({
                username,email,password
            })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            const payload= {
                user:{
                    id: user.id
                }
            }
            jwt.sign(payload, 'randomString',{
                expiresIn:10000
            },
            (err,token)=>{
                if(err)
                    throw err
                res.status(200).json({
                    token,
                    
                })
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send("An error occurred while saving");
        }
})

module.exports=router