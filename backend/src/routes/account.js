var express = require('express')
var router = express.Router()

const accountController = require("../app/controller/accountController")

router.get('/:id', accountController.findOneById)
router.get('/', accountController.findAll)
router.post('/', accountController.create)
// router.put('/:id', accountController.update)
// router.delete('/:id', accountController.delete)





module.exports = router 