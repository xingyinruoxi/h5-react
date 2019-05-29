import React,{Component} from 'react';
import NetWork from './../../components/NetWork/NetWork';
import NavBar from './../../components/NavBar/NavBar';
import Loading from './../../components/loading'
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
        HTTP.post('/f/app/dot/list', {
            pageNum:1,
            pageSize: 10
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
        return(
            <NavBar title={'网点服务'}>
                <img src={require('./../../components/NetWork/img/network.png')} width={'100%'} alt={'网点服务'}/>
                {
                    loading?(<Loading/>):null
                }
                {
                    (!loading)?(data.length>0?(
                        <NetWork {...{data}} />
                    ):(<NoData/>)):null
                }
            </NavBar>
        )
    }
}