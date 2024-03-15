import React, { useEffect, useState } from 'react'
import BASE_URL from '../configURL';
import { Link } from 'react-router-dom';

export default function AdminCustomer() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getApiData()
    }, []);

    const getApiData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/accounts`);
            const data = await response.json();
            if (data) {
                setUsers(data);
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    };
    return (
        <div className="product-manager">
            <div className='header__main-find'>
                <input className='header__main-find-input' placeholder='Nhập tên hoặc số điện thoại khách hàng' />
                <button className='header__main-find-button'>search</button>
            </div>
            <div className="product-table">
                <table>
                    <thead>
                        <tr>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Tài khoản</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((customer) => (
                            <tr key={customer.maKH}>
                                <td>{customer.hoten}</td>
                                <td>{customer.sodienthoai}</td>
                                <td>{customer.maTK === null ? 'Chưa đăng ký' : 'Đã đăng ký'}</td>
                                <td ><Link to={`/admin/customer/${customer.maKH}`} className='color-blue'>Xem thông tin</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
