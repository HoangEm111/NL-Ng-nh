var express = require('express')
var router = express.Router()

const orderController = require("../app/controller/orderController")


router.get('/history', orderController.findAllByCustomerId)
router.get('/detail', orderController.findOneById)
router.get('/tinhtrang', orderController.findAllByTinhTrangId)
router.get('/', orderController.findAll)
router.post('/', orderController.create)
router.put('/:id', orderController.updateTT)
// router.delete('/:id', orderController.delete)





module.exports = router 