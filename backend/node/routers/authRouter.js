const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const upload = require('../middlewares/upload');

// Authentication Routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);
router.post('/send-verification-code', authController.sendVerificationCode);
router.post('/verify-verification-code', authController.verifyVerificationCode);

// File upload route for documents
router.post('/upload-documents/:userId', upload.fields([
    { name: 'document1', maxCount: 1 },
    { name: 'document2', maxCount: 1 }
]), authController.uploadDocuments);

module.exports = router;
