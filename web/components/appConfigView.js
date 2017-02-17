/**
 * Created by wdd on 2017/2/10.
 */
import React,{Component} from 'react'
import BaseModal from './BaseModal'
import {removeOverLayByName,showLoading,removeLoading} from '../actions/view'
import {uploadPng,addApp,updateApp,getAppList} from '../actions/appList'
import * as OverLayNames from '../constants/OverLayNames'

export default class AppConfigViewModal extends Component{
    constructor(){
        super();
        this.state = {imageUrl:''};
    }

    render(){
        const {data,userList} = this.props;
        const {imageUrl} = this.state;
        return (
            <BaseModal>
                <div className="app_config_container">
                    <div className="app_config_header">
                        <div className="app_config_header_title">{'应用配置'}</div>
                    </div>
                    <div className="app_config_up_container">
                        <div className="app_config_up_left_container">
                            <div className="app_config_yytb">{'应用图标:'}</div>
                            <div className="app_config_pic_con">{'没有预览可用'}</div>
                            <div className="app_config_pic_con_2">
                                <img id="preview_image" src={imageUrl}/>
                            </div>
                            <div className="app_config_msg_con">
                                {/*<p className="app_config_space_size_msg">{'尺寸：144*144'}</p>*/}
                                {/*<p className="app_config_type_msg">{'png格式'}</p>*/}
                                {/*<p className="app_config_size_msg">{'25K大小以内'}</p>*/}
                                {/*<div className="app_config_img_upload_btn">{'上传logo'}</div>*/}
                                {/*<input type="file" onChange={(e)=>{*/}
                                    {/*this.onSelectChange(e);*/}
                                {/*}} className="app_config_img_upload_btn"/>*/}
                                <form id="form" action="http://10.10.61.193:10001/app/appIcon" method="POST" enctype="multipart/form-data"
                                      onSubmit={()=>{this.onSubmit()}}>
                                    <input type="file" name="appIcon"/>
                                    <input type="submit" className="btn2"/>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="devide_line"></div>
                    <div className="app_config_middle_container">
                        <div className="app_config_middle_left" style={{marginLeft:'30px'}}>
                            <div>
                                <p className="app_config_middle_text">{'应用名称：'}</p>
                                <input ref={'appName'} defaultValue={(data && data.name) || ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'IOS下载地址：'}</div>
                                <input ref={'iosUrl'} defaultValue={(data && data.iosApp) || ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'安卓下载地址：'}</div>
                                <input ref={'andUrl'} defaultValue={(data && data.andApp) || ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'PC单点登陆地址：'}</div>
                                <input ref={'pcUrl'} defaultValue={(data && data.loginEntrance) || ''} className="config_input" type="text"/>
                            </div>
                        </div>
                        <div className="app_config_middle_right">
                            <div>
                                <div className="app_config_middle_text">{'应用类型：'}</div>
                                <select ref={'appType'} defaultValue={(data && data.type) || '0'} className="config_input">
                                    <option value='0'>{'原生应用'}</option>
                                    <option value='1'>{'H5应用'}</option>
                                    <option value='2'>{'外部应用'}</option>
                                </select>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'IOS入口：'}</div>
                                <input ref={'iosEntrance'} defaultValue={(data && data.iosEntrance) || ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'安卓入口：'}</div>
                                <input ref={'andEntrance'} defaultValue={(data && data.andEntrance)|| ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'PC入口：'}</div>
                                <input ref={'pcEntrance'} defaultValue={(data && data.pcEntrance) || ''} className="config_input" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="app_config_btn_container">
                        <div className="app_config_btn_confirm" onClick={()=>{this.onConfirmClick()}}>{'确定'}</div>
                        <div className="app_config_btn_cancel" onClick={()=>{this.onCancelClick()}}>{'取消'}</div>
                    </div>
                </div>
            </BaseModal>
        )
    }

    onSubmit(){
        document.getElementById('form').submit();
    }

    onSelectChange(e){
        let file = e.target;
        if(!file.files || !file.files[0]){
            return;
        }
        let reader = new FileReader();
        reader.onload = function(){
            console.log(reader.result);
            let formData = new FormData();
            formData.append('appIcon',reader.result);
            this.props.dispatch(uploadPng(formData,this.onUploadImageCb.bind(this)));
            this.setState({imageUrl:reader.result})
        }.bind(this);
        reader.onerror=function(evt){
            console.log(evt);
        };
        reader.readAsDataURL(file.files[0]);
    }

    onUploadImageCb(){

    }

    onConfirmClick(){
        const {data} = this.props;
        const {appName,iosUrl,andUrl,pcUrl,appType,iosEntrance,andEntrance,pcEntrance} = this.refs;
        let dataArr = 'name='+appName.value;
        dataArr = dataArr + '&icon='+'ww';
        dataArr = dataArr + '&iosApp='+iosUrl.value;
        dataArr = dataArr + '&iosEntrance='+iosEntrance.value;
        dataArr = dataArr + '&andApp='+andUrl.value;
        dataArr = dataArr + '&andEntrance='+andEntrance.value;
        dataArr = dataArr + '&pcEntrance='+ pcEntrance.value;
        dataArr = dataArr + '&loginEntrance='+pcUrl.value;
        dataArr = dataArr + '&type='+appType.value;
        if(!data) {
            this.props.dispatch(addApp(dataArr, this.onAddOrUpdateCb.bind(this)));
        } else {
            dataArr = dataArr + '&id='+data.id;
            this.props.dispatch(updateApp(dataArr, this.onAddOrUpdateCb.bind(this)));
        }
    }

    onAddOrUpdateCb(){
        this.props.dispatch(removeOverLayByName(OverLayNames.APP_CONFIG_VIEW));
        this.props.dispatch(removeLoading());
        this.props.dispatch(getAppList());

    }

    onCancelClick(){
        this.props.dispatch(removeOverLayByName(OverLayNames.APP_CONFIG_VIEW))
    }
}