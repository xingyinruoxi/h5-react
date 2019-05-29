import React, {Component} from 'react';
import Validation from './../../common/utill/validation';
import base64 from 'base-64';
import './css/style.css';
import HTTP from './../../common/HTTP';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: '',
            code: '',
            liked: true,
            count: 60,
            pwdErr: false,
            codeErr: false,
            hasSubmit: true,
            clickSend:true,
            resErr: '',
            imgCode: '',
            imgCodeVal: '',
            imgCodeInputErr: '',
            mobileKey:''
        };
        this.validator = new Validation();
        this.validator.addByValue('imgCodeInput', [
            {strategy: 'isEmpty', errorMsg: '图形验证码不能为空'},
            {strategy: 'hasSpace', errorMsg: '图形验证码不能有空格'},
            {strategy: 'mustAllNum', errorMsg: '图形验证码格式只能为数字'},
            {strategy: 'maxLength:4', errorMsg: '图形验证码长度为4位'}
        ]);
        this.validator.addByValue('code', [
            {strategy: 'isEmpty', errorMsg: '短信验证码不能为空'},
            {strategy: 'hasSpace', errorMsg: '短信验证码不能有空格'},
            {strategy: 'mustAllNum', errorMsg: '短信验证码格式不对'},
            {strategy: 'maxLength:4', errorMsg: '短信验证码为4位'}
        ]);
        this.validator.addByValue('pwd', [
            {strategy: 'isEmpty', errorMsg: '密码不能为空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'minLength:6', errorMsg: '密码至少为6位'},
            {strategy: 'pwdReg', errorMsg: '密码格式为字母与数字组合'},
            {strategy: 'maxLength:20', errorMsg: '密码长度不能超过20位'}
        ]);
    }

    componentDidMount() {
        /* let {setTime}=this;
         setTime();*/
        let {getImgCode} = this;
        getImgCode();
    }


    //输入图片验证码校验
    imgCodeChange = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('imgCodeInput', value);
        this.setState({
            imgCodeVal: value,
            imgCodeInputErr: msg
        })
    };
    //图片验证码失去焦点校验
    imgCodeBlur = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('imgCodeInput', value);
        if (!msg) {
            if (value.length !== 4) {
                msg = '图形验证码长度为4位';
            }
        }
        this.setState({
            imgCodeInputErr: msg
        })
    };
    //获取图片验证码
    getImgCode = () => {
        let {state:{mobile}} = this.props;
        console.log(mobile,'+++++')
        HTTP.post('f/app/verify/create', {
            phone: mobile
        }).then(res => {

            if (res.data.success === 1) {

                let {verifyCode} = res.data.body;
                let imgCode = 'data:image/png;base64,' + verifyCode;
                this.setState({
                    imgCode
                })

            }
        }).catch(function (err) {
            console.log('0000', err);
        })
    };
    //输入密码
    pwdChange = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('pwd', value);
        this.setState({
            pwd: value,
            pwdErr: msg
        })
    };
    //输入短信验证码
    codeChange = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('code', value);
        this.setState({
            code: value,
            codeErr: msg
        })
    };

    //60秒倒计时
    setTime = () => {
        let {liked} = this.state;
        if (liked) {
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                let {count} = this.state;
                this.setState({
                    liked: false,
                    onOff: false
                });
                count -= 1;
                if (count < 1) {
                    this.setState({
                        liked: true
                    });
                    count = 60;
                    clearInterval(this.timer);
                }
                this.setState({
                    count: count
                });
            }.bind(this), 1000);
        }
    };
    //获取短信验证码
    getCodeMsg = () => {
        let {setTime} = this;
        let {title, state: {mobile}} = this.props;
        let reqUrl = (title === '找回密码成功') ? '/f/app/resetPassword/toReset' : '/f/app/registration/getCode';
        let {imgCodeVal} = this.state;

        let msg = this.validator.valiOneByValue('imgCodeInput', imgCodeVal);
        if (!msg) {
            if (imgCodeVal.length !== 4) {
                msg = '图形验证码长度为4位';
            }
        }
        this.setState({
            imgCodeInputErr: msg
        })

        if (msg) return;
        console.log('输入的图片验证码', imgCodeVal, reqUrl);

        this.setState({
            clickSend: false
        });
        HTTP.post(reqUrl, {
            mobile,
            verifyCode: imgCodeVal
        }).then(res => {
            if (res.data.success === 1) {
                let {mobileKey}=res.data.body;
                this.setState({
                    mobileKey,
                    clickSend:true
                });
                setTime();
                console.log('+++', res.data)
            } else {
                this.setState({
                    imgCodeInputErr: res.data.info,
                    clickSend: true
                })
                console.log('====?', res.data.info);
            }
        });
    };
    //密码输入框失去焦点
    onBlurPwd = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('pwd', value);
        this.setState({
            pwdErr: msg
        })
    };
    //验证码输入框失去焦点
    onBlurCode = ({target: {value}}) => {
        let msg = this.validator.valiOneByValue('code', value);
        this.setState({
            codeErr: msg
        })
    };
    //点击提交
    onSubmit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        let {pwd, code, imgCodeVal} = this.state;
        let {title, history} = this.props;
        let imgCodeInputErr = this.validator.valiOneByValue('imgCodeInput', imgCodeVal);
        let pwdErr = this.validator.valiOneByValue('pwd', pwd);
        let codeErr = this.validator.valiOneByValue('code', code);

        this.setState({
            imgCodeInputErr,
            pwdErr,
            codeErr,
            resErr: ''
        });

        if (!imgCodeInputErr && !pwdErr && !codeErr) {
            let reqUrl = (title === '找回密码成功') ? '/f/app/resetPassword/resetPWD' : '/f/app/registration/toRegistration';
            console.log(reqUrl,'9999????');
            let {mobile} = this.props.state;
            let {mobileKey}=this.state;
            this.setState({
                hasSubmit: false
            });
            HTTP.post(reqUrl, {
                mobile,
                mobileKey,
                code,
                password: base64.encode(pwd)
            }).then(res => {
                if (res.data.success === 1) {
                    this.setState({
                        resErr: (title === '找回密码成功')?'恭喜您，找回密码成功':'恭喜您，注册成功！'
                    }, function () {
                        setTimeout(function () {
                            history.push({
                                pathname: '/signin.html'
                            })
                        }, 1000)
                    });
                } else {
                    this.setState({
                        resErr: res.data.info,
                        hasSubmit: true
                    })
                }
            })
        }

    };

    render() {
        let {title} = this.props;
        let {pwdChange, onBlurPwd, codeChange, onBlurCode, onSubmit, getCodeMsg, getImgCode, imgCodeChange, imgCodeBlur} = this;
        let {pwd, pwdErr, code, codeErr, imgCodeVal, clickSend,imgCodeInputErr, imgCode, hasSubmit, liked, count, resErr} = this.state;
        let imgCodeErrMsg=imgCodeInputErr?(
            <p className={'color-red'}>{imgCodeInputErr}</p>
        ):null;
        let pwdErrMsg = pwdErr ? (
            <p className={'color-red'}>{pwdErr}</p>
        ) : null;
        let codeErrMsg = codeErr ? (
            <p className={'color-red'}>{codeErr}</p>
        ) : null;
        let text = liked ? '获取验证码' : count + '秒后重发送';
        let hasClass = liked ? 'send-code active' : 'send-code';
        let subErrMsg = resErr ? (
            <p className={'color-red subErr'}>{resErr}</p>
        ) : null;
        return (
            <section className={'signin reset-pwd'}>
                <h1 className={'title'}>{title === '注册成功' ? '设置密码' : '设置新密码'}</h1>
                {subErrMsg}
                <form
                    className={'from-signin'}
                    onSubmit={onSubmit}
                >
                    <ul>
                        <li className={'item-input'}>
                            <input
                                placeholder={'请输入图片验证码'}
                                type={'text'}
                                value={imgCodeVal}
                                name={'imgCodeInput'}
                                className={'pwd'}
                                onChange={imgCodeChange}
                                onBlur={imgCodeBlur}
                            />
                            <a
                                className={hasClass}
                                onClick={() => {
                                    getImgCode()
                                }}
                            >
                                <img src={imgCode} alt="图片验证码"/>
                            </a>
                        </li>
                        {
                            imgCodeErrMsg
                        }
                        <li className={'item-input'}>
                            <input
                                placeholder={'请输入短信验证码'}
                                type={'text'}
                                name={'code'}
                                className={'pwd'}
                                value={code}
                                onChange={codeChange}
                                onBlur={onBlurCode}
                            />
                            {
                                (!clickSend&&liked)?(<span className={'send-code'}>发送中...</span>):(
                                    <a
                                        className={hasClass}
                                        onClick={() => {
                                            // setTime()
                                            getCodeMsg()
                                        }}
                                    >
                                        {text}
                                    </a>
                                )
                            }

                        </li>
                        {codeErrMsg}
                        <li className={'item-input'}>
                            <input
                                placeholder={'设置新密码'}
                                type={'password'}
                                name={'pwd'}
                                className={'pwd'}
                                value={pwd}
                                onChange={pwdChange}
                                onBlur={onBlurPwd}
                            />
                        </li>
                        {
                            pwdErrMsg
                        }
                    </ul>
                    {
                        hasSubmit ? (
                            <input type="submit" value="完成" className={'btn btn-submit'}/>
                        ) : (
                            <input type="button" value="验证中..." className={'btn btn-submit disabled'}/>
                        )
                    }
                </form>
            </section>
        )
    }
}