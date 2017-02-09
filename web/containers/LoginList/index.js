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
        this.state= {view:ViewState.view_loading,height:'750px'};
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
                    }}>{i}</div>
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
        if(pageIndex == 0){
            return;
        }
        let index = pageIndex -1 < 0 ? 0 : pageIndex -1;
        console.log(index);
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(getLoginList(index,this.onGetDataCb.bind(this)));
    }

    onNextClick(){
        const {pageIndex} = this.props;
        if(pageIndex == 3){
            return;
        }
        let index = pageIndex +1 > 4 ? 4 : pageIndex +1;
        console.log(index);
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(getLoginList(index,this.onGetDataCb.bind(this)));
    }

    render(){
        const {height} = this.state;
        const {loginList} = this.props;
        let headThArr = ViewState.tableHeadProp2.map((item,index)=>{
            return (
                <th style={{width:item.width,textAlign:'center',color:'#7BBFE6'}} key={index}>{item.name}</th>
            )
        });
        let styleTrTd = {textAlign:'center',borderBottom:'1px dashed #ececec'};
        let bodyContent = loginList.map((item,index)=>{
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
                    <td key="8" style={styleTrTd}>{item.deviceId}</td>
                    <td key="9" style={styleTrTd}>{item.times}</td>
                    <td key="10" style={styleTrTd}>{item.time}</td>
                </tr>
            )
        });
        return (
            <div>
                <div className="app_header_content">
                    <div className="app_header_content_container">
                        <h3 className="app_header_title">{'应用管理'}</h3>
                    </div>
                    <div className="app_tool_content">
                        <input className="app_tool_search" type="text" placeholder="请输入账号或姓名" onKeyDown={(e)=>{
                            this.onKeyDown(e);
                        }}/>
                    </div>

                </div>
                <div className="app_list_container" style={{height:height+'px',overflow:'auto'}}>
                    <table style={{width:'950px',marginLeft:'10px'}}>
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
                this.props.dispatch(getLoginListSearch(value, this.onGetDataCb.bind(this)));
            } else {
                const {pageIndex} = this.props;
                this.props.dispatch(getLoginList(pageIndex,this.onGetDataCb.bind(this)));
            }
        }
    }

    componentDidMount(){
        const {pageIndex} = this.props;
        window.addEventListener('resize', this.handleResize.bind(this));
        const {innerHeight} = window;
        this.setState({height:innerHeight-250});
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(getLoginList(pageIndex,this.onGetDataCb.bind(this)));
    }

    onGetDataCb(bool){
        this.props.dispatch(removeLoading());
    }

    handleResize(){
        const {innerWidth,innerHeight} = window;
        this.setState({height:innerHeight-250});
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