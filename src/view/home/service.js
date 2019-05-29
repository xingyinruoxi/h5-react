import React,{Component} from 'react';
import CardService from './../../components/Card/CardService';
import NavBar from './../../components/NavBar/NavBar';
import Loading from './../../components/loading';
import NoData from './../../components/Nodata';
import HTTP from './../../common/HTTP';
export default class  extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading:true
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let {clearUserInfo} = this.props;
        let {sessionId,userId}=this.props.userInfo;
        HTTP.post('/f/app/jxrepair/list', {
            sessionId,
            tid: userId
        }).then((res) => {
            if (res.data.success === 1) {
                this.setState({
                    data: res.data.body,
                    loading:false
                })
            }else{
                clearUserInfo();
            }
        })
    };
    render(){
        let {data,loading} = this.state;
        console.log(1234567890,data);
        return(
            <NavBar title={'维修服务'}>
                {
                    loading?(<Loading/>):null
                }
                {
                    (!loading)?(data.length>0?(
                        <CardService {...{data}}/>
                    ):(
                        <NoData/>
                    )):null
                }
            </NavBar>
        )
    }
}