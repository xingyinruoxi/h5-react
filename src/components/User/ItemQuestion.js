import React from 'react';
import {Link} from 'react-router-dom';
import './css/question.css';
export default function (props) {
    let {title,id}=props;
    return(
        <Link to={'/user/question/detail.html?id='+id} className={'item-question'}>{title}</Link>

    )
}