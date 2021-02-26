require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator')
// const random = require('random')
const bcrypt = require('bcrypt')
const UserInformation = require('../models/users');
const ProfileInformation = require('../models/profile');

//day js date
// const dayjs = require('dayjs')
// var timezone = require('dayjs/plugin/timezone')
// dayjs.extend(timezone)
// dayjs.tz.setDefault("Africa/Lagos") 

const generateToken = (email,userId) =>{
    return jwt.sign({
        emailAddress:email,
        userId:userId
    },
    process.env.MY_HASH_SECRET);
}

//cloudinary settings for image upload
// var cloudinary = require('cloudinary').v2;
// cloudinary.config = ({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET
// })

exports.add_new_user = async (req,res,next)=>{
    try {
        console.log(req.body)
        const v = new Validator(req.body, {
            email: "required|email",
            password: "required|string|minLength:6",
            fullName: "required|string|minLength:1"
        })

        const matched = await v.check()
        if(!matched){
            return res.status(412).json({
                message:'Invalid Data Input'
            });
        }else{
            // email password fullName
            let hashVerificationCode = await bcrypt.hash(req.body.password.trim(),10)
            const user = new UserInformation({
                _id : mongoose.Types.ObjectId(),
                email :req.body.email.trim(),
                password : hashVerificationCode,
                fullName : req.body.fullName.trim()
            });
            let newUser = await user.save()
            return res.status(200).json({
                message:'Success',
                newUser
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

exports.user_login = async (req,res,next)=>{
    try {
        const v = new Validator(req.body, {
            email: "required|email",
            password: "required|string|minLength:6"
        })

        const matched = await v.check()
        if(!matched){
            return res.status(412).json({
                message:'Invalid Data Input'
            });
        }else{
            // email password fullName
            let userExist = await UserInformation.findOne({email: req.body.email.trim()});
            console.log(userExist)
            if(userExist){
                const hash = await bcrypt.compare(req.body.password,userExist.password)
                if(hash && !userExist.deleted){
                    //generate auth token
                    const tokenValue = generateToken(userExist.email,userExist._id)
                    // UPDATE lastLogin
                    /*let updateInfo = await UserInformation.findOneAndUpdate({_id:userExist._id},
                        {
                            $currentDate:{
                                lastLogin:{$type:"date"}
                            }
                        },{new:true})*/
                    return res.status(200).json({
                        message:'success',
                        user:userExist,
                        token:tokenValue
                    });  
                }
            }
            return res.status(422).json({
                message:'Invalid Credentials'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

exports.my_profile = async (req,res,next)=>{
    try {
        let profileInfo = await ProfileInformation.findOne({user: req.userInfo._id});
        return res.status(200).json({
            message:'success',
            userInfo:req.userInfo,
            profileInfo:profileInfo
        }); 
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

exports.update_profile = async (req,res,next)=>{
    try {
        const v = new Validator(req.body, {
            status: "required|string",
            social: "required|object",
            skills: "required|array",
            location: "required|string|minLength:1",
            website: "url",
            company: "required|string|minLength:1",
            bio: "required|string|minLength:1",
            githubUserName: "required|string|minLength:1"
        })

        const matched = await v.check()
        if(!matched){
            return res.status(412).json({
                message:'Invalid Data Input'
            });
        }else{
            let status = social = skills =location =website =company = bio =githubUserName = null
            let profileInfo = await ProfileInformation.findOne({user: req.userInfo._id});
            if(profileInfo){
                //update
                status = !req.body.status ? profileInfo.status :req.body.status;
                social = !req.body.social ? profileInfo.social :req.body.social;
                skills = !req.body.skills ? profileInfo.skills :req.body.skills;
                location = !req.body.location ? profileInfo.location :req.body.location;
                website = !req.body.website ? profileInfo.website :req.body.website;
                company = !req.body.company ? profileInfo.company :req.body.company;
                bio = !req.body.bio ? profileInfo.bio :req.body.bio;
                githubUserName = !req.body.githubUserName ? profileInfo.githubUserName : req.body.githubUserName;
                let profileInfo = await ProfileInformation.findOneAndUpdate({user:profileInfo._id},
                    {
                        $addToSet:{
                            status:status,
                            location:location,
                            company:company,
                            bio:bio,
                            githubUserName:githubUserName,
                            social:social,
                            skills:skills,
                            website:website,
                        }
                    },{new:true})
                    return res.status(200).json({
                        message:'Success',
                        profileInfo
                    });
            }else{
                //create
               
                const profile = new ProfileInformation({
                    _id : mongoose.Types.ObjectId(),
                    user:req.userInfo._id,
                    status:req.body.status.trim(),
                    location:req.body.location.trim(),
                    company:req.body.company.trim(),
                    bio:req.body.bio.trim(),
                    githubUserName:req.body.githubUserName.trim(),
                    social:req.body.social,
                    skills:req.body.skills,
                    website:req.body.website.trim()
                });
                let profileInfo = await profile.save()
                return res.status(200).json({
                    message:'Success',
                    profileInfo
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

const education = mongoose.Schema({
    school: {type: String, default:null},
    degree:{type:String, default:null},
    fieldOfStudy:{type: String, default:null},
    description:{type: String, default:null},
    from:{type:Date, default:null},
    to:{type:Date, default:null},
    current:{type:Boolean, default:false},
});
exports.update_profile_education = async (req,res,next)=>{
    try {
        const v = new Validator(req.body, {
            school: "required|string|minLength:3",
            degree: "required|string|minLength:3",
            description: "required|string|minLength:3",
            fieldOfStudy: "required|string|minLength:3",
            from: "required|date",
            to: "required|date",
            current: "required|boolean"
        })

        const matched = await v.check()
        if(!matched){
            return res.status(412).json({
                message:'Invalid Data Input'
            });
        }else{
            let education = {
                school: req.body.school.trim(),
                degree: req.body.degree.trim(),
                description: req.body.description.trim(),
                fieldOfStudy: req.body.fieldOfStudy.trim(),
                from: req.body.from.trim(),
                to: req.body.to.trim(),
                current: req.body.current
            }
            let updateInfo = null;
            let profileInfo = await ProfileInformation.findOne({user: req.userInfo._id});
            if(profileInfo){
                //update
                updateInfo = await ProfileInformation.findOneAndUpdate({user:req.userInfo._id},
                {
                    $addToSet:{
                        education:education
                    }
                },{new:true})
            }else{
                //create
                const profile = new ProfileInformation({
                    _id : mongoose.Types.ObjectId(),
                    user:req.userInfo._id,
                    education:education
                });
                updateInfo = await profile.save()
            }
            return res.status(200).json({
                message:'Success',
                userInfo:updateInfo
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

exports.update_profile_experience = async (req,res,next)=>{
    
    try {
        const v = new Validator(req.body, {
            title: "required|string|minLength:3",
            company: "required|string|minLength:3",
            location: "required|string|minLength:3",
            from: "required|date",
            to: "required|date",
        })

        const matched = await v.check()
        if(!matched){
            return res.status(412).json({
                message:'Invalid Data Input'
            });
        }else{
           
            let experience = {
                title: req.body.title.trim(),
                company: req.body.company.trim(),
                location: req.body.location.trim(),
                from: req.body.from.trim(),
                to: req.body.to.trim()
            }
            let updateInfo = null;
            let profileInfo = await ProfileInformation.findOne({user: req.userInfo._id});
            if(profileInfo){
                //update
                updateInfo = await ProfileInformation.findOneAndUpdate({user:req.userInfo._id},
                {
                    $addToSet:{
                        experience:experience
                    }
                },{new:true})
            }else{
                //create
                const profile = new ProfileInformation({
                    _id : mongoose.Types.ObjectId(),
                    user:req.userInfo._id,
                    experience:experience
                });
                updateInfo = await profile.save()
            }
            return res.status(200).json({
                message:'Success',
                userInfo:updateInfo
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}
