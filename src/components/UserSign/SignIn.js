import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Validation from './../../common/utill/validation';
import './css/style.css';
import base64 from 'base-64';
export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: '',
            password: '',
            telErr: false,
            pwdErr: false
        };

        this.validator = new Validation();
        this.validator.addByValue('tel', [
            {strategy: 'isEmpty', errorMsg: '手机号不能为空'},
            {strategy: 'hasSpace', errorMsg: '手机号不能有空格'},
            {strategy: 'isPhoneNum', errorMsg: '请输入正确手机号'},
        ]);
        this.validator.addByValue('password', [
            {strategy: 'isEmpty', errorMsg: '密码不能为空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'minLength:6', errorMsg: '密码格式为6-20位字母与数字组合'},
            {strategy: 'pwdReg', errorMsg: '密码格式为6-20位字母与数字组合'},
            {strategy: 'maxLength:20', errorMsg: '密码格式为6-20位字母与数字组合'}
            // {strategy: 'minLength:6', errorMsg: '密码至少为6位'},
            // {strategy: 'pwdReg', errorMsg: '密码格式为字母与数字组合'},
            // {strategy: 'maxLength:20', errorMsg: '密码长度不能超过20位'}
        ]);
    }

    telChange = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('tel', value);
        this.setState({
            tel: value,
            telErr: msg
        })
    };
    //手机输入框失去焦点
    onBlurTel = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('tel', value);
        if ((value.length > 0) && (!/^1[34578][0-9]{9}$/.test(value))) {
            msg = "请输入正确手机号";
        }
        this.setState({
            telErr: msg
        })
    };
    passwordChange = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('password', value);
        this.setState({
            password: value,
            passwordErr: msg
        })
    };


    onSubmit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        let {tel, password} = this.state;
        let {signInAjax}=this.props;
        let telErr = this.validator.valiOneByValue('tel', tel);
        let passwordErr = this.validator.valiOneByValue('password', password);

        this.setState({
            telErr,
            passwordErr
        });
        if (!telErr&&!passwordErr) {
            signInAjax({
                username:tel,
                password:base64.encode(password)
            });
        }
    };

    render() {
        let {telChange,onBlurTel, passwordChange, onSubmit} = this;
        let {tel, password, telErr, passwordErr} = this.state;
        let {subErr,clearSubErr}=this.props;
        let telErrMsg = telErr ? (
            <p className={'color-red'}>{telErr}</p>
        ) : null;
        let passwordErrMsg = passwordErr ? (
            <p className={'color-red rr'}>{passwordErr}</p>
        ) : null;
        let subErrMsg = subErr ? (
            <p className={'color-red subErr'}>{subErr}</p>
        ) : null;

        return (
            <section className={'signin'}>
                <h1 className={'title'}>锦绣租赁</h1>
                <p className={'text'}>绣花机租赁产融服务平台</p>
                {subErrMsg}
                <form
                    method={'post'}
                    className={'from-signin'}
                    onSubmit={onSubmit}
                >
                    <ul>
                        <li className={'item-input'}>
                            <i className={'ico ico-phone'}>&nbsp;</i>
                            <span className={'inputWrap'}>&nbsp;
                                <input
                                    placeholder={'请输入手机号'}
                                    type={'tel'}
                                    name={'tel'}
                                    className={'tel'}
                                    value={tel}
                                    onChange={(ev)=>{
                                        telChange(ev);
                                        clearSubErr();
                                    }}
                                    onBlur={onBlurTel}
                                />
                            </span>
                        </li>
                        {telErrMsg}
                        <li className={'item-input'}>
                            <i className={'ico ico-lock'}>&nbsp;</i>
                            <span className={'inputWrap'}>&nbsp;
                                <input
                                    placeholder={'请输入6-20位字母与数字组合密码'}
                                    type={'password'}
                                    name={'pwd'}
                                    className={'pwd'}
                                    value={password}
                                    onChange={(ev)=>{
                                        passwordChange(ev);
                                        clearSubErr();
                                    }}
                                    onBlur={passwordChange}
                                />
                            </span>
                        </li>
                        {passwordErrMsg}
                    </ul>
                    <input type="submit" value="登录" className={'btn btn-submit'}/>
                </form>
                <Link to={'/forgetpwd.html'} className={"forgetped"}>
                    忘记密码？
                </Link>
                <footer>
                    还没有账号，
                    <Link to={'/signup.html'}>
                        立即注册
                    </Link>
                </footer>
            </section>
        )
    }
}