import React, {Component} from 'react';
import Validation from './../../common/utill/validation';
import './css/address.css';
import HTTP from './../../common/HTTP';
import City from './../../components/City'

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consignee: '',
            consigneePhone: '',
            area: '',
            address: '',
            subErr: '',
            data: [],
            translateY:248
        };
        this.validator = new Validation();
        this.validator.addByValue('consignee', [
            {strategy: 'isEmpty', errorMsg: '收货人不能为空'}
        ]);
        this.validator.addByValue('consigneePhone', [
            {strategy: 'isEmpty', errorMsg: '手机号不能为空'},
            {strategy: 'hasSpace', errorMsg: '手机号不能有空格'},
            {strategy: 'isPhoneNum', errorMsg: '请输入正确手机号'},
        ]);
        this.validator.addByValue('area', [
            {strategy: 'isEmpty', errorMsg: '所在地区不能为空'}
        ]);
        this.validator.addByValue('address', [
            {strategy: 'isEmpty', errorMsg: '详细地址不能为空'}
        ]);
    }

    onChangeConsignee = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('consignee', value);
        this.setState({
            consignee: value,
            subErr: msg
        })
    };
    onChangeConsigneePhone = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('consigneePhone', value);
        this.setState({
            consigneePhone: value,
            subErr: msg
        })
    };
    onBlurConsigneePhone = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('consigneePhone', value);
        if ((value.length > 0) && (!/^1[34578][0-9]{9}$/.test(value))) {
            msg = "请输入正确手机号";
        }
        this.setState({
            subErr: msg
        })

    };

    onChangeAddree = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('address', value);
        this.setState({
            address: value,
            subErr: msg
        })
    };

    //保存提交
    onSubmit = () => {
        let {
            consignee,
            consigneePhone,
            area,
            address
        } = this.state;

        let consigneeErr = this.validator.valiOneByValue('consignee', consignee);
        let consigneePhoneErr = this.validator.valiOneByValue('consigneePhone', consigneePhone);
        if ((consigneePhone.length > 0) && (!/^1[34578][0-9]{9}$/.test(consigneePhone))) {
            consigneePhoneErr = "请输入正确手机号";
        }
        let areaErr = this.validator.valiOneByValue('area', area);
        let addressErr = this.validator.valiOneByValue('address', address);

        let subErr = consigneeErr || consigneePhoneErr || areaErr || addressErr;
        this.setState({
            subErr
        });
        if (subErr) return;
        let reqUrl = '/f/app/jxaddress/add';
        let {userMobile} = this.props.userInfo;
        let {history} = this.props;
        HTTP.post(reqUrl, {
            MemberId: userMobile,
            consignee,
            consigneePhone,
            area,
            address
        }).then(res => {
            if (res.data.success === 1) {
                history.push({
                    pathname: '/user/address'
                })
            } else {
                /*this.setState({
                    telErr: res.data.info,
                    hasSubmit: true
                })*/
            }
        })
    };


    onCancel=()=>{
        this.setState({
            translateY:248
        })
    };
    showPickerCity=()=>{
        this.setState({
            translateY:0
        })
    };

    onOk = () => {
        let area=localStorage.getItem('area');
        this.setState({
            translateY:248,
            area
        })
    };

    render() {
        let {consignee, consigneePhone, area, addree, subErr,translateY} = this.state;
        let {
            onChangeConsignee,
            onChangeConsigneePhone,
             onBlurConsigneePhone,
            onChangeAddree,showPickerCity,
            onSubmit, onCancel,onOk
        } = this;
        return (
            <div className={'addressform'}>
                <ul>
                    <li className={'item-address'}>
                        <label>收货人：</label>
                        <span className={'inputWrap'}>&nbsp;
                            <input
                                type="text"
                                value={consignee}
                                placeholder={'请输入姓名'}
                                onChange={onChangeConsignee}
                            />
                       </span>
                    </li>
                    <li className={'item-address'}>
                        <label>手机号：</label>
                        <span className={'inputWrap'}>&nbsp;
                            <input
                                type="text"
                                value={consigneePhone}
                                name={'consigneePhone'}
                                placeholder={'请输入收货人手机号'}
                                onChange={onChangeConsigneePhone}
                                onBlur={onBlurConsigneePhone}
                            />
                       </span>
                    </li>
                    <li className={'item-address link-arraw'}>
                        <label>所在地区：</label>
                        <span className={'inputWrap'}
                              onClick={showPickerCity}
                        >&nbsp;
                            <input
                                type="text"
                                value={area}
                                placeholder={'请输入所在地区'}
                                readOnly
                                disabled
                            />
                       </span>
                    </li>
                    <li className={'item-address'}>
                        <label>详细地址：</label>
                        <span className={'inputWrap'}>&nbsp;
                            <input
                                type="text"
                                value={addree}
                                placeholder={'请输入详细地址'}
                                onChange={onChangeAddree}
                            />
                        </span>
                    </li>
                </ul>
                <p className={'color-red pad-15'}>{subErr}</p>
                <footer>
                    {/*<Link to={'/user/address'} className={'btn btn-submit'}>
                        保存
                    </Link>*/}
                    <a
                        className={'btn btn-submit'}
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            onSubmit();
                        }}
                    >
                        保存
                    </a>
                </footer>
                <div className="cityWrap"  id={'cityWrap'} style={{'transform':'translateY('+translateY+'px)'}}>
                    <header className={'cityHeader'}>
                        <span
                            onClick={onCancel}
                        >取消</span>
                        <span
                            onClick={onOk}
                        >
                        确定
                    </span>
                    </header>
                    <City/>
                </div>
            </div>
        )
    }
}