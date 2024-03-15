const categoryService = require('../service/categoryService')
class categoryController {
    async findAll(req, res) {
        let data = await categoryService.findAll()
        res.json(data)
    }

    async create(req, res) {
        let categoryName = req.body.categoryName
        if (categoryName) {
            let result = await categoryService.create(categoryName)
            res.json(result)
        } else {
            res.json('Thất bại')
        }
    }
    async update(req, res) {
        let id = req.params.id
        let newCategoryName = req.body.newCategoryName
        if (id && newCategoryName) {
            let data = await categoryService.update(newCategoryName, id)
            res.json(data)
        } else {
            res.json("Xóa thất bại")
        }
    }
    async delete(req, res) {
        let id = req.params.id
        if (id) {
            let data = await categoryService.delete(id)
            res.json(data)
        } else {
            res.json("Xóa thất bại")
        }

    }

}
module.exports = new categoryController()