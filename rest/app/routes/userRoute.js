const express = require('express');
const router = express.Router();


const {check_user_exist, account_active, auth_header} = require ('../middlewares/checkUserExist');
const userController = require('../controllers/userController');
const UserInformation = require('../models/users');

router.get('/auth', auth_header, async (req,res, next)=>{
    console.log(req.userInfo)
    try {
        const user = await UserInformation.findOne({_id:req.userInfo._id}).select('-password -__v')
        console.log(user)
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})
//route to add new user
router.post('/register', check_user_exist, userController.add_new_user);
router.post('/login', userController.user_login);
router.get('/me',account_active, userController.my_profile);
router.patch('/update/profile', account_active, userController.update_profile);
router.patch('/add/education', account_active, userController.update_profile_education);
router.delete('/delete/education', account_active, userController.delete_profile_education);

router.patch('/add/experience', account_active, userController.update_profile_experience);
router.delete('/delete/experience', account_active, userController.delete_profile_experience);

router.patch('/update/image', account_active, userController.users_update_profileImage);
router.patch('/update/cover', account_active, userController.users_update_coverImage);

 
// router.post('/update/profilepic', account_active, userController.user_update_profile_pics);
// router.post('/update/coverimage', account_active, userController.user_update_profile_wallpaper);
// router.post('/update/profile', account_active, userController.update_profile);
// router.post('/update/interest', account_active, userController.update_profile_interest);
// router.post('/update/socialnetwork', account_active, userController.update_profile_social_network);
// router.get('/add/friends', account_active, userController.add_friend);
// router.get('/add/follow', account_active, userController.add_follower);
// router.post('/add/phone', check_admin, dataControlllers.add_new_user);

module.exports = router;