import React,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class  extends Component{
    render(){
        return(
            <Link
                to={'/user/addressform.html'}
                className={'link-address-from'}
            >
                +&nbsp;新增收货地址
            </Link>
        )
    }
}