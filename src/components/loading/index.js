import React from 'react';
import './loading.css';
export default function () {
    return(
        <div className={'loading'}>
            <img src={require('./loading.gif')} alt="loading" width={32}/>
        </div>
    )
}