import React from 'react';
import {Link} from 'react-router-dom';
import './css/menu.css';
import {fmoney} from './../../common/utill/format';
import iconTel from './img/phone.png';
export default function (props) {
    let {
        orderStatus, consigneeAddr, consigneeName,
        orderNo, consigneePhone,totalAmount,
        totalQuantity, tid,goodsList
    } = props.data;
    let {userType}=props;
    if (orderStatus === '1') {
        orderStatus = '待发货';
    } else if (orderStatus === '2') {
        orderStatus = '已发货';
    } else  {
        orderStatus = '已签收';
    }
    return (
        <div className={'order-detail'}>
            <div className={'order-process'}>
                <div className={'order-state'}>
                    <span className={'state-text'}>{orderStatus}</span>
                    <span>订单号：{orderNo}</span>
                </div>
                <Link to={{
                    pathname: '/user/serviceprocess.html',
                    search: `?tid=${tid}`
                }}>
                    查看服务进度
                </Link>
            </div>
            <ul className={'list-address'} style={{'position': 'relative'}}>
                <li>
                    <label>收货人</label>
                    <span
                        className={
                            userType !== '2' ? 'widthType' : null
                        }
                    >{consigneeName}&emsp;{consigneePhone}</span>
                </li>
                <li>
                    <label>收货地址</label>
                    <span
                        className={
                            userType !== '2' ? 'widthType' : null
                        }
                    >{consigneeAddr}</span>
                    {
                        userType !== '2' ? (
                            <a href={`tel:${consigneePhone}`} className='client-tel'>
                                <i className="ico ico-tel-circle">&nbsp;</i>
                                <p>联系客户</p>
                            </a>
                        ) : null
                    }
                </li>
            </ul>
           <li className="card">
                <a>
                    <section>
                        <div className={'img'}>
                            {
                                goodsList[0].attchUrl?(
                                <img src={goodsList[0].attchUrl} width={120} height={100} alt={goodsList[0].goodsName}/>
                            ):null
                            }

                        </div>
                        <div className={'inner'}>
                            <div className={'title'}>
                                <span>{goodsList[0].goodsName}</span>
                                <label>
                                    {goodsList[0].goodsVersion}
                                </label>
                            </div>
                            <div className={'subtitle'}>
                                指导价：¥{fmoney(goodsList[0].goodsPrice)}/件
                                <small>
                                    首付比例：{goodsList[0].firstPayRatio}&emsp;租期：{goodsList[0].leaseTerm}
                                </small>
                            </div>
                        </div>
                    </section>
                </a>
                <footer>共{totalQuantity}件<span className="pull-right">合计:&nbsp;<strong
                    className="font15 color-red">¥{fmoney(totalAmount)}</strong></span>
                </footer>
            </li>
            <ul className={'list-address'} style={{'borderBottom': 'none'}}>
                <li>
                    <label>租赁方案</label>
                    <span>{goodsList[0].leaseScheme}</span>
                </li>
            </ul>
            {
                userType === '2' ? (
                    <div>
                        <ul className={'list-address'} style={{'marginTop': '10px'}}>
                            <li>
                                <label>代理商</label>
                                <span>{goodsList[0].agentName}</span>
                            </li>
                        </ul>
                        <a href={`tel:${goodsList[0].agentTel}`}
                           className={'agent-tel'}
                        >
                            <img src={iconTel} width={16} alt={'电话'}/>
                            &nbsp;
                            联系代理商
                        </a>
                    </div>
                ) : null
            }
        </div>
    )
}