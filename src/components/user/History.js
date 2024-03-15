import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BASE_URL from '../configURL';
import axios from 'axios';
import { format, utcToZonedTime } from 'date-fns-tz';

// Hàm chuyển đổi định dạng ngày tháng
const formatDate = (isoDate) => {
    const vietnamTimezone = 'Asia/Ho_Chi_Minh'; // Múi giờ Việt Nam
    const zonedDate = utcToZonedTime(isoDate, vietnamTimezone);
    return format(zonedDate, "HH:mm:ss dd/MM/yyyy");
};


//chuyển về tiền vnđ
const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    return formatter.format(amount);
};

function History(props) {
    const { userOnline } = props
    const [data, setData] = useState([])

    useEffect(() => {
        getOrders(userOnline.id)
    }, []);

    const getOrders = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/order/history?id=${id}`);
            setData(response.data);
            console.table(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className='user-detail col c-9'>
            <div className='user-detail_title'>Lịch sử mua hàng</div>
            <div className="product-table" style={{ marginBottom: '20px' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Tổng tiền</th>
                            <th>Ngày đặt</th>
                            <th>Tình trạng đơn</th>
                            <th>Thanh toán</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(item => (
                            <tr key={item.maDH}>
                                <td>{item.maDH}</td>
                                <td>{formatCurrency(item.tongTien)}</td>
                                <td>{formatDate(item.ngayDat)}</td>
                                <td>{item.tinhtrang}</td>
                                <td>{item.tinhtrangthanhtoan === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                <td><Link to={`/user/orderDetail?id=${item.maDH}&total=${item.tongTien}&tinhTrang=${item.idTT}`} className='color-blue'>Xem chi tiết</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default History;
