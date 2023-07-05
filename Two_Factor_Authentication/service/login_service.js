const User = require('../model/users');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { sendOTPByEmail } = require('../utils/email');

const OTP_EXPIRATION_TIME = 60 * 1000;

const generateOTP = async (user) => {
    const generatedOTP = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    user.otp = generatedOTP;
    user.otpExpiration = new Date(Date.now() + OTP_EXPIRATION_TIME);
    await user.save();

    return generatedOTP;
};

const clearOTP = async (user) => {
    user.otp = null;
    user.otpExpiration = null;
    await user.save();
};

const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return { error: 'User not found' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { error: 'Invalid password' };
    }

    if (!user.otp || isOTPExpired(user.otpExpiration)) {
        const generatedOTP = await generateOTP(user);

        await sendOTPByEmail(email, generatedOTP);

        setTimeout(async () => {
            await clearOTP(user);
        }, OTP_EXPIRATION_TIME);

        return { message: 'OTP sent to your email. The OTP validates upto 1 minutes only!' };
    } else {
        return { message: 'Please provide the OTP' };
    }
};

const isOTPExpired = (expirationTime) => {
    return expirationTime && expirationTime < new Date();
};

module.exports = login;
