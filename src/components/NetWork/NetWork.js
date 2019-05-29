import React from 'react';
import './css/style.css';
export default function (props) {
    let {data}=props;
    let dom=data.map((item)=>{
        let {tid,name,phone,saleAddr}=item;
        return(
            <li className={'item-network'} key={tid}>
                <h5>{name}</h5>
                <p>地址：{saleAddr}</p>
                <footer>
                    <a
                        href={`tel:${phone}`}
                        className={'ico ico-consult'}
                    >&nbsp;</a>
                </footer>
            </li>
        )
    });
    return(
        <ul className={'pad-bottom-20'}>
            {dom}
        </ul>
    )
}