const loginService = require('../service/login_service');
const CustomError = require('../utils/cuserr');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await loginService(email, password);

    if (result.error) {
      const err = new CustomError(401, result.error);
      return next(err);
    } else {
      return res.status(200).json({
        statuscode:200,
        status:'success',
        message: result.message
      });
    }
  } catch (error) {
    console.log(error);
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = login;
