const con = require('../configdb/connectDB')

class categoryService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM loaisanpham;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(categoryName) {
        return new Promise((resolve, reject) => {
            con.query(`insert into loaisanpham(tenLoai) value ('${categoryName}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    update(newCategoryName, id) {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE loaisanpham
            SET tenLoai = '${newCategoryName}'
            WHERE id = ${id};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            con.query(`delete from loaisanpham where id = ${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }


}

module.exports = new categoryService()