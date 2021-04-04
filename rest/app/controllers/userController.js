require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator')
var multer = require('multer');
const bcrypt = require('bcrypt')

//usable models
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
    // console.log('Newww Hereee')
    try {
        // console.log(req.body)
        const v = new Validator(req.body, {
            email: "required|email",
            password: "required|string|minLength:6",
            name: "required|string|minLength:1"
        })

        const matched = await v.check()
        if(!matched){
            return res.status(412).json({
                message:'Invalid Data Input'
            });
        }else{
            // email password fullName
            let hashVerificationCode = await bcrypt.hash(req.body.password.trim(),10)
            const userNew = new UserInformation({
                _id : mongoose.Types.ObjectId(),
                email :req.body.email.trim(),
                password : hashVerificationCode,
                name : req.body.name.trim()
            });
            let newUser = await userNew.save()
            const tokenValue = generateToken(newUser.email,newUser._id)
            // console.log(newUser)
            return res.status(200).json({
                message:'Success',
                user:newUser,
                token:tokenValue
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
            profile:profileInfo
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
            status: "string|required",
            company: "string|required",
            social: "object|required",
            skills: "array|required",
            location: "string|minLength:1",
            website: "url|required",
            company: "string|minLength:1|required",
            bio: "string|minLength:1|required",
            githubUserName: "string|minLength:1|required"
        })
        // console.log(req.body)
        const matched = await v.check()
        if(!matched){
            return res.status(412).json({
                message:'Invalid Data Input'
            });
        }else{
            updatedProfile = await ProfileInformation.findOneAndUpdate({user:req.userInfo._id},
                {
                    $set:{
                        status:req.body.status,
                        location:req.body.location,
                        company:req.body.company,
                        bio:req.body.bio,
                        githubUserName:req.body.githubUserName,
                        social:req.body.social,
                        skills:req.body.skills,
                        website:req.body.website
                    }
                },{new:true,upsert:true})
                return res.status(200).json({
                    message:'Success',
                    profile:updatedProfile
                });
            
        }
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}


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
            //update
            updateInfo = await ProfileInformation.findOneAndUpdate({user:req.userInfo._id},
            {
                $addToSet:{
                    education:education
                }
            },{new:true, upsert:true})
            
            return res.status(200).json({
                message:'Success',
                profile:updateInfo
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}
exports.delete_profile_education = async (req,res,next)=>{
    try {
        const v = new Validator(req.body, {
            educationId: "required|string"
        })

        const matched = await v.check()
        if(matched){
            let profileInfo = await ProfileInformation.findOne({user: req.userInfo._id});
            if(profileInfo){
                let removeIndex = profileInfo.education.map(element=>element._id).indexOf(req.body.educationId)
                if(removeIndex >= 0){
                    profileInfo.education.splice(removeIndex,1)
                    await profileInfo.save()
                }
                // console.log(req.body.educationId, filtered,removeIndex, profileInfo.education)
                
            }
            return res.status(200).json({
                message:'Success',
                profile:profileInfo
            });
        }

        return res.status(500).json({
            message:'Invalid Input'
        });
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
            description: "required|string|minLength:3",
            current: "required|boolean",
            from: "required|date",
            to: "required|date",
        })

        console.log('here')
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
                description: req.body.description.trim(),
                current: req.body.current,
                to: req.body.to.trim()
            }
            let updateInfo = null;
            updateInfo = await ProfileInformation.findOneAndUpdate({user:req.userInfo._id},
            {
                $addToSet:{
                    experience:experience
                }
            },{new:true, upsert:true})
            return res.status(200).json({
                message:'Success',
                profile:updateInfo
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

exports.delete_profile_experience = async (req,res,next)=>{
    try {
        const v = new Validator(req.body, {
            experienceId: "required|string"
        })

        const matched = await v.check()
        if(matched){
            let profileInfo = await ProfileInformation.findOne({user: req.userInfo._id});
            if(profileInfo){
                let removeIndex = profileInfo.experience.map(element=>element._id).indexOf(req.body.experienceId)
                if(removeIndex >= 0){
                    profileInfo.experience.splice(removeIndex,1)
                    await profileInfo.save()
                }
                
            }
            return res.status(200).json({
                message:'Success',
                profile:profileInfo
            });
        }

        return res.status(500).json({
            message:'Invalid Input'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }

}

//file upload starts
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './fileServer');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-'));
    }
});

var upload = multer({ storage : storage,
    fileFilter: function (req, file, callback){
        if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'  || file.mimetype==='image/jpg'){
            callback(null, true)
        }else{
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
        }
    },limits: function (req, file, callback) {
        fileSize: 1024*1024*5 //limit of 5MB
    }
 }).single('ImageFile');


 //update user information profile image
exports.users_update_profileImage = async (req,res,next)=>{
    try {
        await upload(req,res, async function(err) {
            if(err) {
                return res.status(201).json({
                    message:"fail",
                    error:err
                });
            }
            //update - add more to images
            const updateRecord = await UserInformation.findOneAndUpdate({_id:req.userInfo._id},
                {
                    $set:{"profileImage": req.file.path}
                },{new:true})
                updateRecord.profileImage = process.env.SERVER_URL + updateRecord.profileImage
            return res.status(200).json({message:"success", profile:updateRecord});
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}



//uplaod Cover Image
exports.users_update_coverImage = async (req,res,next)=>{
    try {
        await upload(req,res, async function(err) {
            if(err) {
                return res.status(201).json({
                    message:"fail",
                    error:err
                });
            }
            //update - add more to images
            const updateRecord = await UserInformation.findOneAndUpdate({_id:req.userInfo._id},{$set:{"coverImage": req.file.path}},{new:true})
            updateRecord.coverImage = process.env.SERVER_URL + updateRecord.coverImage
            return res.status(200).json({message:"success", profile:updateRecord});
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

exports.fetch_all_profile = async (req,res,next)=>{
    try {
        let post = await ProfileInformation.find().sort({updatedAt:-1}).populate({ path: 'user', select: '_d name profileImage' })
        // console.log(post)
        return res.status(200).json({
            message:'Success',
            profiles:post
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}