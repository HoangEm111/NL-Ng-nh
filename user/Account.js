import React from 'react'

export default function Account(props) {

    const { userOnline } = props

    return (
        <div className='user-detail col c-9'>
            <div className='user-detail_title'>Hồ Sơ Của Tôi</div>
            <div className='row'>
                <div className='user-detail_label-list col c-4'>
                    <div className='user-detail_label-item'>Họ và tên:</div>
                    <div className='user-detail_label-item'>Số điện thoại:</div>
                    <div className='user-detail_label-item'>Địa chỉ:</div>
                    <div className='user-detail_label-item'>Giới tính:</div>
                    <div className='user-detail_label-item'>Năm sinh:</div>
                </div>
                <div className='user-detail_info-list col c-8'>
                    <div className='user-detail_info-item'>{userOnline.name}</div>
                    <div className='user-detail_info-item'>{userOnline.phone}</div>
                    <div className='user-detail_info-item'>{userOnline.address}</div>
                    {userOnline.sex === 1 ?
                        <div className='user-detail_info-item'>Nam</div> :
                        <div className='user-detail_info-item'>Nữ</div>
                    }
                    <div className='user-detail_info-item'>{userOnline.yob}</div>
                </div>
            </div>
        </div>
    )
}
