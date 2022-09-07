const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.post('/auth', userController.userAuth)
router.get('/user', userController.userInfo)
router.put('/user', userController.userUpdate)



module.exports = router