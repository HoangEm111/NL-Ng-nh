import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

export default function AdminOrder() {

    const [data, setData] = useState([])
    const [order, setOrder] = useState([])
    const [user, SetUser] = useState({})
    const [option, setOption] = useState('')


    useEffect(() => {
        getOrders()
    }, []);

    const handleOders = async (id, trangthai) => {
        if (id === 0) {
            setOption('')
            getOrders()
        } else {
            setOption(trangthai)
            getOrdersByTT(id)
        }
    }

    const handleApproveOrder = async (id, total, fullname, phone, address) => {
        SetUser({
            maDH: id,
            tongTien: total,
            hoTen: fullname,
            soDienThoai: phone,
            diaChi: address
        })
        getOrder(id)
    }

    const getOrder = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/order/detail?id=${id}`);
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getOrders = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/order`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getOrdersByTT = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/order/tinhtrang?id=${id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const updateOrder = async (maDH, tinhTrang, thanhToan) => {
        try {
            // Thực hiện yêu cầu PUT
            const response = await axios.put(`${BASE_URL}/api/order/${maDH}`, { tinhTrang, thanhToan });
            // Xử lý kết quả từ phản hồi server
            console.log(response.data); // In ra dữ liệu phản hồi từ server
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error updating order:', error);
        }
    }

    const approveOrder = async (maDH, tinhTrang, thanhToan) => {
        await updateOrder(maDH, tinhTrang, thanhToan)
        getOrdersByTT(1)
    }

    const gotOrder = async (maDH, tinhTrang, thanhToan) => {
        const isConfirmed = window.confirm(`Đơn vị vận chuyển đã lấy đơn hàng #${maDH}`);
        if (isConfirmed) {
            await updateOrder(maDH, tinhTrang, thanhToan)
            getOrdersByTT(2)
        } else {

        }

    }


    return (
        <div className="product-manager">
            <div className='main-buttons'>
                <button className="large-button" onClick={() => handleOders(1, 'Duyệt đơn')}>
                    Chờ duyệt
                </button>
                <button className="large-button" onClick={() => handleOders(2, 'Đã lấy hàng')}>
                    Chờ lấy hàng
                </button>
                <button className="large-button" onClick={() => handleOders(3, '')}>
                    Đang giao hàng
                </button>
                <button className="large-button" onClick={() => handleOders(4, '')}>
                    Đã giao hàng
                </button>
                <button className="large-button" onClick={() => handleOders(0)}>
                    Tất cả
                </button>
            </div>
            <div className='header__main-find'>
                <input className='header__main-find-input' placeholder='Nhập tên hoặc số điện thoại khách hàng' />
                <button className='header__main-find-button'>search</button>
            </div>
            <div className="product-table">
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
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
                                <td>
                                    <h4>{item.hoten}</h4>
                                    <span>{item.sodienthoai}</span> - <span>{item.diachi}</span>
                                </td>
                                <td className='color-red'>{formatCurrency(item.tongTien)}</td>
                                <td>{formatDate(item.ngayDat)}</td>
                                <td>{item.tinhtrang}</td>
                                <td>{item.tinhTrangThanhToan === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                <td>
                                    {option === 'Duyệt đơn' ?
                                        <button className="small-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                            onClick={() => handleApproveOrder(item.maDH, item.tongTien, item.hoten, item.sodienthoai, item.diachi)}>{option}</button> : ''}
                                    {option === 'Đã lấy hàng' ?
                                        <button className="small-button" onClick={() => gotOrder(item.maDH, 3, 0)}>{option}</button> : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className='user-detail_title'>
                            <h3>Chi tiết đơn hàng - #{user.maDH}</h3>
                            <h5 style={{ fontSize: '15px', color: '#0056b3', marginTop: '15px', marginBottom: '5px' }}>Tên khách hàng: {user.hoTen}</h5>
                            <span style={{ fontSize: '13px' }}>SĐT: {user.soDienThoai}</span> - <span style={{ fontSize: '12px' }}>Nơi nhận: {user.diaChi}</span>
                        </div>

                        <div className='modal-body'>
                            <ul className='cart_product-list' style={{ width: '98%' }}>
                                {order && order.map((item, i) => (
                                    <li className='cart_product-item row'>
                                        <div className='cart_product-img-container col c-2'>
                                            <img className='cart_product-img' src={`${BASE_URL}/uploads/${item.anhdaidien}`} />
                                        </div>
                                        <div className='cart_product-information col c-8'>
                                            <div className='cart_product-information-title'>{item.tenSP}</div>
                                            {/* <div className='cart_product-information-producer'>{item.description}</div> */}
                                            <div className='cart_product-information-price' id={`item${i}`}>{formatCurrency(item.giaBan)}</div>
                                        </div>
                                        <div className='cart_product-quantity col c-2'>Số lượng: {item.soLuongSP}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='cart_product-total'>
                            <div className='cart_product-total-title'>Tổng tiền:</div>
                            <div className='cart_product-total-price' style={{ color: "red" }}>{formatCurrency(user.tongTien)}</div>
                        </div>
                        <div className="modal-buttons">
                            <button type="button" className="modal-button close-button" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" style={{ backgroundColor: '#3498db', color: '#fff' }} className="modal-button close-button" data-bs-dismiss="modal" onClick={() => approveOrder(user.maDH, 2, 0)}>Duyệt</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
