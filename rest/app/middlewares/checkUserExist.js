require('dotenv').config();
const mongoose = require('mongoose');
const UserInformation = require('../models/users');
const jwt = require('jsonwebtoken');


module.exports.check_user_exist = async (req, res, next)=>{
    try{
        let userExist = await UserInformation.findOne({email: req.body.email.trim()});
        if(userExist){
            res.status(422).json({
                message:'User Email Already Exist'
            });
        }else{
            req.userInfo = userExist
            next();
        }
    }catch(error){
        res.status(422).json({
            message:'User Email Already Exist'
        });
    }
}

module.exports.account_active = async (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.MY_HASH_SECRET);
        let userExist = await UserInformation.findOne({email: decoded.emailAddress});
        //make sure the account is not deactivated and is active
        if(userExist){
            req.userInfo = userExist
            next();
        }else{
            res.status(422).json({
                message:'Authentication Fail'
            });
        }
    }catch(error){
        res.status(422).json({
            message:'Authentication Fail'
        });
    }
}

module.exports.auth_header = async (req, res, next)=>{
    const token = req.header('x-auth-token')
    if(!token){
        console.log('No Token')
        return res.status(401).json({msg:'No token, authorization denied'})
    }
    try{
      
        const decoded = jwt.verify(token,process.env.MY_HASH_SECRET);
        // console.log(decoded)
        let userExist = await UserInformation.findOne({email: decoded.emailAddress});
        //make sure the account is not deactivated and is active
        if(userExist){
            req.userInfo = userExist
            next();
        }else{
            res.status(422).json({
                message:'Authentication Fail'
            });
        }
    }catch(error){
        res.status(422).json({
            message:'Authentication Fail'
        });
    }
}