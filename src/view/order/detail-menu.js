import React, {Component} from 'react';
import NavBar from './../../components/NavBar/NavBar';
import TabBar from './../../components/TabBar/TabBar'
import DetailMenu from '../../components/Detail/DetailMenu';
import Loading from './../../components/loading'
import queryString from 'query-string';
import HTTP from './../../common/HTTP';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            loading: true
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let {clearUserInfo} = this.props;
        let {sessionId} = this.props.userInfo;
        let {search} = this.props.props.location;
        HTTP.post('/f/app/jxorder/info', {
            sessionId,
            tid: queryString.parse(search).id
        }).then((res) => {
            if (res.data.success === 1) {
                this.setState({
                    data: res.data.body,
                    loading: false
                })
            } else {
                clearUserInfo();
            }
        })
    };

    render() {
        let {data, loading} = this.state;
        let {userType} = this.props.userInfo;
        return (
            <div>
                <NavBar title={'订单详情'}>
                    {
                        loading ? (<Loading/>) : null
                    }
                    {
                        data ? (
                            <DetailMenu {...{data, userType}}/>
                        ) : null
                    }
                </NavBar>
                <TabBar/>
            </div>
        )
    }
}