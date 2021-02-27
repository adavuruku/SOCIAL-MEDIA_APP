const mongoose = require('mongoose');
let validator = require('validator')

//list of contents shared to you
const comment = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'UsersInformations'},
    comment:{type:String, default:null},
    commentDate:{type: Date, default:Date.now()}
});

const post = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'UsersInformations'},
    comments:{type:[comment]},
    likes:[{
        user:{type: mongoose.Schema.Types.ObjectId, ref: 'UsersInformations'},
        likeDate:{type: Date, default:Date.now()}
    }],
    text:{type:String, required:true},
    title:{type:String, required:true},
    deleted:{type:Boolean, default:false} 
},{timestamps: true});

const Post = mongoose.model('Post',post);
module.exports = Post;