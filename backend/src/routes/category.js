var express = require('express')
var router = express.Router()

const categoryController = require("../app/controller/categoryController")


router.get('/', categoryController.findAll)
router.post('/', categoryController.create)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)





module.exports = router 