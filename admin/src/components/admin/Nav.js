import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <>
            <h1 className='title'>Danh mục quản lý</h1>
            <div class="sidebar-nav">
                <Link to='/admin/product'>
                    <img src='/img/productadmin.png' />
                    <p>Sản phẩm</p>
                </Link>
                <Link to='/admin/order'>
                    <img src='/img/order.png' />
                    <p>Đơn hàng</p>
                </Link>
                <Link to='/admin/customer'>
                    <img src='/img/customer.png' />
                    <p>Khách hàng</p>
                </Link>
                <Link to='/admin/analysis'>
                    <img src='/img/analysis.png' />
                    <p>Thống kê</p>
                </Link>
                <Link to='/admin/support'>
                    <img src='/img/support.png' />
                    <p>Hỗ trợ</p>
                </Link>
                <Link to='/admin/setting'>
                    <img src='/img/setting.png' />
                    <p>Cài đặt</p>
                </Link>
                <Link to='/admin/setting'>
                    <img src='/img/factory-machine.png' />
                    <p>Sản xuất</p>
                </Link>
            </div>
        </>
    )
}
