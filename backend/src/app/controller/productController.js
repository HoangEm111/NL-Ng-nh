const productService = require('../service/productService')


class products {
    async findAll(req, res) {
        let data = await productService.findALl()
        res.json(data)
    }

    async create(req, res) {
        let product = req.body
        let avatar = req.file.filename
        if (product) {
            let data = await productService.create(product.name, product.price, product.description,
                product.quantity, product.category, avatar)
            res.json(data)
        } else {
            res.json('Thất bại')
        }
    }
    async update(req, res) {
        let data = await productService.update()
        res.json(data)
    }
    async delete(req, res) {
        let id = req.params.id
        if (id) {
            let data = await productService.delete(id)
            res.json(data)
        } else {
            res.json("Xóa thất bại")
        }
    }
    async findAllByCategoryId(req, res) {
        let categoryId = req.params.id
        let data = await productService.findAllByCategoryId(categoryId)
        res.json(data)
    }

    async findOneById(req, res) {
        let id = req.params.id
        let data = await productService.findOneById(id)
        res.json(data)
    }

}

module.exports = new products()