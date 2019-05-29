import React, {Component} from 'react';
import Loading from './../../components/loading'
import NoData from './../../components/Nodata';
import banner from './img/banner.png';
import Card from './../Card/Card';
import './style.css';
import HTTP from './../../common/HTTP';
import NavBar from './../../components/NavBar/NavBar';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            num: 0,
            loading: true,
            finished: false,//是否全部加载完毕
            isFoot: true,   //阻止用户频繁上拉调接口
        };
        this.pageNum = 1;              //分页页码
        this.pageSize = 5;         //每页显示个数
        this.startx = 0;                 //触摸起始点x轴坐标
        this.starty = 0;                 //触摸起始点y轴坐标
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let {userId, userType} = this.props;
        let reqUrl = userType === '1' ? '/f/app/goods/agentList' : '/f/app/goods/manufacturerList';
        HTTP.post(reqUrl, {
            pageNum: this.pageNum,
            pageSize:this.pageSize,
            userId
        }).then((res) => {
            if (res.data.success === 1) {
                this.setState({
                    data: res.data.body.goodsList
                }, function () {
                    this.setState({
                        num: res.data.body.size,
                        loading: false
                    })
                })
            }
        })
    };
    //接触屏幕
    touchStart = (e) => {
        this.startx = e.touches[0].pageX;
        this.starty = e.touches[0].pageY;
    };

    //离开屏幕（[e.changedTouches][2]）
    touchEnd = (e) => {
        let endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        let direction = this.getDirection(this.startx, this.starty, endx, endy);
        switch (direction) {
            case 0:
                console.log("未滑动！");
                break;
            case 1:
                console.log("向上！");
                this.loadData();
                break;
            case 2:
                console.log("向下！");
                break;
            case 3:
                console.log("向左！");
                break;
            case 4:
                console.log("向右！");
                break;
            default:
        }
    };
    //触摸点和离开点连线与[x轴角度][3]
    getAngle = (angx, angy) => {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };
    //根据接触和离开判断方向 1向上 2向下 3向左 4向右 0未发生滑动（[Math.abs][4]）
    getDirection = (startx, starty, endx, endy) => {
        let angx = endx - startx;
        let angy = endy - starty;
        let result = 0;

        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
        let angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }

        return result;
    };
    //**向上滑动时（在这里才真正的判断是否到最底部）**
    loadData = () => {
        console.log("数据的高-------------------------", this.refs.onPullUp.clientHeight);
        console.log("滚动的高------------------------", document.getElementById('content').scrollTop);
        console.log("屏幕的高------------------------", document.documentElement.clientHeight);
        let dataHeight = this.refs.onPullUp.clientHeight;
        let scrollHeight = document.getElementById('content').scrollTop;
        let screenHeight = document.documentElement.clientHeight;
        const h = 10;//自定义距离底部多少时concat数据
        if (dataHeight - scrollHeight - h < screenHeight && this.state.isFoot) {
            this.setState({
                isFoot: false,
            });
            console.log("应该只显示1次");

            let {userId, userType} = this.props;

            let reqUrl = userType === '1' ? '/f/app/goods/agentList' : '/f/app/goods/manufacturerList';
            this.pageNum++;
            let params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                userId
            };
            let {data} = this.state;
            HTTP.post(reqUrl, params).then((res) => {
                if (res.data.success !== 1) return;
                if (res.data.body.goodsList.length > 0) {
                    this.setState({
                        isFoot: true,
                        data: [...data, ...res.data.body.goodsList]
                    })
                } else {
                    this.setState({
                        finished: true,
                    })
                }
            })
        }
    };

    render() {
        let {data, num, loading, finished, isFoot} = this.state;
        let {touchStart, touchEnd} = this;
        let aa = 233;
        return (
            <NavBar noNavBar={true}>
                <div className={'desc'}>
                    <img src={banner} width="100%" alt={'绣花机租赁产融服务平台'}/>
                    <p className={'pad-bottom-5'}>在售机型({num})</p>
                </div>
                {
                    loading ? (<Loading/>) : null
                }
                {
                    (!loading) ?( data.length > 0 ? (
                        <div
                            ref={"onPullUp"}
                            onTouchStart={(e) => {
                                touchStart(e);
                            }}
                            onTouchEnd={(e) => {
                                touchEnd(e);
                            }}
                        >
                            <Card {...{data}} url={'/listmachine/detail.html'}/>
                            <p className={'text-center'} style={{'color':'#aaa','paddingBottom':'15px'}}>
                                {
                                    finished ? <span>我是有底线滴哦~</span> :
                                        aa ? isFoot ? <span >上拉加载更多</span> :<span>请稍等...</span> :
                                            <spa>暂无信息</spa>
                                }
                            </p>
                        </div>
                    ) : (<NoData/>)):null
                }
            </NavBar>
        )
    }
}
