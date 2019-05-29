import React from 'react';
import SignIn from './../../components/UserSign/SignIn';
export default function (props) {
    return(
        <div className={'content bg-white'}>
            <SignIn {...props}/>
        </div>
    )
}