const con = require('../configdb/connectDB')

class orderService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`select a.*, b.phuongthuc, c.tinhtrang, d.hoten, d.diachi, d.sodienthoai
            from donhang a 
            inner join phuongthucthanhtoan b
            on a.phuongthucthanhtoan = b.id
            inner join tinhtrangdonhang c
            on a.tinhtrangdonhang = c.id
            inner join khachhang d
            on a.maKH = d.maKH
            ORDER BY maDH DESC;
            `, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }



    // findOneByPhoneNumber(phoneNumber) {
    //     return new Promise((resolve, reject) => {
    //         con.query(`select * from khachhang where sodienthoai = ${phoneNumber};`, function (error, result, fields) {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(result);
    //         });
    //     })
    // }

    createOrder(tongTien, tinhTrangThanhToan, maKH, phuongthucthanhtoan) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO donhang(tongTien, tinhTrangThanhToan, maKH, phuongthucthanhtoan, tinhtrangdonhang) 
            VALUES (${tongTien}, ${tinhTrangThanhToan}, ${maKH}, ${phuongthucthanhtoan}, 1);`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOrderId() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT LAST_INSERT_ID() as id;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createOrderDetail(maSP, maDH, soLuong) {
        return new Promise((resolve, reject) => {
            con.query(`insert into chitietdonhang values(${maSP}, ${maDH}, ${soLuong});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOneById(maDH) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT a.maDH, a.soLuongSP, b.tenSP, b.giaBan,b.anhdaidien
            FROM chitietdonhang a
            inner join sanpham b 
            on a.maSP = b.maSP
            and a.maDH = ${maDH} ;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    update(tinhTrang, thanhToan, maDH) {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE donhang
            SET tinhtrangdonhang = ${tinhTrang}, tinhTrangThanhToan = ${thanhToan}
            WHERE maDH = ${maDH};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findAllByCustomerId(maKH) {
        return new Promise((resolve, reject) => {
            con.query(`select a.maDH, a.ngayDat, a.tongTien, a.maKH, a.tinhtrangthanhtoan, b.phuongthuc, c.tinhtrang, c.id as idTT
            from donhang a 
            inner join phuongthucthanhtoan b
            on a.phuongthucthanhtoan = b.id
            inner join tinhtrangdonhang c
            on a.tinhtrangdonhang = c.id
            and a.maKH = ${maKH} ORDER BY maDH DESC;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findAllByTinhTrangId(id) {
        return new Promise((resolve, reject) => {
            con.query(`select a.*, b.phuongthuc, c.tinhtrang, d.hoten, d.diachi, d.sodienthoai
            from donhang a 
            inner join phuongthucthanhtoan b
            on a.phuongthucthanhtoan = b.id
            inner join tinhtrangdonhang c
            on a.tinhtrangdonhang = c.id
            inner join khachhang d
            on a.maKH = d.maKH
            where c.id = ${id}
            ORDER BY maDH DESC;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }



}

module.exports = new orderService()