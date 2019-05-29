import React, {Component} from 'react';
import NavBar from './../../components/NavBar/NavBar';
import SubmitSucess from './../../components/User/SubmitSuccess';

export default class  extends Component {
    render() {
        return (
            <NavBar backState={false} title={'提示'}>
                <SubmitSucess/>
            </NavBar>
        )
    }
}