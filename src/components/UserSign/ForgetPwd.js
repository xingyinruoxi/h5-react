import React, {Component} from 'react';
import Validation from './../../common/utill/validation';
import './css/style.css';
// import HTTP from './../../common/HTTP';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: '',
            telErr: false,
            hasSubmit: true,
            imgCode: ''
        };
        this.validator = new Validation();
        this.validator.addByValue('tel', [
            {strategy: 'isEmpty', errorMsg: '手机号不能为空'},
            {strategy: 'hasSpace', errorMsg: '手机号不能有空格'},
            {strategy: 'isPhoneNum', errorMsg: '请输入正确手机号'},
        ]);
    }

    //输入手机号
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


    //点击提交
    onSubmit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        let {tel} = this.state;
        let {title, history} = this.props;
        let telErr = this.validator.valiOneByValue('tel', tel);
        if ((tel.length > 0) && (!/^1[34578][0-9]{9}$/.test(tel))) {
            telErr = "请输入正确手机号";
        }
        this.setState({
            telErr
        });

        if (!telErr) {

            this.setState({
                hasSubmit: false
            });
            let pathname = (title === '找回密码') ? '/forgetpwdfinish.html' : '/signupsuccess.html';
            history.push({
                pathname,
                state: {
                    mobile: tel
                }
            })
            // reqUrl = (title === '找回密码') ? '/f/app/resetPassword/toReset' : '/f/app/registration/getCode';
            /* HTTP.post(reqUrl, {
                 mobile: tel
             }).then(res => {
                 if (res.data.success === 1) {
                     let {mobileKey} = res.data.body;
                     let pathname = (title === '找回密码') ? '/forgetpwdfinish.html' : '/signupsuccess.html';
                     history.push({
                         pathname,
                         state: {
                             mobile: tel,
                             mobileKey
                         }
                     })
                 } else {
                     this.setState({
                         telErr: res.data.info,
                         hasSubmit: true
                     })
                 }
             })*/
        }

    };

    render() {
        let {title} = this.props;
        let {telChange, onBlurTel, onSubmit} = this;
        let {tel, telErr, hasSubmit} = this.state;
        let telErrMsg = telErr ? (
            <p className={'color-red text-center'}>{telErr}</p>
        ) : null;
        return (
            <form
                method={'post'}
                className={'signin forgetpwd'}
                onSubmit={onSubmit}
            >
                <h1 className={'title'}>{title}</h1>
                <div className={'from-signin'}>
                    <ul>
                        <li className={'item-input'}>
                            <input
                                placeholder={'请输入手机号'}
                                type={'tel'} name={'tel'}
                                className={'tel'}
                                value={tel}
                                onChange={telChange}
                                onBlur={onBlurTel}
                            />
                        </li>
                        {telErrMsg}
                    </ul>
                    {
                        hasSubmit ? (
                            <input type="submit" value="下一步" className={'btn btn-submit'}/>
                        ) : (
                            <input type="button" value="下一步" className={'btn btn-submit disabled'}/>
                        )
                    }

                </div>
            </form>
        )
    }
}