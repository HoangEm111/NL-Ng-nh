import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../configURL';

//chuyển về tiền vnđ
const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    return formatter.format(amount);
};



export default function AdminProduct() {


    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [selectedOption, setSelectedOption] = useState('');


    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null,
        quantity: ''
    });

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
    const addCategory = (event) => {
        event.preventDefault();
        console.log(categoryName)

        // Truy cập dữ liệu đã nhập trong formData và xử lý theo yêu cầu của bạn
        fetch(`${BASE_URL}/api/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryName })
        })
            .then(response => response.json())
            .then(result => {
                // Xử lý kết quả từ server
                console.log(result);
                getApiDataCategory()
                setCategoryName('')
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
        // Gửi dữ liệu đến server, thực hiện các tác vụ cần thiết, vv.
    };
    const changeCategoryName = (e) => {
        setCategoryName(e.target.value)
    }
    const deleteCategory = (id) => {
        const isConfirmed = window.confirm('Bạn có chắc muốn xóa không?');
        if (isConfirmed) {
            try {
                fetch(`${BASE_URL}/api/category/${id}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log(result);
                        getApiDataCategory()
                    })
                    .catch(error => {
                        console.error('Error:', error);

                    });
            } catch (error) {
                console.log('Đã xảy ra lỗi:', error);
            }
            console.log('Xóa thành công');
        } else {
            console.log('Hủy xóa');
        }

    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Lấy tệp ảnh từ trường input
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: file
        }));
    };
    const addProduct = (event) => {
        event.preventDefault();
        console.log(formData)
        axios.post(`${BASE_URL}/api/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                console.log(response.data);
                getApiData()
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    category: '',
                    image: null,
                    quantity: ''
                })
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
        // Gửi dữ liệu đến server, thực hiện các tác vụ cần thiết, vv.
    };
    const deleteProduct = (id, productName) => {
        const isConfirmed = window.confirm(`Bạn có chắc muốn xóa sản phẩm "${productName}" không?`);
        if (isConfirmed) {
            try {
                fetch(`${BASE_URL}/api/products/${id}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log(result);
                        getApiData()
                    })
                    .catch(error => {
                        console.error('Error:', error);

                    });
            } catch (error) {
                console.log('Đã xảy ra lỗi:', error);
            }
            console.log('Xóa thành công');
        } else {
            console.log('Hủy xóa');
        }
    }
    const filterCategory = (e) => {
        const selectId = e.target.value
        setSelectedOption(e.target.value)
        console.log(selectId)
        findProductsByCategory(selectId)
    }
    const findProductsByCategory = async (id) => {
        try {
            if (id) {
                const response = await axios.get(`${BASE_URL}/api/products/category/${id}`);
                setData(response.data);
            } else {
                getApiData()
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <div className="product-manager">
            <div className="filter-section">
                <select value={selectedOption} onChange={filterCategory}>
                    <option value="">--Chọn--</option>
                    {category.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.tenLoai}
                        </option>
                    ))
                    }
                </select>
                <div className="filter">
                    <button className="filter-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Xem danh mục</button>
                    <button className="filter-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Thêm sản phẩm</button>
                </div>
                <div className='header__main-find' style={{ display: 'inline-block', right: '0', position: 'absolute', lineHeight: '0' }}>
                    <input className='header__main-find-input' placeholder='Nhập tên sản phẩm' />
                    <button className='header__main-find-button'>search</button>
                </div>
            </div>
            <div className="product-table">
                <table>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th className='color-blue'>Sản phẩm</th>
                            <th>Loại</th>
                            <th>Kho</th>
                            <th className='color-blue'>Giá bán</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product) => (
                            <tr key={product.maSP}>
                                <td> <img style={{ width: '100px', height: '100px' }} src={`${BASE_URL}/uploads/${product.anhdaidien}`} /></td>
                                <td className='color-blue'>
                                    {product.tenSP}
                                </td>
                                <td>{product.tenLoai}</td>
                                <td>{product.soLuongCon}</td>
                                <td className='color-blue'>{formatCurrency(product.giaBan)}</td>
                                <td>
                                    <button className='color-red' type="button" onClick={() => deleteProduct(product.maSP, product.tenSP)}><i class="fa-solid fa-trash"></i></button>
                                    {/* <button type="button" ><i class="fa-solid fa-pen-to-square"></i></button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={addProduct} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm sản phẩm</h5>
                        </div>
                        <div className="modal-body">
                            <div className='input-grid'>
                                <div className="input-container">
                                    <label className="input-label">Tên sản phẩm</label>
                                    <input type="text" className="input-field" value={formData.name} name="name" onChange={handleChange} />
                                </div>
                                <div className="input-container">
                                    <label className="input-label">Hình ảnh</label>
                                    <input type="file" className="input-field" onChange={handleImageChange} name="image" />
                                </div>
                                <div className="input-container">
                                    <label className="input-label">Giá bán</label>
                                    <input type="text" className="input-field" value={formData.price} name="price" onChange={handleChange} />
                                </div>
                                <div className="input-container">
                                    <label className="input-label">Mô tả</label>
                                    <textarea type="text" className="input-field" value={formData.description} name="description" onChange={handleChange} />
                                </div>
                                <div className="input-container">
                                    <label className="input-label">Loại sản phẩm</label>
                                    <select value={formData.category} name="category" onChange={handleChange} className="form-select" aria-label="Default select example">
                                        <option>--Chọn--</option>
                                        {category.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.tenLoai}
                                            </option>
                                        ))
                                        }
                                    </select>
                                </div>
                                <div className="input-container">
                                    <label className="input-label">Số lượng</label>
                                    <input type="text" className="input-field" value={formData.quantity} name="quantity" onChange={handleChange} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-buttons">
                            <button type="button" className="modal-button close-button" data-bs-dismiss="modal">Đóng</button>
                            <button type="submit" className="modal-button save-button">Lưu</button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Danh mục sản phẩm</h5>
                        </div>
                        <form onSubmit={addCategory} className="add-category">
                            <input type="text" className="category-input" value={categoryName} name="nameCategory" onChange={changeCategoryName} placeholder="Nhập tên danh mục" />
                            <button type="submit" className="add-button">Thêm danh mục</button>
                        </form>
                        <div className="modal-body">
                            <table className="category-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên danh mục</th>
                                        <th>Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((item) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.tenLoai}</td>
                                            <td>
                                                <button className='color-red' type="button" onClick={() => deleteCategory(item.id)}><i class="fa-solid fa-trash"></i></button>
                                                {/* <button type="button" ><i class="fa-regular fa-pen-to-square"></i></button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-buttons">
                            <button type="button" className="modal-button close-button" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
