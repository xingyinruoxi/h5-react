import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {fmoney} from './../../common/utill/format'
import HTTP from './../../common/HTTP';

export default class  extends Component{
    onSend = (tid) => {
        let {data,sessionId} = this.props;
        console.log('0000');
       /* */
        HTTP.post('/f/app/jxorder/update', {
             sessionId,
             tid
         }).then(res => {
            if (res.data.success === 1) {
                data=data.map(item=>{
                    if(item.tid===tid){
                        item.orderStatus='2';
                    }
                    return item;
                });
                this.setState({
                    data
                })
             }
         }).catch(err=>{
             console.log('err:',err)
        })
    };
    render(){
        let {url, userType} = this.props;
        let {onSend}=this;
        let {data}=this.props;
        let dom = data.map(item => {
            let {tid, orderNo, totalAmount, totalCount, orderStatus, goodsInfo} = item;
            let {goodsName, attchUrl, goodsVersion, orderPrice, firstPayRatio, leaseTerm} = goodsInfo[0];
            let statusText='';
            if (orderStatus === '1') {
                statusText = '待发货';
            } else if (orderStatus === '2') {
                statusText = '已发货';
            } else {
                statusText = '已签收';
            }

            return (
                <li
                    className={'card'}
                    key={tid}
                >
                    <header>
                        订单号:{orderNo}
                        <span className={'pull-right'}>
                        {statusText}
                        </span>
                    </header>
                    <Link to={{
                        pathname: url,
                        search: '?id=' + item.tid
                    }}>
                        <section>
                            <div className={'img'}>
                                {attchUrl ? (
                                    <img src={attchUrl} width={120} height={100} alt={goodsName}/>
                                ) : null}

                            </div>
                            <div className={'inner'}>
                                <div className={'title'}>
                                    <span>{goodsName}</span>
                                    <label>
                                        {goodsVersion}
                                    </label>
                                </div>
                                <div className={'subtitle'}>
                                    指导价：¥{fmoney(orderPrice)}/件
                                    <small>
                                        首付比例：{firstPayRatio}&emsp;租期：{leaseTerm}
                                    </small>
                                </div>
                            </div>
                        </section>
                    </Link>
                    <footer>
                        共{totalCount}件
                        {
                            userType === '0' ? (
                                orderStatus === '1' ? (
                                    <i
                                        className={'pull-right ico ico-send'}
                                        onClick={(ev) => {
                                            onSend(tid, ev)
                                        }}
                                    >
                                    </i>
                                ) : null

                            ) : (
                                <a className={'pull-right'}>
                                    合计:&nbsp;
                                    <strong className={'font15 color-red'}>
                                        ¥{fmoney(totalAmount)}
                                    </strong>
                                </a>
                            )
                        }

                    </footer>

                </li>
            )
        });
        return (
            <ul className={'list-card'}>
                {dom}
            </ul>

        )
    }
}
