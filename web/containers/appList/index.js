/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {showLoading,showOverLayByName,removeLoading} from '../../actions/view'
import * as ViewState from '../../constants/view';
import * as ViewConstants from '../../constants/OverLayNames'
import * as appActions from '../../actions/appList'

class DeviceList extends Component{
    constructor(){
        super();
        this.state= {view:ViewState.view_loading,height:'750px',tableWidth:'950px'};
        this.id = null;
        this.requestResNum = 0;
    }

    render(){
        const {appList} = this.props;
        const {tableWidth} = this.state;
        let headThArr = ViewState.tableHeadThProp.map((item,index)=>{
            return (
                <th style={{width:item.width,textAlign:'center',color:'#7BBFE6'}} key={index}>{item.name}</th>
            )
        });
        let styleTrTd = {textAlign:'center',borderBottom:'1px dashed #ececec'};
        let bodyContent = appList.map((item,index)=>{
            let btnItems = [
                <div className="tool_btn_info" key={'8'} onClick={()=>{this.onConfigClick(item)}}>{'应用配置'}</div>,
                <div className="tool_btn_authority" key={'9'} onClick={()=>{this.onAdminConfig(item['id'])}}>{'权限配置'}</div>,
                <div className="tool_btn_del" key={'10'} onClick={()=>{this.onDeleteClick(item['id'])}}>{'删除'}</div>
            ];
            let appType = ['原生应用','H5应用','外部应用'][item.type];
            return (
                <tr key={index} style={{height:'50px'}}>
                    <td key="0" style={styleTrTd}>{item.icon}</td>
                    <td key="1" style={styleTrTd}>{item.name}</td>
                    <td key="2" style={styleTrTd}>{appType}</td>
                    <td key="3" style={styleTrTd}>{item.timesDay}</td>
                    <td key="4" style={styleTrTd}>{item.times}</td>
                    <td key="5" style={styleTrTd}>{item.users}</td>
                    <td key="6" style={styleTrTd}>{item.msgs}</td>
                    <td key="7" style={styleTrTd}>{btnItems}</td>
                </tr>
            )
        });
        return (
            <div className="app_header_content">
                <div className="app_header_content_container">
                    <h3 className="app_header_title">{'应用管理'}</h3>
                </div>
                <div className="app_tool_content">
                    <div className="app_tool_add"  onClick={(e)=>{this.onConfigClick()}}>
                        <div className="app_tool_add_icon">{'+'}</div>
                        <div className="app_tool_add_text">{'登记应用'}</div>
                    </div>
                </div>
                <div className="app_list_container">
                    <table style={{width:tableWidth}}>
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
            </div>
        )
    }

    onConfigClick(item=null){
        this.props.dispatch(showOverLayByName(ViewConstants.APP_CONFIG_VIEW,item));
    }

    onDeleteClick(id){
        this.id = id;
        this.props.dispatch(showOverLayByName(ViewConstants.CONFIRM_MODAL_VIEW,{id:id,confirmCb:this.onDelConfirmCb.bind(this)}));
    }

    onDelConfirmCb(bool){
        if(bool){
            this.props.dispatch(showLoading('正在删除,请稍候...'));
            this.props.dispatch(appActions.delApp('id='+this.id,this.onDelCb.bind(this)));
        }
    }

    onDelCb(){
        this.props.dispatch(removeLoading());
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(appActions.getAppList(this.onGetAppListCb.bind(this)));
    }

    onAdminConfig(id){
        this.requestResNum = 0;
        this.id = id;
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(appActions.getUserList(this.getUserListCb.bind(this)));
        this.props.dispatch(appActions.getAppAssignList([{'key':'id','value':id}],this.getUserListCb.bind(this)));
    }

    getUserListCb(){
        this.requestResNum++;
        if(this.requestResNum == 2) {
            setTimeout(function () {
                this.props.dispatch(removeLoading());
                this.props.dispatch(showOverLayByName(ViewConstants.ADMIN_CONFIG_VIEW, {id: this.id}));
            }.bind(this),100);
        }
    }

    componentDidMount(){
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(appActions.getAppList(this.onGetAppListCb.bind(this)));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize(){
        const {innerWidth,innerHeight} = window;
        this.setState({height:innerHeight-250,tableWidth:innerWidth-170<950?950:innerWidth-170});
    }

    onGetAppListCb(){
        this.props.dispatch(removeLoading());
    }
}


function mapStateToProps(state) {
    return {
        appList: state.appList.list,
        userList:state.appList.userList
    }
}

export default connect(mapStateToProps)(DeviceList);