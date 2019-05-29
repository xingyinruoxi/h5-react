import React from 'react';
import './css/itemserviceprocess.css';
import {formate} from './../../common/utill/validation';
export default function (props) {
    let {data}=props;
    let dom=data.map((item,index)=>{
        let {time,type}=item;
        return(
            <li className={'item-process'} key={index}>
                <i className="ico-ok">
                </i>
                <p>
                    <time>{formate(time)}</time>
                    <span>{type}</span>
                </p>
            </li>
        )
    });

    return(
        <ul className={'list-process'}>
            {dom}
        </ul>
    )
}