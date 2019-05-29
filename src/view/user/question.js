import React from 'react';
import ItemQuestion from '../../components/User/ItemQuestion'
import NavBar from './../../components/NavBar/NavBar';

export default function () {
    return (
        <NavBar title={'常见问题'}>
            <ItemQuestion title={'什么是锦绣科技？'} id={'1'}/>
            <ItemQuestion title={'锦绣科技相比传统购买绣花机，有什么优势？'} id={2} />
            <ItemQuestion title={'申请锦绣科技的融租服务需要什么资料？'} id={3} />
            <ItemQuestion title={'如何支付租赁款项？'} id={4} />
            <ItemQuestion title={'下单后，多久可得到机器？'} id={5} />
            <ItemQuestion title={'租赁到期后如何处理机器？'} id={6} />
        </NavBar>
    )
}
