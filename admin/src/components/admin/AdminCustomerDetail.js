import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
export default function AdminCustomerDetail() {
    const { id } = useParams()

    const [user, setUser] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        getApiData(id)
        getOrders(id)
    }, []);

    const getApiData = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/accounts/${id}`);
            const data = await response.json();
            if (data) {
                setUser(data);
                console.log(data)
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    };

    const getOrders = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/order/history?id=${id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (

        <div className='grid wide'>
            <div className="product-manager">
                {user[0] && <div className='user-detail col c-12'>
                    <div className='user-detail_title'>Thông tin khách hàng</div>
                    <div className='row'>
                        <div className='user-detail_label-list col c-3' style={{ textAlign: 'center' }}>
                            <img style={{ width: '150px', margin: '50px auto' }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png'></img>
                        </div>
                        <div className='user-detail_label-list col c-2' >
                            <div className='user-detail_label-item'>Họ và tên:</div>
                            <div className='user-detail_label-item'>Số điện thoại:</div>
                            <div className='user-detail_label-item'>Địa chỉ:</div>
                            <div className='user-detail_label-item'>Giới tính:</div>
                            <div className='user-detail_label-item'>Năm sinh:</div>
                            <div className='user-detail_label-item'>Tài khoản:</div>
                        </div>
                        <div className='user-detail_info-list col c-7'>
                            <div className='user-detail_info-item'>{user[0].hoten ? user[0].hoten : 'Chưa xác định'}</div>
                            <div className='user-detail_info-item'>{user[0].sodienthoai ? user[0].sodienthoai : 'Chưa xác định'}</div>
                            <div className='user-detail_info-item'>{user[0].diachi ? user[0].diachi : 'Chưa xác định'}</div>
                            <div className='user-detail_info-item'>
                                {user[0].gioitinh === 1 ? 'Nam' : 'Nữ'}
                            </div>
                            <div className='user-detail_info-item'>{user[0].namsinh ? user[0].namsinh : 'Chưa xác định'}</div>
                            <div className='user-detail_info-item'>
                                {user[0].maTK === null ? 'Chưa đăng ký' : 'Đã đăng ký'}
                            </div>
                        </div>
                    </div>
                </div>}
                <div className='user-detail col c-12' style={{ marginTop: '20px' }}>
                    <div className='user-detail_title'>Lịch sử đơn hàng</div>

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
                                        <td>{item.phuongthuc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>

    )
}
