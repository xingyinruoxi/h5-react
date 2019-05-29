import React from 'react';
import {Link} from 'react-router-dom';
import './css/list.css';
export default function (props) {
    let {userType}=props;
    return(
        <ul className={'list-user'}>
            {
                userType==='2'?(
                    <Link to={'/user/address'}>
                        <li className={'link-arrow'}>
                            <i className={'ico ico-edit'}>&nbsp;</i>
                            <span>收货地址管理</span>
                        </li>
                    </Link>
                ):null
            }
            <Link to={'/user/question'}>
                <li className={'link-arrow'}>
                    <i className={'ico ico-question'}>&nbsp;</i>
                    <span>常见问题</span>
                </li>
            </Link>
            <Link to={'/user/setting'}>
                <li className={'link-arrow'}>
                    <i className={'ico ico-setting'}>&nbsp;</i>
                    <span>系统设置</span>
                </li>
            </Link>
        </ul>
    )
}