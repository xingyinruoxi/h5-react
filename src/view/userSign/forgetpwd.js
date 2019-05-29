import React, {Component} from 'react';
import ForgetPwd from './../../components/UserSign/ForgetPwd';
import NavBar from './../../components/NavBar/NavBar';

export default class  extends Component {
    render() {
        let {title,history}=this.props;
        return (
            <NavBar title={''} bgWhite={true}>
                <ForgetPwd {...{title,history}}/>
            </NavBar>
        )
    }
}