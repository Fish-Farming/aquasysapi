const express = require('express')
const router = express.Router()
const grangeController = require('../controller/grange')

router.post('/grange', grangeController.addGrange)
router.post('/pond', grangeController.addPond)
router.get('/ownership', grangeController.owner)
router.get('/management', grangeController.manage)
router.get('/pond/:id/:date', grangeController.pondSensors)
router.put('/grange', grangeController.updateGrange)
router.put('/pond', grangeController.updatePond)

module.exports = router