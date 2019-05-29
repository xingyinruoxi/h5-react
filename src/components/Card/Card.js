import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {fmoney} from './../../common/utill/format'
export default function (props) {
    let {url,data}=props;
    let dom=data.map(item=>{
        let {tid,goodsName,imgUrl,goodsVersion,goodsPrice,firstPayRatio,leaseTerm}=item;
        return(
            <li
                className={'card no-margin'}
                key={tid}
            >
                <Link to={{
                    pathname: url,
                    search: '?id='+item.tid
                }}>
                    <section>
                        <div className={'img'}>
                            {imgUrl?(
                                <img src={imgUrl} width={120} height={100} alt={goodsName}/>
                            ):null}

                        </div>
                        <div className={'inner'}>
                            <div className={'title'}>
                                <span>{goodsName}</span>
                                <label>
                                    {goodsVersion}
                                </label>
                            </div>
                            <div className={'subtitle'}>
                                指导价：¥{fmoney(goodsPrice)}/件
                                <small>
                                    首付比例：{firstPayRatio}&emsp;租期：{leaseTerm}
                                </small>
                            </div>
                        </div>
                    </section>
                </Link>
            </li>
        )
    });
    return(
        <ul className={'list-card'}>
            {dom}
        </ul>

    )
}