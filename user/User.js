import React, { useState, useEffect } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import History from './History';
import Account from './Account';
import DetailOder from './DetailOder';



function User() {
    const userCurrent = JSON.parse(window.localStorage.getItem('User'));
    const [userOnline, setUserOnline] = useState(userCurrent);

    return (
        <div className='user'>
            <div className='grid wide'>
                <div className='user-form row'>
                    <div className='user-caterogy col c-3'>
                        <div className='user-caterogy_title'>Người dùng</div>
                        <ul className='user-caterogy_list'>
                            <li className='user-caterogy_item'>
                                <Link to="/user" className='user-caterogy_item-link user-profile user-current' onClick={() => {
                                    const userProfile = document.querySelector('.user-profile')
                                    const userHistory = document.querySelector('.user-history')
                                    userProfile.classList.add('user-current');
                                    userHistory.classList.remove('user-current');
                                }}>Hồ Sơ Người Dùng</Link>
                            </li>
                            <li className='user-caterogy_item'>
                                <Link to='/user/history' className='user-caterogy_item-link user-history' onClick={() => {
                                    const userProfile = document.querySelector('.user-profile')
                                    const userHistory = document.querySelector('.user-history')
                                    userProfile.classList.remove('user-current');
                                    userHistory.classList.add('user-current');
                                }}>Lịch Sử Mua Hàng</Link>
                            </li>
                            <li className='user-caterogy_item'>
                                <a href="http://localhost:3000/" className='user-caterogy_item-link' onClick={() => {
                                    window.localStorage.removeItem("User");
                                }}>Đăng xuất</a>
                            </li>
                        </ul>
                    </div>
                    <Routes>
                        <Route path='/' element={<Account userOnline={userOnline} />} />
                        <Route path='/history' element={<History userOnline={userOnline} />} />
                        <Route path='/orderDetail' element={<DetailOder />} />
                    </Routes>
                </div>
            </div>
        </div >
    );
}

export default User;