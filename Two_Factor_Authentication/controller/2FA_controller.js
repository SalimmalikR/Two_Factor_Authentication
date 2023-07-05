const verifyOTPService = require('../service/2FA_service');
const CustomError = require('../utils/cuserr');
const verifyOTP = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        const result = await verifyOTPService(email, otp);
        if (result.error) {
            const err = new CustomError(401, result.error);
            return next(err);
        } else {
            return res.status(200).json({
                statuscode: 200,
                status: 'success',
                message: result.message,
                token: result.token,
            });
        }
    } catch (error) {
        const err = new CustomError(500, error.message);
        return next(err);
    }
};
module.exports = verifyOTP;
