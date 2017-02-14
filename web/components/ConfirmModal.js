/**
 * Created by wdd on 2017/2/13.
 */
import React,{Component} from 'react'
import BaseModal from './BaseModal'
import {removeOverLayByName} from '../actions/view'
import * as OverLayNames from '../constants/OverLayNames'

export default class ConfirmModal extends Component{
    constructor(){
        super();
    }

    render(){
        // const {confirmClick,cancelClick} = this.props.data;
        return (
            <BaseModal>
                <div className="confirm_view_container">
                    <div className="app_config_header">
                        <div className="app_config_header_title">{'确认'}</div>
                    </div>
                    <div className="confirm_view_confirm_btn" onClick={()=>{this.onConfirm()}}>{'确认'}</div>
                    <div className="confirm_view_cancel_btn" onClick={()=>{this.onCancel()}}>{'取消'}</div>
                </div>
            </BaseModal>
        )
    }

    onConfirm(){
        this.props.dispatch(removeOverLayByName(OverLayNames.CONFIRM_MODAL_VIEW))
    }

    onCancel(){
        this.props.dispatch(removeOverLayByName(OverLayNames.CONFIRM_MODAL_VIEW))
    }
}