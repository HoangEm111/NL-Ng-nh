import React, { useState, useEffect } from 'react';
import BASE_URL from '../configURL';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Register() {

    const [data, setData] = useState([])
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        gender: '',
        yob: '',
        passwd: '',
        repasswd: ''
    });

    useEffect(() => {
        getApiData()
        const infor = document.querySelector('.register-infor')
        const phone = document.querySelector('.register-infor_phone')
        const name = document.querySelector('.register-infor_name')
        const address = document.querySelector('.register-infor_address')
        const yob = document.querySelector('.register-infor_yob')
        const gender = document.querySelector('.register-infor_gender')

        const regis_App = document.querySelector('.register-app')
        const passwd = document.querySelector('.register-app_passwd')
        const repasswd = document.querySelector('.register-app_repasswd')

        const upHandleIF = () => {
            infor.classList.add('up');
            regis_App.classList.remove('up');
        }

        const upHandleApp = () => {
            regis_App.classList.add('up');
            infor.classList.remove('up');
        }

        phone.addEventListener("focus", upHandleIF);
        name.addEventListener("focus", upHandleIF);
        address.addEventListener("focus", upHandleIF);
        address.addEventListener("focus", upHandleIF);
        yob.addEventListener("focus", upHandleIF);
        gender.addEventListener("focus", upHandleIF);
        passwd.addEventListener("focus", upHandleApp);
        repasswd.addEventListener("focus", upHandleApp);

    }, [])

    const getApiData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/accounts`);
            const data = await response.json();
            if (data) {
                setData(data);
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const addAccount = (event) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].soDienThoai === formData.phone) {
                alert("Rất tiếc! Số điện thoại đã được đăng ký.");
                return;
            }
        }
        if (formData.passwd !== formData.repasswd) {
            alert("Mật khẩu không trùng khớp");
        } else {
            event.preventDefault();
            console.log(formData)
            axios.post(`${BASE_URL}/api/accounts`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // Xử lý kết quả từ server
                    console.log(response.data);
                    setIsSignUp(true);
                })
                .catch(error => {
                    // Xử lý lỗi
                    console.error(error);
                });
            // Gửi dữ liệu đến server, thực hiện các tác vụ cần thiết, vv.
        }
    };


    return (
        <div className="Register">
            <div className='grid wide'>
                <form onSubmit={addAccount} className='register-form' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className='row'>
                        <div className='register-infor col c-6'>
                            <div className='register-infor_title'>THÔNG TIN CÁ NHÂN</div>
                            <input className='register-infor_phone' placeholder='Nhập số điện thoại' required pattern='^[0-9]{10,11}$' value={formData.phone} name="phone" onChange={handleChange}></input>
                            <input type="text" className='register-infor_name' placeholder='Nhập họ và tên' required value={formData.name} name="name" onChange={handleChange}></input>
                            <input type="text" className='register-infor_address' placeholder='Nhập địa chỉ' required value={formData.address} name="address" onChange={handleChange}></input>
                            <select className="register-infor_yob" value={formData.yob} name="yob" onChange={handleChange}>
                                <option defaultValue={""}>Năm sinh</option>
                                <option value="1990">1990</option>
                                <option value="1991">1991</option>
                                <option value="1992">1992</option>
                                <option value="1993">1993</option>
                                <option value="1994">1994</option>
                                <option value="1995">1995</option>
                                <option value="1996">1996</option>
                                <option value="1997">1997</option>
                                <option value="1998">1998</option>
                                <option value="1999">1999</option>
                                <option value="2000">2000</option>
                                <option value="2001">2001</option>
                                <option value="2002">2002</option>
                                <option value="2003">2003</option>
                                <option value="2004">2004</option>
                                <option value="2005">2005</option>
                                <option value="2006">2006</option>
                                <option value="2007">2007</option>
                                <option value="2008">2008</option>
                                <option value="2009">2009</option>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                                <option value="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                            </select>
                            <select className="register-infor_gender" value={formData.gender} name="gender" onChange={handleChange}>
                                <option defaultValue={""}>Giới tính</option>
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </select>
                        </div>
                        <div className='register-app col c-6'>
                            <div className='register-app_title'>THÔNG TIN ĐĂNG NHẬP</div>
                            <input type='password' className='register-app_passwd' placeholder='Nhập mật khẩu' required value={formData.passwd} name="passwd" onChange={handleChange}></input>
                            <input type='password' className='register-app_repasswd' placeholder='Nhập lại mật khẩu' required value={formData.repasswd} name="repasswd" onChange={handleChange}></input>
                            <button type='submit' className='register-form_submit'>Tạo tài khoản</button>
                        </div>
                    </div>
                </form>
            </div>
            {isSignUp && (
                <div className="login-modal">
                    <div className="login-modal-content">
                        <p>Chúc mừng bạn đã đăng ký thành công!</p>
                        <Link to='/Login' className="login-ok-button">OK</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;
