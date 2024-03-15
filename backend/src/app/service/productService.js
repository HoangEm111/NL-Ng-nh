const con = require('../configdb/connectDB')

class productService {

    findALl() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * 
            FROM sanpham a, loaisanpham b
            where a.maLoai = b.id;  
            ;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(tenSP, giaBan, moTa, soLuongCon, maLoai, anhdaidien) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO sanpham(tenSP, giaBan, moTa, soLuongCon, maLoai, anhdaidien)
            VALUES ('${tenSP}', '${giaBan}', '${moTa}', ${soLuongCon}, ${maLoai}, '${anhdaidien}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    update() {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE table_name
            SET column1 = value1, column2 = value2, ...
            WHERE condition;`, function (error, result, fields) {
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
            con.query(`delete from sanpham where maSP = ${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findAllByCategoryId(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * 
            FROM sanpham a, loaisanpham b
            where a.maLoai = b.id
            and a.maLoai = ${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOneById(id) {
        return new Promise((resolve, reject) => {
            con.query(`select * from sanpham where maSP = ${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }




}

module.exports = new productService()