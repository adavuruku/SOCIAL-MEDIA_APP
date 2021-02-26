const mongoose = require('mongoose');
let validator = require('validator')

//list of contents shared to you
const sharedToMe = mongoose.Schema({
    contentsId: {type: mongoose.Schema.Types.ObjectId, ref: 'Contents'},
    sharedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'UserInformation'},
    dateShared:{type:Date, default:Date.now()}
});

const userInformation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password:{type:String, trim:true, required:true},
    fullName:{type:String, trim:true,required:true},
    profileImage:{type:String, trim:true,default:null},
    coverImage:{type:String, trim:true,default:null}
},{timestamps: true});

const UserInformation = mongoose.model('UsersInformations',userInformation);
module.exports = UserInformation;