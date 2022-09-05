const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.post('/auth', userController.userAuth)
router.get('/user', userController.userInfo)
router.put('/user', userController.userUpdate)
router.use((req, res)=> {
  console.log('Invalid access~')
  res.status(404).send({'code': 404, 'desc': 'Endpoint not found'})
})


module.exports = router