import React from 'react';
import NavBar from './../../components/NavBar/NavBar';
import AgentForm from './../../components/User/AgentForm';

export default function (props) {
    let {userInfo,clearUserInfo} = props;
    let {history} = props.props;
    let id=props.props.location.state.id;
    return (
        <NavBar title={'代理商'}>
            <AgentForm {...{history, userInfo,clearUserInfo,id}}/>
        </NavBar>
    )
}