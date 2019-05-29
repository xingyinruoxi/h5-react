import React, {Component} from 'react';
import './css/address.css';
import HTTP from './../../common/HTTP';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agent: '',
            arrData: []
        }
    }

    componentDidMount() {

    }

    onChangeagent = ({target: {value}}) => {
        this.setState({
            agent: value
        });

        let {clearUserInfo} = this.props;
        let {sessionId} = this.props.userInfo;
        if (!value) return;
        let params = {
            name: value,
            tid: this.props.id,
            sessionId
        };
        HTTP.post('/f/app/agent/list', params).then((res) => {
            let data = res.data;
            if (data.success === 1) {
                if (data.body.length > 0) {
                    this.setState({
                        arrData: data.body
                    })
                }
            } else {
                clearUserInfo()
            }
        })
    };

    render() {
        let {agent, arrData} = this.state;
        let {history} = this.props;
        let {
            onChangeagent
        } = this;

        let dom = arrData.map((item, index) => {
            let {name, tid} = item;
            return (
                <li className={'item-address'}
                    key={index}
                    style={{'background': 'none', 'padding': '6px 15px', 'borderBottom': 'none'}}
                    onClick={() => {
                        history.goBack(-1);
                        localStorage.setItem('agent', name);
                        localStorage.setItem('agentId', tid);
                    }}
                >
                    {name}
                </li>
            )
        });

        return (
            <div className={'addressform'}>
                <ul>
                    <li className={'item-address'}>
                        <span className={'inputWrap'}>&nbsp;
                            <input
                                type="text"
                                value={agent}
                                placeholder={'请输入您的代理商全名'}
                                onChange={onChangeagent}
                            />
                       </span>
                    </li>
                </ul>
                <ul style={{'paddingTop': '10px'}}>
                    {dom}
                </ul>
            </div>
        )
    }
}