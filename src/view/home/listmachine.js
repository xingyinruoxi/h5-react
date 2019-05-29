import React, {Component} from 'react';
import NavBar from './../../components/NavBar/NavBar';
import Card from './../../components/Card/Card';
import Loading from './../../components/loading'
import NoData from './../../components/Nodata';
import HTTP from './../../common/HTTP';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            initDataLength: 0,
            loading: true,
            finished: false,//是否全部加载完毕
            isFoot: true,   //阻止用户频繁上拉调接口
        };
        this.pageNum = 1;              //分页页码
        this.pageSize = 8;         //每页显示个数
        this.startx = 0;                 //触摸起始点x轴坐标
        this.starty = 0;                 //触摸起始点y轴坐标
    }

    componentDidMount() {
        this.getData();
        localStorage.setItem('agent', '');
        localStorage.setItem('agentId', '');
    }

    getData = () => {
        HTTP.post('/f/app/goods/list', {
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }).then((res) => {
            if (res.data.success === 1) {
                this.setState({
                    loading: false,
                    data: res.data.body,
                    initDataLength: res.data.body.length
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
        console.log("屏幕的高------------------------", document.documentElement.clientHeight - 50);
        let dataHeight = this.refs.onPullUp.clientHeight;
        let scrollHeight = document.getElementById('content').scrollTop;
        let screenHeight = document.documentElement.clientHeight;
        const h = 10;//自定义距离底部多少时concat数据
        if (dataHeight - scrollHeight - h < screenHeight && this.state.isFoot) {
            this.setState({
                isFoot: false,
            });
            console.log("应该只显示1次");
            this.pageNum++;
            let params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };
            let {data} = this.state;
            HTTP.post('/f/app/goods/list', params).then((res) => {
                if (res.data.success !== 1) return;
                if (res.data.body.length > 0) {
                    this.setState({
                        isFoot: true,
                        data: [...data, ...res.data.body]
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
        let {data, loading, finished, isFoot, initDataLength} = this.state;
        let {touchStart, touchEnd, pageSize} = this;
        return (
            <NavBar title={'选择机器'}>
                {
                    loading ? (<Loading/>) : null
                }
                {
                    (!loading) ? (data.length > 0 ? (
                        <div
                            ref={"onPullUp"}
                            onTouchStart={(e) => {
                                touchStart(e);
                            }}
                            onTouchEnd={(e) => {
                                touchEnd(e);
                            }}
                        >
                            <Card noMargin={'no-margin'} {...{data}} url={'/listmachine/detail.html'}/>
                            <p className={'text-center'} style={{'color': '#aaa', 'paddingBottom': '15px'}}>
                                {
                                    finished ? <span>我是有底线滴哦~</span> :
                                        initDataLength === pageSize ? isFoot ? <span>上拉加载更多</span> :
                                            <span>请稍等...</span> :
                                            null
                                }
                            </p>
                        </div>

                    ) : (<NoData/>)) : null
                }

            </NavBar>
        )
    }
}
