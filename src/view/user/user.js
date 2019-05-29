import React, {Component} from 'react';
import TabBar from './../../components/TabBar/TabBar'
import NavBar from './../../components/NavBar/NavBar'
import Header from './../../components/User/Header';
import List from './../../components/User/List';
import HTTP from './../../common/HTTP';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let {clearUserInfo} = this.props;
        let {sessionId, userId} = this.props.userInfo;
        HTTP.post('/f/app/jxorder/selectOrderCount', {
            sessionId,
            tid: userId
        }).then(res => {
            if (res.data.success === 1) {
                this.setState({
                    data: res.data.body
                })
            } else {
                clearUserInfo();
            }
        });
    };

    render() {
        let {data} = this.state;
        let {userType, userMobile} = this.props.userInfo;
        data.userType = userType;
        return (
            <div>
                <TabBar/>
                <NavBar noNavBar={true} bgWhite={true}>
                    <ul>
                        {
                            <Header {...{data, userMobile}}/>
                        }

                        <List {...{userType}}/>
                    </ul>
                </NavBar>
            </div>
        )
    }
}
