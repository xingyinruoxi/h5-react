import React, {Component} from 'react';
import ForgetPwdFinish from './../../components/UserSign/ForgetPwdFinish';
import NavBar from './../../components/NavBar/NavBar';

export default class  extends Component {
    render() {
        let {title,history}=this.props;
        let {state}=this.props.location;
        return (
            <NavBar bgWhite={true}>
                <ForgetPwdFinish  {...{title,state,history}}/>
            </NavBar>
        )
    }
}