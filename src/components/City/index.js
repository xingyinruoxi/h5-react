import React, {Component} from 'react';
import './css/city.css';
import dataCity from './data';

/**
 * 滚动组件
 */
class WheelView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    /**
     * 当有新的属性需要更新时。也就是网络数据回来之后
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {//接收父组建的数据

        this.setState({
            data: nextProps.data,
        });//把新的数据填进列表，setState会自动触发render更新界面
        this.refs.scroller.scrollTop = 40 * nextProps.index;
        //每个列表选项高度为40px;
    }

    componentDidMount() {
        var self = this;
        self.refs.scroller.addEventListener('touchstart', touchStart, false);
        self.refs.scroller.addEventListener('touchend', touchEnd, false);

        function touchStart(event) {
            self.isTouchStart = true;
        }

        function touchEnd(event) {
            self.isTouchStart = false;
            self.timer = setTimeout(self.reSet, 100)
            //100毫秒未触摸，认定滚动结束进行状态修正
        }
    }

    /**
     * 监听滚动事件
     * @param e
     */
    onScroll = () => {
        var self = this;
        if (this.timer) clearTimeout(this.timer)//如果一直在滚动，不会触发timer
        this.timer = setTimeout(self.reSet, 100)
        //100毫秒未滚动，认定滚动结束
    }

    /**
     * 状态修正
     */
    reSet = () => {
        var self = this;
        if (self.isTouchStart) return;//如果在触摸状态，返回
        console.log('scrolling ends..')
        var top = self.refs.scroller.scrollTop;//滚过的高度
        var dis = top % 40;
        var target;
        if (dis > 20) {//超过一半，向下滚
            target = top + (40 - dis);
            self.transfrom(target);
        } else {//否则滚回去
            target = top - dis;
            self.transfrom(target);
        }
        self.index = target / 40;//  当前选中的序号
        self.props.onDataChange(self.props.type, self.index);
    }

   /* handleClick=(e)=> {   //点到哪个滚到目标位置
        console.log(e.clientY - 120);
        var distance = e.clientY - 120;  //当前点击的位置距目标位置的距离
        var self = this;
        var top = self.refs.scroller.scrollTop;  //滚过的高度
        var target = top + Math.floor(distance / 40) * 40;  //需要滚动的高度
        self.transfrom(target);    //动画过渡到目标位置
        self.index = target / 40;  //  当前选中的序号
        self.props.onDataChange(self.props.type, self.index);
        //回调函数数据改变事件
    }*/

    /**
     * 动画过渡到目标位置
     * @param target
     */
    transfrom = (target) => {
        var self = this;
        var now = self.refs.scroller.scrollTop;
        var step = (target - now) / 20;
        setTimeout(function () {
            self.refs.scroller.scrollTop = self.refs.scroller.scrollTop + step;
            if (self.refs.scroller.scrollTop !== target)
                setTimeout(this, 10);//没有滚动到目标位置，继续触发自己
        }, 10);
    }

    render() {
        return (<div className="container"
                     ref="scroller"
                     onScroll={this.onScroll}>
                <div className="scroller">
                    {
                        this.state.data.map(function (item, index) {
                            //循环把数据显示出来
                            return <div className="item" key={index}>{item}</div>
                        })
                    }
                </div>
            </div>
        );
    }
}


/**
 * 选择组件
 */

/*eslint-disable */
class WheelDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pro: [],//省数组
            city: [],//市数组
            area: [],//区数组
            pIndex: 0,//当前的省下标
            cIndex: 0,//当前的市下标
            aIndex: 0,//当前的区下标
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.data)
        this.setState({data: nextProps.data});//把新的数据填进列表，setState会自动触发render更新界面
        this.initData(nextProps.data);
    }

    initData = (data) => {
        var pArr = [];
        var cArr = [];
        var aArr = [];
        data.map(function (pro) {
            pArr.push(pro.name);
        });
        if (data[0])
            data[0].city.map(function (city) {
                cArr.push(city.name)
            });
        aArr = data[0].city[0].area;
        this.setState({
            pro: pArr,
            city: cArr,
            area: aArr
        });
        this.props.onAddressSelect(0, 0, 0);
    }
    onDataChange = (type, index) => {
        console.log(type + "   --->" + index)
        var cArr = [];
        var aArr = [];
        switch (type) {
            case  "pro"://省带动市区变化
                this.state.data[index].city.map(function (city) {
                    cArr.push(city.name)
                });
                aArr = this.state.data[index].city[0].area;
                this.setState({
                    city: cArr,
                    area: aArr,
                    pIndex: index,
                    cIndex: 0,
                    aIndex: 0,
                });
                break;
            case  "city"://市带动区变化
                aArr = this.state.data[this.state.pIndex].city[index].area;
                this.setState({
                    area: aArr,
                    cIndex: index,
                    aIndex: 0,
                });

                break;
            case  "area":
                this.setState({aIndex: index});
                break;
        }

        this.props.onAddressSelect(this.state.pIndex, this.state.cIndex, this.state.aIndex);//数据变化之后，触发回调
    }

    render() {
        return (
            <div className="dialog">
                <div className="box">
                </div>
                <WheelView type="pro" data={this.state.pro}
                           index={this.state.pIndex}
                           onDataChange={this.onDataChange}/>
                <WheelView type="city" data={this.state.city}
                           index={this.state.cIndex}
                           onDataChange={this.onDataChange}/>
                <WheelView type="area" data={this.state.area}
                           index={this.state.aIndex}
                           onDataChange={this.onDataChange}/>
            </div>
        )
    }
}

/*eslint-enable */
/**
 * 整个应用
 */
export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.setState({data: dataCity});
    }

    /**
     * 城市选择回调，返回省市区的下标
     */
    onAddressSelect = (pIndex, cIndex, aIndex) => {
        var data = this.state.data;
        var address = data[pIndex].name
            + data[pIndex].city[cIndex].name
            + data[pIndex].city[cIndex].area[aIndex];
        console.log(" address:  --->" + address)
        this.address = address;
        //与渲染无关的数据  直接存在this对象里  如果存在State里面会导致页面脏渲染，卡顿
        localStorage.setItem('area',this.address);
    }
    onClick = () => {

        var ans = '选择的地址：' + this.address;
        alert(ans);
    }



    render() {
        return (<WheelDialog
                data={this.state.data}
                onAddressSelect={this.onAddressSelect}//传进回调
            />
        );
    }
}
