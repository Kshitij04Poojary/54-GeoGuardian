const express=require('express');
const authController=require('../controllers/authController')
const router=express.Router();
const {identifier}=require('../middlewares/identification')

router.post('/signup',authController.signup)
router.post('/signin',authController.signin)
router.post('/signout',authController.signout)

router.patch('/send-verification-code',identifier, authController.sendVerificationCode)
router.patch('/verify-verification-code',identifier, authController.verifyVerificationCode)

module.exports=router;