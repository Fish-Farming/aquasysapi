const express = require('express')
const router = express.Router()
const fishController = require('../controller/fish')

router.post('/fish', fishController.add)
router.get('/fish', fishController.listAll)
router.get('/fish/:id', fishController.list)
router.put('/fish', fishController.update)
/*router.use((req, res)=> {
  console.log('Invalid access~')
  res.status(404).send({'code': 404, 'desc': 'Endpoint not found'})
})*/


module.exports = router