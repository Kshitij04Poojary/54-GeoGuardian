const { signupSchema, signinSchema, acceptCodeSchema } = require("../middlewares/validator");
const User = require('../models/usersModel');
const { doHash, doHashValidation, hmacProcess } = require("../utils/hashing");
const jwt = require('jsonwebtoken')
const transport = require('../middlewares/sendMail');

exports.signup = async (req, res) => {
    const { email, password, phone } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password });

        if (!phone) {
            return res.status(400).json({ error: "Phone number is required." });
        }

        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already exists!" });
        }

        const hashedPassword = await doHash(password, 12);
        const newUser = new User({
            email,
            password: hashedPassword,
            phone, // Add phone to the newUser object
        });

        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({
            success: true,
            message: "Your account has been created successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signinSchema.validate({ email, password });
        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message })
        }
        const existingUser = await User.findOne({ email }).select('+password')
        if (!existingUser) {
            return res.status(401).json({ success: false, message: "User does not exists!" })
        }
        const result = await doHashValidation(password, existingUser.password)
        if (!result) {
            return res.status(401).json({ success: false, message: "Invalid credetials!" })
        }
        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified
        }, process.env.TOKEN_SECRET,
            {
                expiresIn: '24h',
            })

        res.cookie('Authorization', token, {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production'
        })
            .json({
                success: true,
                token,
                message: "logged in successfully"
            })
    } catch (error) {
        console.log(error)
    }
}

exports.signout = async (req, res) => {
    res.clearCookie('Authorization').status(200).json({ success: true, message: 'logged out successfully' })
}

exports.sendVerificationCode = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exists!" })
        }
        if (existingUser.verified) {
            return res.status(400).json({ success: false, message: "You are already verified" })
        }
        const codeValue = Math.floor(Math.random() * 1000000).toString()
        let info = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: existingUser.email,
            subject: "verification code",
            html: '<h1>' + codeValue + '</h1>'
        })
        // console.log(info)
        if (info.accepted[0] == existingUser.email) {
            const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)
            existingUser.verificationCode = hashedCodeValue;
            existingUser.verificationCodeValiation = Date.now();
            await existingUser.save()
            return res.status(200).json({ success: true, message: "Code sent!" })
        }
        res.status(400).json({ success: false, message: 'Code sent failed!' })
    } catch (error) {
        console.log(error);
    }
}

exports.verifyVerificationCode = async (req, res) => {
    const { email, providedCode } = req.body;
    try {
        const { error, value } = acceptCodeSchema.validate({ email, providedCode });
        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message })
        }
        const codeValue = providedCode.toString();
        const existingUser = await User.findOne({ email }).select("+verificationCode +verificationCodeValidation")
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exists!" })
        }
        if (existingUser.verified) {
            return res.status(400).json({ success: false, message: "you are already verified!" })
        }
        // console.log(existingUser.verificationCode,existingUser.verificationCodeValidation)
        if (!existingUser.verificationCode && !existingUser.verificationCodeValidation) {
            return res
                .status(400)
                .json({ success: false, message: 'something is wrong with the code!' });
        }
        if (Date.now() - existingUser.verificationCodeValidation > 5 * 60 * 1000) {
            return res.status(400).json({ success: false, message: "Code has been expired" });
        }
        const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)
        // console.log(hashedCodeValue)
        // console.log(existingUser.verificationCode)
        if (hashedCodeValue === existingUser.verificationCode) {
            existingUser.verified = true;
            existingUser.verificationCode = undefined;
            existingUser.verificationCodeValiation = undefined;
            await existingUser.save();
            return res.status(200).json({ success: true, message: "Your account has been verified" })
        }
        return res.status(400).json({ success: false, message: "An unexpected error occured" })

    } catch (error) {
        console.log(error);
    }
}