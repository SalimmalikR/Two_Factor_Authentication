const User = require('../model/users');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/cuserr');

const createUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        return res.status(200).json({
            statuscode: 200,
            status: 'success',
            message: 'User created successfully',
            user: user
        });
    } catch (error) {
        console.error('Error creating user:', error);
        const err = new CustomError(500, error.message);
        return next(err);
    }
};

module.exports = createUser;
