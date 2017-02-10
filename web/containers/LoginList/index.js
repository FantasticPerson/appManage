/**
 * Created by wdd on 2017/2/8.
 */
/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ViewState from '../../constants/view';
import {getLoginList,getLoginListSearch} from '../../actions/loginList'
import {showLoading,removeLoading} from '../../actions/view'

class DemoPage extends Component{
    constructor(){
        super();
        this.state= {view:ViewState.view_loading,height:'750px',tableWidth:'950px'};
    }

    renderFooter(){
        const {pageIndex,pageNum} = this.props;
        if(pageNum > 0) {
            let tabs = [];
            for (let i = 0; i < pageNum; i++) {
                let isCurrent = (i == pageIndex);
                let className = "tr-multi-list-tab" + (isCurrent ? " tr-multi-list-curt-tab" : "");
                tabs.push(
                    <div key={i} className={className} onClick={() => {
                        this.onTabClick(i)
                    }}>{i+1}</div>
                )
            }
            return (
                <div className="tr-multi-list-footer-container">
                    <div className="tr-multi-list-pre-tab" onClick={() => {
                        this.onPreClick()
                    }}>{'上一页'}</div>
                    <div className="tr-multi-list-tab-container">{tabs}</div>
                    <div className="tr-multi-list-next-tab" onClick={() => {
                        this.onNextClick()
                    }}>{'下一页'}</div>
                    <div className="tr-multi-list-msg">{'共' + pageNum + '页'}</div>
                </div>
            )
        }
    }

    onTabClick(index){
        const {pageIndex} = this.props;
        if(index == pageIndex){
            return;
        }
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(getLoginList(index,this.onGetDataCb.bind(this)));
    }

    onPreClick(){
        const {pageIndex} = this.props;
        if(pageIndex <= 0){
            return;
        }
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(getLoginList(pageIndex -1,this.onGetDataCb.bind(this)));
    }

    onNextClick(){
        const {pageIndex,pageNum} = this.props;
        if(pageIndex >= pageNum-1){
            return;
        }
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(getLoginList(pageIndex + 1,this.onGetDataCb.bind(this)));
    }

    render(){
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        const {height,tableWidth} = this.state;
        const {loginList} = this.props;
        let headThArr = ViewState.tableHeadProp2.map((item,index)=>{
            return (
                <th style={{width:item.width,textAlign:'center',color:'#7BBFE6'}} key={index}>{item.name}</th>
            )
        });
        let styleTrTd = {textAlign:'center',borderBottom:'1px dashed #ececec'};
        let bodyContent = loginList.map((item,index)=>{
            let date = new Date(item.time*1000);
            return (
                <tr key={index} style={{height:'50px'}}>
                    <td key="0" style={styleTrTd}>{item.Id}</td>
                    <td key="1" style={styleTrTd}>{item.name}</td>
                    <td key="2" style={styleTrTd}>{item.departName}</td>
                    <td key="3" style={styleTrTd}>{item.userName}</td>
                    <td key="4" style={styleTrTd}>{item.terminalType}</td>
                    <td key="5" style={styleTrTd}>{item.phoneType}</td>
                    <td key="6" style={styleTrTd}>{item.sysVersion}</td>
                    <td key="7" style={styleTrTd}>{item.appVersion}</td>
                    {/*<td key="8" style={styleTrTd}>{item.deviceId}</td>*/}
                    <td key="9" style={styleTrTd}>{item.times}</td>
                    <td key="10" style={styleTrTd}>{date.Format('yyyy-MM-dd hh:mm')}</td>
                </tr>
            )
        });
        return (
            <div>
                <div className="app_header_content">
                    <div className="app_header_content_container">
                        <h3 className="app_header_title">{'登陆管理'}</h3>
                    </div>
                    <div className="app_tool_content">
                        <input style={{width:tableWidth+'px'}} className="app_tool_search" type="text" placeholder="请输入姓名" onKeyDown={(e)=>{
                            this.onKeyDown(e);
                        }}/>
                    </div>
                </div>
                <div className="app_list_container" style={{height:height+'px',overflow:'auto'}}>
                    <table style={{width:tableWidth+'px',marginLeft:'10px'}}>
                        <thead>
                        <tr style={{height: '35px', background: 'rgb(242, 247, 251)'}}>
                        {headThArr}
                    </tr>
                    </thead>
                        <tbody>
                        {bodyContent}
                        </tbody>
                    </table>
                </div>
                {this.renderFooter()}
            </div>
        )
    }

    onKeyDown(e){
        if(e.keyCode == "13")
        {
            let value = e.target.value;
            let hasKeyWord= value.length > 0;
            if(hasKeyWord) {
                this.props.dispatch(showLoading('正在获取数据,请稍后...'));
                this.props.dispatch(getLoginListSearch(value, this.onGetDataCb.bind(this)));
            } else {
                const {pageIndex} = this.props;
                this.props.dispatch(showLoading('正在获取数据,请稍后...'));
                this.props.dispatch(getLoginList(pageIndex,this.onGetDataCb.bind(this)));
            }
        }
    }

    componentDidMount(){
        const {pageIndex} = this.props;
        window.addEventListener('resize', this.handleResize.bind(this));
        const {innerWidth,innerHeight} = window;
        this.setState({height:innerHeight-250,tableWidth:innerWidth-170<990?990:innerWidth-170});
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(getLoginList(pageIndex,this.onGetDataCb.bind(this)));
    }

    onGetDataCb(bool){
        this.props.dispatch(removeLoading());
    }

    handleResize(){
        const {innerWidth,innerHeight} = window;
        this.setState({height:innerHeight-250,tableWidth:innerWidth-170<950?950:innerWidth-170});
    }
}


function mapStateToProps(state) {
    return {
        title: state.demoPage.title,
        loginList : state.loginList.list,
        pageIndex:state.loginList.pageIndex,
        pageNum:state.loginList.pageNum
    }
}

export default connect(mapStateToProps)(DemoPage);