import React from 'react';
import { NavLink} from 'react-router-dom';
import  './tabBar.css'
export default function () {
    return(
        <nav className={'bar bar-tab'}>
            <NavLink
                to='/'
                exact
                className={"tab-item"}
                activeClassName={'active'}
            >
                <span className={"icon icon-home"}>&nbsp;</span>
                <span className={"tab-label"}>首页</span>
            </NavLink>
            <NavLink
                to='/listmenu'
                className={"tab-item"}
                activeClassName={'active'}
            >
                <span className={"icon icon-menu"}>&nbsp;</span>
                <span className={"tab-label"}>订单</span>
            </NavLink>
            <NavLink
                to='/user'
                className={"tab-item"}
                activeClassName={'active'}
            >
                <span className={"icon icon-user"}>&nbsp;</span>
                <span className={"tab-label"}>我的</span>
            </NavLink>
        </nav>
    )
}