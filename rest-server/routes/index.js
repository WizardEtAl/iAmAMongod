const express = require('express');
const router = express.Router();
const Usercontroller = require('./controllers/UserController');

router.route('/user/signup')
  .post(Usercontroller.SignUp)

router.route('/user/login/:username/:password')
  .get(Usercontroller.Login)

module.exports = router;