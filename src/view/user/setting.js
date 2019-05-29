import React from 'react';
import NavBar from './../../components/NavBar/NavBar';
import Setting from './../../components/User/Setting';
import bg from './../../components/User/img/bg-setting.png';
import logo from './../../components/User/img/logo.png';

export default function (props) {
    let {loginout} = props;
    return (
        <NavBar title={'系统设置'}>
            <div className="bg-setting">
                <img src={bg} width={'100%'} alt="背景图片"/>
                <img src={logo} width={'80'} alt="背景图片" className={'logo'}/>
                <span className={'version'}>V1.0.1</span>
            </div>
            <Setting {...{loginout}} />
        </NavBar>
    )
}