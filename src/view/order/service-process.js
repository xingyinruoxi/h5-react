import React, {Component} from 'react';
import IteServiceProcess from './../../components/User/ItemServiceProcess'
import NavBar from './../../components/NavBar/NavBar';
import Loading from './../../components/loading'
import NoData from './../../components/Nodata';
import HTTP from './../../common/HTTP';
import queryString from 'query-string';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
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
        HTTP.post('/f/app/jxorder/progress', {
            tid: queryString.parse(search).tid,
            sessionId
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
        console.log(data);
        return (
            <NavBar title={'服务进度'}>
                <img src={require('./../../components/User/img/process-banner.png')} alt="服务进度banner" width={'100%'}/>
                {
                    loading ? (<Loading/>) : null
                }
                {
                    (!loading) ? (data.length > 0 ? (
                        <IteServiceProcess {...{data}}/>
                    ) : (<NoData/>)) : null
                }
            </NavBar>
        )
    }
}