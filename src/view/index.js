import React from 'react';
import TabBar from './../components/TabBar/TabBar';
import IndexComp from './../components/IndexComp/IndexComp';
import IndexCompOther  from './../components/IndexComp/IndexCompOther'
export default function (props) {
    let {userType,userId}=props;
    return (
        <div>
            <TabBar/>
            {
                userType==='2'?(<IndexComp/>):(<IndexCompOther {...{userId,userType}}/>)
            }

        </div>
    )
}