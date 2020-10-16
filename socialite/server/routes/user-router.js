const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/get', UserCtrl.getUserById)

module.exports = router

