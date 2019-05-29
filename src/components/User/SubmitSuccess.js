import React from 'react';
import {Link} from 'react-router-dom';
import './css/submitsucces.css';
import checkCircle from './img/check-circle.png';
export default function () {
    return(
        <section className={'tip'}>
            <div className="container">
                <div className={'pic'}>
                    <img src={checkCircle} alt="成功图标" width={108}/>
                </div>
                <span>订单提交成功</span>
                <p>请等待业务员与您联系！</p>
                <footer>
                    <Link to={'/listmenu'} className={'color-red'}>
                        查看订单
                    </Link>
                    <span className={'line'}>
                    &nbsp;
                </span>
                    <Link to={'/'} className={'color-blue'}>
                        回首页
                    </Link>
                </footer>
            </div>

        </section>
    )
}