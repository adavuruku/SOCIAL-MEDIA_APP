const mongoose = require('mongoose')
const UserInformation = require('../models/users');

exports.login_stat = async (req,res,next)=>{
    try {
            let AllUsers = await UserInformation.find({deleted: false});
            // console.log(AllUsers[0].online)
            let OnlineUsers = AllUsers.filter(eachUser => eachUser.online == 'Online')
            //add count of published post
            return res.status(200).json({
                message:'Success',
                registeredUsers:AllUsers.length,
                onlineUsers:OnlineUsers.length
            });
        
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}