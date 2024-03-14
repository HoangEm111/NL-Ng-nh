import React from 'react'
import Nav from './Nav';
import AdminProduct from './AdminProduct';
import { Route, Routes } from 'react-router-dom';
import './css/admin.css'
import AdminOrder from './AdminOrder';
import AdminCustomer from './AdminCustomer';
import AdminCustomerDetail from './AdminCustomerDetail';



export default function AdminPage() {
    return (

        <div className="grid wide">
            <Routes>
                <Route path="/" element={<Nav />} />
                <Route path="/product" element={<AdminProduct />} />
                <Route path="/order" element={<AdminOrder />} />
                <Route path="/customer" element={<AdminCustomer />} />
                <Route path="/customer/:id" element={<AdminCustomerDetail />} />
                {/* Thêm các route con cho admin */}
            </Routes>
        </div>

    )
}

