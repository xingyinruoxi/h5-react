import React, {Component} from 'react';
import './css/setting.css';
import {Link} from 'react-router-dom';

export default class  extends Component {
    componentDidMount() {
        // this.loginout();
    }

    render() {
        let {loginout} = this.props;
        return (
            <ul className={'pad-top-10'}>
                <li className={'item-setting'}>
                    版本更新
                    <span>已是最新版本</span>
                </li>
                <Link to={'/user/protocol.html'} className={'link-arrow'}>
                    <li className={'item-setting link-arrow'}>
                        用户协议
                    </li>
                </Link>
                <li
                    className={'item-setting'}
                    style={{'marginTop': '10px'}}
                    onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        loginout();
                    }}
                >
                    退出登录
                </li>
            </ul>
        )
    }
}
