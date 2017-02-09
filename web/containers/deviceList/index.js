/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ViewState from '../../constants/view';
import {mockAppList} from '../../constants/mockData'
import {showLoading} from '../../actions/view'

class DemoPage extends Component{
    constructor(){
        super();
        this.state= {view:ViewState.view_loading,height:'750px',tableWidth:'950px'};
    }

    render(){
        const {appList} = this.props;
        let listData = appList ? appList : mockAppList;
        let headThArr = ViewState.tableHeadThProp.map((item,index)=>{
            return (
                <th style={{width:item.width,textAlign:'center',color:'#7BBFE6'}} key={index}>{item.name}</th>
            )
        });
        let styleTrTd = {textAlign:'center',borderBottom:'1px dashed #ececec'};
        let bodyContent = listData.map((item,index)=>{
            let btnItems = [
                <div className="tool_btn_info">{'应用配置'}</div>,
                <div className="tool_btn_authority">{'权限配置'}</div>,
                <div className="tool_btn_del">{'删除'}</div>
            ];
            return (
                <tr key={index} style={{height:'50px'}}>
                    <td key="0" style={styleTrTd}>{item.icon}</td>
                    <td key="1" style={styleTrTd}>{item.name}</td>
                    <td key="2" style={styleTrTd}>{item.type}</td>
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
                    <div className="app_tool_add">
                        <div className="app_tool_add_icon">{'+'}</div>
                        <div className="app_tool_add_text">{'登记应用'}</div>
                    </div>
                </div>
                <div className="app_list_container">
                    <table>
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

    componentDidMount(){
        // this.props.dispatch(showLoading('正在获取数据,请稍后...'));
    }
}


function mapStateToProps(state) {
    return {
        title: state.demoPage.title
    }
}

export default connect(mapStateToProps)(DemoPage);