import React, { useEffect, useLayoutEffect, useState } from 'react';
import BASE_URL from '../configURL';
import axios from 'axios';
import { Routes, Route, Link, Router } from "react-router-dom";


//chuyển về tiền vnđ
const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    return formatter.format(amount);
};


function Homepage() {

    const [data, setData] = useState([])
    const [category, setCategory] = useState([])


    useEffect(() => {
        getApiData()
        getApiDataCategory()

    }, []);

    const getApiData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/products`);
            const data = await response.json();
            if (data) {
                setData(data);

            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }

    };
    const getApiDataCategory = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/category`);
            const data = await response.json();
            if (data) {
                setCategory(data);
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }
    };
    const findProductsByCategory = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/products/category/${id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <div className="main">
            <div className="grid wide">
                <div className='row'>
                    <div className='caterory col c-3'>
                        <ul className='caterory-list'>
                            <div className='caterory-title'>Danh mục sản phẩm</div>
                            {category.map((item) => (
                                <li key={item.id} className='caterory-item' onClick={() => findProductsByCategory(item.id)}>
                                    {item.tenLoai}
                                    <i class="fa-solid fa-square-caret-down caterory-item-icon"></i>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='product col c-9'>
                        <ul className='product-list row'>
                            {data.map(product => (
                                <Link to={`/product/${product.maSP}`} className='product-item c-2-4'>
                                    <img className='product-item_img' src={`${BASE_URL}/uploads/${product.anhdaidien}`}></img>
                                    <div className='product-item_information'>
                                        <div className='product-item_name'>{product.tenSP}</div>
                                        <div className='product-item_description'>{product.moTa}</div>
                                        <div className='product-item_price'>{formatCurrency(product.giaBan)}</div>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;