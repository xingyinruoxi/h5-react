import React from 'react';
import img from './img/pic.png';
import address from './img/address.png';
import check from './img/check.png';
import radio from './img/radio.png';
import tool from './img/tool.png';
import {Link} from 'react-router-dom';
import NavBar from './../../components/NavBar/NavBar';
import './style.css';
export default function () {
        return(
            <NavBar noNavBar={true}>
                <div className={'desc'}>
                    <img src={img} width="100%" alt={'绣花机租赁产融服务平台'} />
                    <p>绣花机租赁产融服务平台</p>
                </div>
                <div className='content-padded'>
                    <nav className="nav-check">
                        <Link to='/listmachine'>
                            <div><img src={radio} width="60" alt={'选机器'} /></div>
                            <label>选机器</label>
                        </Link>
                        <Link to='/listmarket'>
                            <div><img src={check} width="60" alt={'买配件'} /></div>
                            <label>买配件</label>
                        </Link>
                        <Link to='/service'>
                            <div><img src={tool} width="60" alt={'报维修'} /></div>
                            <label>报维修</label>
                        </Link>
                        <Link to='/network'>
                            <div><img src={address} width="60" alt={'找网点'} /></div>
                            <label>找网点</label>
                        </Link>
                    </nav>
                </div>
            </NavBar>
        )

}