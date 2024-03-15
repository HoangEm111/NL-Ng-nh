const accountService = require('../service/accountService')
class accountController {
    async findAll(req, res) {
        let data = await accountService.findAll()
        res.json(data)
    }

    async create(req, res) {
        let account = req.body
        if (account) {
            await accountService.createCustomer(account.name, account.address, account.gender,
                account.yob, account.phone)
            let customer = await accountService.findOneByPhoneNumber(account.phone)
            await accountService.createAccount(account.phone, account.passwd, customer[0].maKH)
            res.json(customer)
        } else {
            res.json('Thất bại')
        }
    }

    async findOneById(req, res) {
        let id = req.params.id
        let data = await accountService.findOneById(id)
        res.json(data)
    }
    // async update(req, res) {
    //     let id = req.params.id
    //     let newCategoryName = req.body.newCategoryName
    //     if (id && newCategoryName) {
    //         let data = await accountService.update(newCategoryName, id)
    //         res.json(data)
    //     } else {
    //         res.json("Xóa thất bại")
    //     }
    // }
    // async delete(req, res) {
    //     let id = req.params.id
    //     if (id) {
    //         let data = await accountService.delete(id)
    //         res.json(data)
    //     } else {
    //         res.json("Xóa thất bại")
    //     }

    // }

}
module.exports = new accountController()