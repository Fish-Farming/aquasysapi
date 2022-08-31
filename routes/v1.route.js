const express = require('express')
const router = express.Router()
const userRoute = require('./user.route')
const fishRoute = require('./fish.route')


router.use(userRoute)
router.use(fishRoute)

router.use((req, res)=> {
  console.log('Invalid access~')
  res.status(404).send({'code': 404, 'desc': 'Endpoint not found'})
})

module.exports = router