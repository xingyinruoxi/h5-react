import React from 'react';
import './style.css';

export default function (props) {
    let {data} = props;
    console.log(data);
    let dom = data.map((item, index) => {
        let {orderNo, productName, productType, manufacturerPhone, productImage} = item;
        return (
            <li className={"card"} key={index}>
                <header>
                    订单号:{orderNo}
                </header>
                <section>
                    <div className={'img'}>
                        {
                            productImage ? (
                                <img src={productImage} width={120} height={100} alt={productName}/>
                            ) : null
                        }
                    </div>
                    <div className={'inner'}>
                        <div className={'title'}>
                            <span>{productName}</span>
                            <label>
                                {productType}
                            </label>
                        </div>
                        <a href={`tel:${manufacturerPhone ? manufacturerPhone : 13521406387}`}
                           className={'ico ico-service'}>&nbsp;</a>
                    </div>
                </section>
            </li>
        )
    });
    return (
        <ul className={'list-card'}>
            {dom}
        </ul>
    )
}