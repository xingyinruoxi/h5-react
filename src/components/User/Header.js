import React from 'react';
import {Link} from 'react-router-dom';
import './css/header.css';

export default function (props) {
    let {goodsOrderCount, partsOrderCount, userType, name} = props.data;
    let phone=props.userMobile;
    return (
        <section>
            <header className={'header-avatar '}>
                <div><img src={require('./img/avatar-active.png')} width='100%' alt={'头像'}/></div>
                <p style={{
                    fontSize: '16px',
                    paddingTop: '8px'
                }}>
                    {phone?(phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')):null}
                    {
                        userType !== '2' ? (
                            userType === '1' ? (
                                <img src={require('./img/agent.png')} width={'30'}
                                     style={{'marginTop': '-4px', 'marginLeft': '6px'}} alt="代理商"/>
                            ) : (
                                <img src={require('./img/manufacturer.png')} width={'30'}
                                     style={{'marginTop': '-4px', 'marginLeft': '6px'}} alt="厂商"/>
                            )

                        ) : null
                    }
                    {
                        userType !== '2'?(
                            <p className='pad-top-10 pad-bottom-10'>{name}</p>
                        ):null
                    }
                </p>
            </header>
            {
                <div className={'account'}>
                    <Link
                        to={'/listmenu'}
                    >
                        <div className={'num'}>{goodsOrderCount?goodsOrderCount:'*'}</div>
                        <span>
                                {
                                    userType === '1' ? '卖出机型' : '机型订单'
                                }
                            </span>
                    </Link>
                    <div className={'line'}>&nbsp;</div>
                    <div
                        style={{'position':'relative'}}
                    >
                        <div className={'num'}>{partsOrderCount?partsOrderCount:0}</div>
                        <span>
                                 {
                                     userType === '1' ? '卖出配件' : '配件订单'
                                 }
                            </span>
                        <p
                            style={{'position':'absolute','color':'#ddd'}}
                        >暂未开通</p>
                    </div>
                </div>
            }
        </section>
    )
}