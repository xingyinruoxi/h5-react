import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Index from './../view/index'

import SignIn from './../view/userSign/signin';
import ForgetPwd from './../view/userSign/forgetpwd';
import ForgetPwdFininsh from './../view/userSign/forgetpwdfinish';

import ListMachine from './../view/home/listmachine';
import DetailMachine from './../view/home/detaill-machine';

import Service from './../view/home/service';
import Network from './../view/home/network';
import ListMarket from './../view/home/listmarket';

import User from './../view/user/user';
import Question from './../view/user/question';
import Setting from './../view/user/setting';
import Protocol from './../view/user/protocol';
import QuestionDetail from './../view/user/questiondetail';
import Address from './../view/user/address';
import AddressForm from './../view/user/addressform';
import AgenForm from './../view/user/agentform';
import SubmitSucess from './../view/user/submitsuccess';

import List from './../view/order/list-menu';
import DetailMenu from './../view/order/detail-menu'
import ServiceProcess from './../view/order/service-process';//查看服务进度
import HTTP from './../common/HTTP';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            subErr: '',
            hasLogin: false
        }
    }

    //  componentDidMount componentWillMount
    componentWillMount() {
        this.initUserInfo();
    }

    //登录请求
    signInAjax = (reqData) => {
        HTTP.post('/auto/loginApp', reqData)
            .then(res => {
                if (res.data.success === 1) {
                    this.setState({
                        userInfo: res.data.body,
                        subErr: ''
                    });
                } else {
                    this.setState({
                        subErr: res.data.info
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //注销请求
    loginout = () => {
        let {sessionId} = this.state.userInfo;
        HTTP.post('/f/loginout', {
            sessionId
        }).then((res) => {
            if (res.data.success === 1) {
                this.setState({
                    userInfo: ''
                })
            } else {

            }
        })
    };
    // 初始化个人信息
    initUserInfo = () => {
        console.log(34678)
        HTTP.post('/auto/loginApp')
            .then(res => {
                console.log(345678,res);
                if (res.data.success === 1) {
                    this.setState({
                        userInfo: res.data.body,
                        hasLogin: true
                    });

                } else {
                    this.setState({
                        userInfo: '',
                        hasLogin: true
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        let {userInfo, subErr, hasLogin} = this.state;
        let {signInAjax, loginout} = this;
        if (!hasLogin) {
            return (<div>&nbsp;</div>)
        }

        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={
                        () => userInfo ?
                            (<Index {...userInfo} />)
                            : (<SignIn {...{signInAjax, subErr}}/>)
                    }/>
                    <Route  path="/index.html" render={()=>(<Redirect to="/"/>)}/>

                    <Route path="/signin.html" render={
                        () => userInfo ? (<Redirect to="/"/>) : (
                            <SignIn {...{signInAjax, subErr}} />
                        )
                    }/>

                    <Route path="/signup.html" render={
                        (props) => (<ForgetPwd title={'开始注册'} {...props}/>)
                    }/>
                    <Route path="/signupsuccess.html" render={
                        (props) => (<ForgetPwdFininsh title={'注册成功'}  {...props}/>)
                    }/>
                    <Route path="/forgetpwd.html" render={
                        (props) => (<ForgetPwd title={'找回密码'} {...props}/>)
                    }/>

                    <Route path="/forgetpwdfinish.html" render={
                        (props) => (<ForgetPwdFininsh title={'找回密码成功'} {...props}/>)
                    }/>

                    <Route exact path="/listmenu" render={
                        () => (
                            !userInfo ? (
                                <Redirect to="/signin.html"/>
                            ) : (
                                <List  {...{userInfo}}/>
                            )
                        )
                    }/>
                    <Route path="/listmenu/detail.html" render={
                        (props) => (
                            !userInfo ? (
                                <Redirect to="/signin.html"/>
                            ) : (
                                <DetailMenu {...{props, userInfo}} />
                            )
                        )
                    }/>
                    {/*<Route path="/user/serviceprocess.html" component={ServiceProcess}/>*/}
                    <Route path="/user/serviceprocess.html" render={
                        (props) => (
                            !userInfo ? (
                                <Redirect to="/signin.html"/>
                            ) : (
                                <ServiceProcess {...{props, userInfo}} />
                            )
                        )
                    }/>

                    <Route exact path="/user" render={
                        props => (<User {...{userInfo}}/>)
                    }/>
                    <Route exact path="/user/question" component={Question}/>
                    <Route path="/user/question/detail.html" component={QuestionDetail}/>
                    <Route path="/user/setting" render={
                        () => (
                            !userInfo ? (
                                <Redirect to="/signin.html"/>
                            ) : (
                                <Setting {...{loginout}}/>
                            )
                        )
                    }/>
                    <Route path="/user/protocol.html" render={
                        () => {
                            return (
                                <Protocol/>
                            )
                        }
                    }/>
                    <Route path="/user/address" render={
                        (props) => (
                            !userInfo ? (
                                <Redirect to="/signin.html"/>
                            ) : (
                                <Address {...{userInfo, props}}/>
                            )
                        )
                    }/>
                    <Route path="/user/address" render={
                        () => (
                            !userInfo ? (
                                <Redirect to="/signin.html"/>
                            ) : (
                                <Address {...{userInfo}}/>
                            )
                        )
                    }/>
                    <Route path="/user/agentform.html" render={
                        (props) => (
                            !userInfo ? (
                                <Redirect to="/signin.html"/>
                            ) : (
                                <AgenForm {...{userInfo, props}}/>
                            )
                        )
                    }/>
                    <Route path="/user/address" render={
                        () => (
                            !userInfo ? (
                                <Redirect to="/signin.html"/>
                            ) : (
                                <Address {...{userInfo}}/>
                            )
                        )
                    }/>
                    <Route path="/user/addressform.html" render={
                        (props) => (
                            !userInfo ? (
                                <Redirect to="/signin.html"/>
                            ) : (
                                <AddressForm {...{props, userInfo}}/>
                            )
                        )
                    }/>
                    <Route path="/user/submitsuccess.html" component={SubmitSucess}/>

                    <Route path="/service" render={
                        () => (
                            userInfo ? (
                                <Service {...{userInfo}}/>
                            ) : (
                                <Redirect to="/signin.html"/>
                            )
                        )
                    }/>
                    <Route path="/network" component={Network}/>

                    <Route exact path="/listmachine" component={ListMachine}/>

                    <Route exact path="/listmarket" component={ListMarket}/>

                    <Route exact path="/listmachine/detail.html" render={
                        (props) => (
                            <DetailMachine {...{userInfo, props}}/>
                        )
                    }/>

                    <Route path='/404.html' component={Network}/>
                    <Redirect from='*' to='/404.html'/>
                </Switch>
            </Router>
        )
    }
}