const mongoose = require('mongoose');
let validator = require('validator')

//list of contents shared to you
const experiences = mongoose.Schema({
    title: {type: String, default:null},
    company:{type:String, default:null},
    location:{type: String, default:null},
    description:{type: String, default:null},
    current:{type:Boolean, default:false},
    from:{type:Date, default:null},
    to:{type:Date, default:null}
});

const education = mongoose.Schema({
    school: {type: String, default:null},
    degree:{type:String, default:null},
    fieldOfStudy:{type: String, default:null},
    description:{type: String, default:null},
    from:{type:Date, default:null},
    to:{type:Date, default:null},
    current:{type:Boolean, default:false},
});

const social = mongoose.Schema({
    youtube: {type: String, default:null},
    twitter:{type:String, default:null},
    facebook:{type: String, default:null},
    linkedin:{type: String, default:null},
    instagram:{type: String, default:null}
});


const profileInformation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'UsersInformations'},
    education:{type:[education]},
    experience:{type:[experiences]},
    social:{type:social},
    skills:{type:[String]},
    status:{type:String, default:null},
    location:{type:String, trim:true,default:null},
    website:{type:String, trim:true,default:null},
    company:{type:String, trim:true,default:null},
    bio:{type:String, trim:true,default:null},
    githubUserName:{type:String, trim:true,default:null},
    active:{type:Boolean, default:false}, //account is not active till user verify email
    deleted:{type:Boolean, default:false} //account is deactivated till user verify email
},{timestamps: true});

// profileInformation.virtual('userInfo', {
//     ref: 'UsersInformations',
//     localField: 'user',
//     foreignField: '_id'
// });
const ProfileInformation = mongoose.model('ProfileInformations',profileInformation);
module.exports = ProfileInformation;