require('dotenv').config();
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator')
var multer = require('multer');


const UserInformation = require('../models/users');
const ProfileInformation = require('../models/profile');
const Post = require('../models/post');
const e = require('express');

exports.create_post = async (req,res,next)=>{
    try {
        console.log(req.body)
        const v = new Validator(req.body, {
            text: "required|string|minLength:6",
            title: "required|string|minLength:6"
        })

        const matched = await v.check()
        if(!matched){
            return res.status(412).json({
                message:'Invalid Data Input'
            });
        }else{
           const post = new Post({
                _id : mongoose.Types.ObjectId(),
                user:req.userInfo._id,
                text :req.body.text.trim(),
                title :req.body.title.trim()
            });
            let newPost = await  post.save()
            return res.status(200).json({
                message:'Success',
                newPost
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

// db.inventory.find( { 
    $and: 
    // [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )

exports.delete_a_post = async (req,res,next)=>{
    try {
        console.log(req.params)
        const v = new Validator(req.params, {
            postId: "required|string|minLength:6"
        })
        const matched = await v.check()
        if(matched){
            let post = await Post.findById(req.params.postId)
            //must be your post
            if(post.user.toString()==req.userInfo._id.toString()){
                //update the post to delete true
                await Post.findOneAndUpdate({_id:req.params.postId},{$set:{"deleted": true}})
                return res.status(200).json({
                    message:'Deleted'
                });
            }
        }
        return res.status(422).json({
            message:'Not Authorize'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            post:[]
        });
    }
}

exports.fetch_a_post = async (req,res,next)=>{
    try {
        console.log(req.params)
        const v = new Validator(req.params, {
            postId: "required|string|minLength:6"
        })

        let post={}
        const matched = await v.check()
        if(matched){
            post = await Post.findOne({
                $and:[
                    {_id: req.params.postId},
                    {deleted:false}
                ]}).sort({updatedAt:-1})
        }
        return res.status(200).json({
            message:'Success',
            post
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            post:[]
        });
    }
}

exports.like_a_post = async (req,res,next)=>{
    try {
        console.log(req.params)
        const v = new Validator(req.params, {
            postId: "required|string|minLength:6"
        })
        const matched = await v.check()
        if(matched){
                let post = await Post.findById(req.params.postId)
                let ifExist = post.likes.filter(ele =>ele.user.toString() === req.userInfo._id.toString())
                if(ifExist.length <= 0){
                    post.likes.unshift({user:req.userInfo._id})
                    post.save()
                    return res.status(200).json({
                        message:'Liked',
                        likes:post.likes
                    });
                }else{
                    return res.status(200).json({
                        message:'Liked',
                        likes:post.likes
                    });
                }
        }
        return res.status(200).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail'
        });
    }
}
exports.unlike_a_post = async (req,res,next)=>{
    try {
        console.log(req.params)
        const v = new Validator(req.params, {
            postId: "required|string|minLength:6"
        })
        const matched = await v.check()
        if(matched){
                let post = await Post.findById(req.params.postId)
                let removeIndex = post.likes.map(ele => ele.user).indexOf(req.userInfo._id)
                if(removeIndex >= 0){
                    post.likes.shift(removeIndex, 1)
                    post.save()
                }
                
                return res.status(200).json({
                    message:'Liked',
                    likes:post.likes
                });
        }
        return res.status(200).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail'
        });
    }
}

exports.add_a_comment = async (req,res,next)=>{
    try {
        console.log(req.params)
        const v = new Validator(req.body, {
            postId: "required|string|minLength:6",
            comment: "required|string|minLength:6",
        })
        const matched = await v.check()
        if(matched){
            let comment = {
                user:req.userInfo._id,
                comment:req.body.comment.trim()
            }
            let post = await Post.findById(req.body.postId)
            post.comments.unshift(comment)
            post.save()
            return res.status(200).json({
                message:'success',
                comments:post.comments
            });
        }
        return res.status(200).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail'
        });
    }
}

exports.remove_a_comment = async (req,res,next)=>{
    try {
        console.log(req.params)
        const v = new Validator(req.body, {
            postId: "required|string|minLength:6",
            commentId: "required|string|minLength:6",
        })
        const matched = await v.check()
        if(matched){
            let post = await Post.findById(req.body.postId)
            let removeIndex = post.comments.map(ele => ele._id).indexOf(req.body.commentId)
            console.log(removeIndex)
            if(removeIndex >= 0){
                post.comments.shift(removeIndex, 1)
                post.save()
            }
            return res.status(200).json({
                message:'success',
                comments:post.comments
            });
        }
        return res.status(200).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail'
        });
    }
}
exports.fetch_all_post = async (req,res,next)=>{
    try {
        console.log(req.body)
        const v = new Validator(req.params, {
            postId: "required|string|minLength:6"
        })

        let post=null
        const matched = await v.check()
        if(matched){
            post = Post.find({deleted:false}).sort({updatedAt:-1})
        }
        return res.status(200).json({
            message:'Success',
            post
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}