import React, {Component} from 'react';
import NavBar from './../../components/NavBar/NavBar';
import Loading from './../../components/loading'
import NoData from './../../components/Nodata';
import ItemAddress from '../../components/User/ItemAddress';
import LinkAddressForm from '../../components/User/LinkAddressForm';
import HTTP from './../../common/HTTP';


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
        let {sessionId, userMobile} = this.props.userInfo;
        HTTP.post('/f/app/jxaddress/list', {
            sessionId,
            tid: userMobile
        }).then((res) => {
            if (res.data.success === 1) {
                let body = res.data.body;
                if (body) {
                    this.setState({
                        data: body,
                        loading: false
                    });
                }
            } else {
                clearUserInfo();
            }
        }).catch(err => {
            console.log('err:', err)
        })
    };

    render() {
        let {data, loading} = this.state;
        let {history} = this.props.props;
        return (
            <NavBar title={'收货地址管理'}>
                {
                    loading ? (<Loading/>) : null
                }
                {
                    (!loading) ? (data.length > 0 ? (
                        <ItemAddress  {...{data, history}} />
                    ) : (<NoData/>)) : null
                }
                <LinkAddressForm/>
            </NavBar>
        )
    }
}