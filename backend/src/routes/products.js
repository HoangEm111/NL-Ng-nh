var express = require('express')
var router = express.Router()

const products = require("../app/controller/productController")

const multer = require('multer');
const upload = multer({ dest: './src/public/uploads/' })


router.get('/:id', products.findOneById)
router.get('/category/:id', products.findAllByCategoryId)
router.get('/', products.findAll)
router.post('/', upload.single('image'), products.create)
router.put('/:id', products.findAll)
router.delete('/:id', products.delete)





module.exports = router 