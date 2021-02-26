const express = require('express');
const router = express.Router();


const {check_user_exist} = require ('../middlewares/checkUserExist');
const statisticController = require('../controllers/statisticController');

//route to add new user
router.get('/login', statisticController.login_stat);
// router.post('/add/phone', check_admin, dataControlllers.add_new_user);

module.exports = router;