const express = require('express')

const router = express.Router()

//require

const createUser = require('../controller/create_user_controller')

const login = require('../controller/login_controller')

const verifyOTP = require('../controller/2FA_controller')

//routers

router.post('/api/create', createUser)

router.post('/api/login', login)

router.post('/api/verifyOTP', verifyOTP)

module.exports = router