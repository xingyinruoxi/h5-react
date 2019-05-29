import React, {Component} from 'react';
import './css/address.css';

export default class A extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressId: localStorage.getItem('addressId')
        }
    }

    clickCheck = (address, tid) => {
        let {history} = this.props;
        localStorage.setItem('address', address);
        localStorage.setItem('addressId', tid);
        this.setState({
            addressId: tid
        });
        if (history.location.state) {
            history.go(-1);
        }

    };

    render() {
        let {data} = this.props;
        let {clickCheck} = this;
        let {addressId} = this.state;
        let dom = data.map((item) => {
            let {tid, address, consigneePhone, consignee} = item;
            let icoClass = (Number(addressId) === tid) ? 'ico-check ok' : 'ico-check no';
            return (
                <li
                    className={'item-address'}
                    key={tid}
                    onClick={() => {
                        clickCheck(address, tid)
                    }}
                >
                    <span className={'name'}>{consignee}</span>{consigneePhone}
                    <p>{address}</p>
                    <i className={icoClass}>&nbsp;</i>
                </li>

            )
        });
        return (
            <ul>
                {dom}
            </ul>
        )
    }
}