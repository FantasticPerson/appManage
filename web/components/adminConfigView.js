/**
 * Created by wdd on 2017/2/13.
 */
import React,{Component} from 'react'
import BaseModal from './BaseModal'
import TreeView from './treeView'
import {removeOverLayByName,showLoading,removeLoading} from '../actions/view'
import * as OverLayNames from '../constants/OverLayNames'
import {AssignUserList} from '../actions/appList'

export default class AdminConfigView extends Component{
    constructor(){
        super();
    }

    render(){
        const {id} = this.props.data;
        const {userList} = this.props;
        return (
            <BaseModal>
                <div className="admin_config_container">
                    <div className="app_config_header">
                        <div className="app_config_header_title">{'应用配置'}</div>
                    </div>
                    <div className="tree-nodes-container">
                        <TreeView ref="treeView" data={userList}/>
                    </div>
                    <div className="admin-config-confirm" onClick={()=>{this.onConfirmClick()}}>{'确认'}</div>
                    <div className="admin-config-cancel" onClick={()=>{this.onCancelClick()}}>{'取消'}</div>
                </div>
            </BaseModal>
        )
    }

    onConfirmClick(){
        const {id} = this.props.data;
        const {treeView} = this.refs;
        let selectIds = treeView.getCheclKeys();
        console.log(selectIds);
        let str = ''+selectIds[0];
        for(let i=1;i<selectIds.length;i++){
            str = str + ',' + selectIds[i];
        }
        if(str.length > 0) {
            this.props.dispatch(showLoading());
            this.props.dispatch(AssignUserList('appId='+id+'&addList='+str, this.onAssignUserListCb.bind(this)));
        } else {
            this.props.dispatch(removeOverLayByName(OverLayNames.ADMIN_CONFIG_VIEW));
        }
    }

    onAssignUserListCb(){
        this.props.dispatch(removeLoading());
        this.props.dispatch(removeOverLayByName(OverLayNames.ADMIN_CONFIG_VIEW))
    }

    onCancelClick(){
        this.props.dispatch(removeOverLayByName(OverLayNames.ADMIN_CONFIG_VIEW))
    }
}