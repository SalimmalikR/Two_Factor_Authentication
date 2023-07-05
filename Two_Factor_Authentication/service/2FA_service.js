const User = require('../model/users');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/cuserr');

const verifyOTP = async (email, otp) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return { error: 'User not found' };
        }

        if (!otp || user.otp !== otp) {
            return { error: 'Invalid OTP' };
        }

        user.otp = null;
        await user.save();

        const token = generateJWTToken(user.email);
        return {
            message: 'OTP verified successfully! You have successfully logged in.',
            token: token,
        };
    } catch (error) {
        const err = new CustomError(500, error.message);
        return next(err);
    }
};

const generateJWTToken = (email) => {
    const secretKey = 'secretKey';
    const token = jwt.sign({ email }, secretKey);
    return token;
};

module.exports = verifyOTP;
