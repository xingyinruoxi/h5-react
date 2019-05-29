import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HTTP from './../../common/HTTP';
import {fmoney} from './../../common/utill/format'
import './css/machine.css';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            address: '',
            agent: '',
            agentId: '',
            addressErr: '',
            submitButton: true
        }
    }

    componentDidMount() {
        /*let address=localStorage.getItem('address');
        let agent=localStorage.getItem('agent');*/
        let address = localStorage.getItem('address');
        let agent = localStorage.getItem('agent');
        if (address) {
            this.setState({
                address
            })
        }
        if (agent) {
            this.setState({
                agent
            })
        }

    }

    //增加商品数量
    addNum = () => {
        let {number} = this.state;
        if (number === 999) return;
        number++;
        this.setState({
            number
        })
    };
    //减少商品数量
    delNum = () => {
        let {number} = this.state;

        if (number === 1) return;
        number--;
        this.setState({
            number
        })
    };
    //提交订单
    onSubmit = () => {

        let {sessionId, userMobile, id, history} = this.props;
        let {goodsPrice, manufacturerId} = this.props.data;
        let {number, address} = this.state;

        if (!address) {
            this.setState({
                addressErr: '请输入收货地址',

            })
        } else {
            this.setState({
                submitButton: false
            });
            let agentId = '';
            if (localStorage.getItem('agentId')) {
                agentId = localStorage.getItem('agentId');
            }
            let params = {
                sessionId,
                account: userMobile,
                addressId: localStorage.getItem('addressId'),
                goodsInfoList: JSON.stringify([{
                    goodsId: id,
                    goodsNum: number,
                    orderPrice: goodsPrice,
                    manufacturerId,
                    agentId: agentId
                }])
            };

            HTTP.post('/f/app/jxorder/add', params)
                .then((res) => {
                    if (res.data.success === 1) {
                        history.push('/user/submitsuccess.html')
                    } else {

                        this.setState({
                            addressErr: res.data.info,
                            submitButton: true
                        })
                    }
                })
        }
    };

    render() {
        let {
            firstPayRatio, goodsName, imgUrls,
            goodsPrice, goodsVersion, leaseTerm,
            detailUrl
        } = this.props.data;
        let {userType, id, hash} = this.props;
        let {number, address, agent, addressErr, submitButton} = this.state;
        let {addNum, delNum, onSubmit} = this;

        return (
            <section className={'product-detail'}>
                <div className={"product-pic"}>
                    <span><img src={imgUrls[0]} width="304" alt={goodsName}/></span>
                </div>
                <div className={"list-block"}>
                    <h4 className={"product-title"}>{goodsName}</h4>
                    <span className={"badge"}>{goodsVersion}</span>
                    <ul>
                        <li className={"product-coach"}>
                            <label>指导价：&nbsp;</label>
                            <p className={"color-red"}>
                                <strong>￥{fmoney(goodsPrice)}元</strong>
                                <span>/件</span>
                            </p>
                            {
                                userType === '2' ? (
                                    <a href='tel:13521406387' className={'ico ico-consult'}>
                                        &nbsp;
                                    </a>
                                ) : null
                            }
                        </li>
                    </ul>
                </div>
                <div className={"list-block"}>
                    <ul>
                        <li>
                            <label className={"color-gray"}>首付比例&emsp;</label>
                            <span>{firstPayRatio}</span>
                            {/* <Link to={'/'} className={'ico ico-more'}>
                                &nbsp;
                            </Link>*/}
                        </li>
                        <li className={"no-border"}>
                            <label className={"color-gray"}>租赁期限&emsp;</label>
                            <span>{leaseTerm} </span>
                            {/* <Link to={'/'} className={'ico ico-more'}>
                                &nbsp;
                            </Link>*/}
                        </li>
                    </ul>
                </div>
                {
                    userType === '2' ? (
                        <div className={"list-block"}>
                            <ul>
                                <li style={{'justifyContent': 'space-between', 'padding': '8px 0'}}>
                                    <label className={"color-gray"}>数量&emsp;</label>
                                    <div className={'num'}>
                                        <i
                                            className={`ico ico-reduce ${number > 1 ? 'active' : ''}`}
                                            onClick={delNum}
                                        >&nbsp;</i>
                                        <span>{number}件</span>
                                        <i
                                            className={`ico ico-add ${number === 999 ? '' : 'active'}`}
                                            onClick={addNum}
                                        >&nbsp;</i>
                                        &emsp;
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ) : null
                }
                {
                    userType === '2' ? (
                        <div className={"list-block"}>
                            <ul>
                                <li>
                                    <label className={"color-gray"} style={{'width': '100px'}}>代理商</label>
                                    <Link
                                        to={{
                                            pathname: '/user/agentform.html',
                                            state: {id},
                                            hash,
                                        }}
                                        className={'inputWrap'}
                                    >&nbsp;<input
                                        placeholder={'您的代理商名称'}
                                        disabled
                                        value={
                                            agent
                                        }
                                    /></Link>
                                    <Link to={{
                                        pathname: '/user/agentform.html',
                                        hash,
                                        state: {id},
                                    }}>
                                        <i className={'ico ico-more'}> &nbsp;</i>
                                    </Link>
                                </li>
                                <li className={"no-border"}>
                                    <label className={"color-gray"} style={{'width': '100px'}}>收货地址</label>
                                    <i className={'ico ico-adddress'}>&nbsp;</i>
                                    <Link to={{
                                        pathname: '/user/address',
                                        hash,
                                        state: {id, agent},
                                    }} className={'inputWrap'}>&nbsp;<input
                                        disabled
                                        value={
                                            address
                                        }
                                        placeholder={'机器将运输到该地址'}/></Link>
                                    <Link to={{
                                        pathname: '/user/address',
                                        hash,
                                        state: {id},
                                    }} className={'ico ico-more'}>
                                        &nbsp;
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    ) : null
                }
                <div className={"list-block detail"}>
                    <dl className={"dl-detail"}>
                        <dt>机型详细介绍</dt>
                        <dd>
                            <div className={'pad-top-10'}>
                                <iframe
                                    src={detailUrl}
                                    width={"100%"}
                                    frameBorder={'0'}
                                    scrolling="auto"
                                    title={'iframe'}
                                    onLoad={() => {

                                    }}
                                >

                                </iframe>
                            </div>
                        </dd>
                    </dl>
                </div>
                {
                    userType === '2' ? (
                        <footer>
                            {
                                addressErr ? (
                                    <p
                                        className={'color-red text-center'}
                                        style={{
                                            'position': 'relative',
                                            'bottom': '-21px',
                                            'lineHeight': '30px',
                                            'background': '#ddd'
                                        }}
                                    >{addressErr}</p>
                                ) : null
                            }
                            {
                                submitButton ? (
                                    <div
                                        className={'btn btn-submit'}
                                        style={{'borderRadius': 0}}
                                        onClick={onSubmit}
                                    >
                                        提交订单
                                    </div>
                                ) : (
                                    <div
                                        className={'btn btn-submit'}
                                        style={{'borderRadius': 0, 'background': '#bbb'}}
                                    >
                                        提交中...
                                    </div>
                                )
                            }

                        </footer>
                    ) : null
                }

            </section>
        )
    }
}
