/**
 * Created by wdd on 2017/2/13.
 */
import React,{Component} from 'react'
import BaseModal from './BaseModal'
import TreeView from './treeView'
import {removeOverLayByName,showLoading,removeLoading} from '../actions/view'
import * as OverLayNames from '../constants/OverLayNames'
import {AssignUserList} from '../actions/appList'
import * as ActionTypes from '../constants/ActionTypes'
import * as actionHelper from '../utils/action-helper';

export default class AdminConfigView extends Component{
    constructor(){
        super();
        this.state={showTreeView:true};
    }

    render(){
        return (
            <BaseModal>
                <div className="admin_config_container">
                    <div className="app_config_header">
                        <div className="app_config_header_title">{'应用配置'}</div>
                    </div>
                    <div>
                        <div className="tree-nodes-container">
                            {this.renderTreeView()}
                        </div>
                        {this.renderRightPart()}
                    </div>
                    <div className="admin-config-confirm" onClick={()=>{this.onConfirmClick()}}>{'确认'}</div>
                    <div className="admin-config-cancel2" onClick={()=>{this.onCancelClick()}}>{'取消'}</div>
                </div>
            </BaseModal>
        )
    }

    updateTreeView(){
        this.setState({showTreeView:false});
        setTimeout(function () {
            this.setState({showTreeView:true});
        }.bind(this),20);
    }

    renderTreeView(){
        const {userList,appAssignList} = this.props;
        const {showTreeView} = this.state;
        if(showTreeView) {
            return (
                <TreeView ref="treeView" data={userList} selectedData={appAssignList} onChecked={this.onChecked.bind(this)}/>
            )
        }
    }

    renderRightPart(){
        const {userList,appAssignList} = this.props;
        let userListSelect = [];
        userList.emps.map((item)=>{
            if(appAssignList.indexOf(item.userId) >= 0){
                userListSelect.push(item);
            }
        });
        const items = userListSelect.map((item,index)=>{
            return (
                <div className="admin-item-container" key={index}>
                    <div className="admin-item-name">{item.name}</div>
                    <div className="admin-item-del close-btn" onClick={()=>{this.onDel(item.userId)}}></div>
                </div>
            )
        });

        return (
            <div className="admin-right-container">
                <div className="admin-right-container-head">
                    <div className="admin-right-select-info">{'已选择('+userListSelect.length+')'}</div>
                    <div className="admin-right-clear" onClick={()=>{this.onClear()}}>{'清除全部'}</div>
                </div>
                <div className="admin-right-content">
                    {items}
                </div>
            </div>
        );
    }

    onChecked(ids){
        let selectIds = [];
        ids.map((item)=>{
            if(item.indexOf('depId') < 0){
                selectIds.push(item);
            }});
        this.props.dispatch(actionHelper.createPayloadAction(ActionTypes.update_app_assign_list, selectIds));
    }

    onClear(){
        this.props.dispatch(actionHelper.createPayloadAction(ActionTypes.update_app_assign_list, []));
        this.updateTreeView();
    }

    onDel(id) {
        const {appAssignList} = this.props;
        let userIds = [];
        appAssignList.map((item)=>{
            if(item.indexOf('depId') <0){
                userIds.push(item);
            }
        });
        let index = userIds.indexOf(id);
        if (index >= 0) {
            userIds.splice(index,1);
            this.props.dispatch(actionHelper.createPayloadAction(ActionTypes.update_app_assign_list, userIds));
            this.updateTreeView();
        }
    }

    onConfirmClick(){
        const {appAssignListLast,appAssignList} = this.props;
        const {id} = this.props.data;
        const {treeView} = this.refs;
        let selectIds = [];
        treeView.getCheclKeys().map((item)=>{
            if(item.indexOf('depId') < 0){
                selectIds.push(item);
            }});

        let arrAdd = '';
        let arrDel = '';
        appAssignList.map((item)=>{
            if(appAssignListLast.indexOf(item) < 0){
                arrAdd = arrAdd + (arrAdd.length > 0? ',':'')+item;
            }
        });
        appAssignListLast.map((item)=>{
            if(appAssignList.indexOf(item) < 0){
                arrDel = arrDel + (arrDel.length > 0?',':'')+item;
            }
        });

        if(arrAdd.length > 0 || arrDel.length >0) {
            this.props.dispatch(showLoading());
            this.props.dispatch(AssignUserList('appId='+id+'&addList='+arrAdd+'&delList='+arrDel, this.onAssignUserListCb.bind(this)));
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