import React,{Component} from 'react';
import NavBar from './../../components/NavBar/NavBar';
import Loading from './../../components/loading'
import DetailMachine from './../../components/Detail/DetailMachine'
import queryString from 'query-string';
import HTTP from './../../common/HTTP';
export default class  extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            loading:true
        }
    }
    componentWillMount(){
        console.log('即将加载。。。')
    }
    componentDidUpdate(){
        console.log('更新完成')
    }
    componentDidMount() {
        console.log('加载完成。。。');
        this.getData();
    }

    getData = () => {
        let {search}=this.props.props.location;
        HTTP.post('/f/app/goods/info', {
            tid:queryString.parse(search).id
        }).then((res) => {
            if (res.data.success === 1) {
                this.setState({
                    data: res.data.body,
                    loading:false
                })
            }
        })
    };
    render(){
        let {data,loading} = this.state;
        let {userType,sessionId,userMobile}=this.props.userInfo;
        let {search}=this.props.props.location;
        let id=queryString.parse(search).id;
        let {history}=this.props.props;
        return(
            <NavBar title={'机型详情'}>
                {
                    loading?(<Loading/>):null
                }
                {
                    (!loading)?(data?(
                        <DetailMachine {...{data,userType,id,sessionId,userMobile,history}}/>
                    ):(
                        <p className={'no-data'}>数据获取中</p>
                    )):null
                }
            </NavBar>
        )
    }
}