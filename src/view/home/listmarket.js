import React from 'react';
import NavBar from './../../components/NavBar/NavBar';
export default function () {
    return(
        <NavBar title={'选择配件'}>
            <div
                className={'pad-15 text-center color-gray'}
                style={{'fontSize':'20px','paddingTop':'40px'}}
            >
                暂未开通
            </div>
        </NavBar>
    )
}
