const express = require('express');
const router = express.Router();

// TraceView
// Load Testing with Siege
// Query Optimization
// MySQL Server Configuration
// De-normalization and Constraints
// Nginx Configuration

const {check_user_exist, account_active} = require ('../middlewares/checkUserExist');
const postController = require('../controllers/postController');

//route to add new user
router.post('/new', account_active, postController.create_post);
router.get('/:postId', account_active, postController.fetch_a_post);
router.delete('/:postId', account_active, postController.delete_a_post);
router.put('/like/:postId', account_active, postController.like_a_post);
router.put('/unlike/:postId', account_active, postController.unlike_a_post);

router.put('/add/comment', account_active, postController.add_a_comment);
router.delete('/remove/comment', account_active, postController.remove_a_comment);

router.get('/all', account_active, postController.fetch_all_post);



// router.post('/login', userController.user_login);
// router.get('/me',account_active, userController.my_profile);
// router.patch('/update/profile', account_active, userController.update_profile);
// router.patch('/add/education', account_active, userController.update_profile_education);
// router.delete('/delete/education', account_active, userController.delete_profile_education);

// router.patch('/add/experience', account_active, userController.update_profile_experience);
// router.delete('/delete/experience', account_active, userController.delete_profile_experience);

// router.patch('/update/image', account_active, userController.users_update_profileImage);
// router.patch('/update/cover', account_active, userController.users_update_coverImage);

 
// router.post('/update/profilepic', account_active, userController.user_update_profile_pics);
// router.post('/update/coverimage', account_active, userController.user_update_profile_wallpaper);
// router.post('/update/profile', account_active, userController.update_profile);
// router.post('/update/interest', account_active, userController.update_profile_interest);
// router.post('/update/socialnetwork', account_active, userController.update_profile_social_network);
// router.get('/add/friends', account_active, userController.add_friend);
// router.get('/add/follow', account_active, userController.add_follower);
// router.post('/add/phone', check_admin, dataControlllers.add_new_user);

module.exports = router;