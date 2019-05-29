import React from 'react';
import NavBar from './../../components/NavBar/NavBar';
import AddressForm from './../../components/User/AddressForm';

export default function (props) {
    let {history} = props.props;
    let {userInfo} = props;
    return (
        <NavBar title={'新增收货地址'}>
            <AddressForm {...{history, userInfo}}/>
        </NavBar>
    )
}